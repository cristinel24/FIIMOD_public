
class GTL {
   
    constructor(options) {
        
        this.message = options.message;
        this.token = options.token;
        this.winFooter = options.winFooter;
        this.winColor = options.winColor
        this.lostColor = options.lostColor;
        this.lostFooter = options.lostFooter;
        this.questionColor = options.questionColor;
        this.questionFooter = options.questionFooter;
        this.stopCommand = options.stopCommand
    }
    async start() {

        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        const { MessageButton } = require("discord-buttons");
        
        fetch(`https://api.dagpi.xyz/data/logo`, {
            headers: {
                "Authorization": this.token
            }
        })
        .then(res => res.json())
            .then(async data => {
                let que;
            if (data.clue == undefined) {
                que = new Discord.MessageEmbed()
                    .setTitle(`Ghiceste Logo-ul!`)
                    .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
                    .addField(`Hint:`, `${data.hint}`)
                    .setColor(this.questionColor || "RANDOM")
                    .setImage(data.question)
                    .setFooter("©️ Valeriu Gaming")
            } else {
                que = new Discord.MessageEmbed()
                    .setTitle(`Ghiceste Logo-ul!`)
                    .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
                    .addField(`Despre:`, `${data.clue}`, true)
                    .addField(`Hint:`, `${data.hint}`)
                    .setColor(this.questionColor || "RANDOM")
                    .setImage(data.question)
                    .setFooter("©️ Valeriu Gaming")
            }
    
    

    const right = new Discord.MessageEmbed()
    .setTitle(`Ai ghicit!`)
    .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
    .setColor(this.winColor || "RANDOM")
    .setDescription(`Era ${data.brand}`)
    .setImage(data.answer)
        .setFooter("©️ Valeriu Gaming")
   

    const wrong = new Discord.MessageEmbed()
     .setTitle(`Ai pierdut!`)
    .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
    .setColor(this.lostColor || "RANDOM")
    .setDescription(`Era ${data.brand}`)
    .setImage(data.answer)
        .setFooter("©️ Valeriu Gaming")
    


                const can = new MessageButton()
                    .setStyle("red")
                    .setLabel("Cancel")
                    .setID("cancel")
                const muc = await this.message.reply({ buttons: [can], embed: que })

                const filter = (button) => button.clicker.id == this.message.author.id;
                const gc = muc.createButtonCollector(filter)
                gc.on('collect', async (button) => {
                    button.reply.defer();
                    if (button.id == 'cancel') {
                        await muc.edit({ components: [], embed: wrong })
                        gameCollector.stop();
                        setTimeout(() => { if (muc) muc.delete() }, 8000)
                    }
                });
    const gameFilter = m => m.author.id === this.message.author.id
    const gameCollector = this.message.channel.createMessageCollector(gameFilter);

    gameCollector.on('collect', async msg => {
        if (msg.author.bot) return;
        const selection = msg.content.toLowerCase();
        if (selection === data.brand.toLowerCase()) {
            await muc.edit({ components: [], embed: right })
            gameCollector.stop();
            setTimeout(() => { if (muc) muc.delete() }, 8000)
        } else if (selection !== data.brand) {
            this.message.channel.send(`Gresit! Nu e **${selection}**`).then(msg => { setTimeout(() => { if (msg) msg.delete() }, 3000) });
        }
    })
    
})
}
}

module.exports = GTL;
