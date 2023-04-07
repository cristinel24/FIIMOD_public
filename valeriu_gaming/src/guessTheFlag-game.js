
class GTF {

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
        var ok;
        const fetch = require("node-fetch")
        const Discord = require('discord.js');
        const { MessageButton } = require("discord-buttons");

        await fetch(`https://api.dagpi.xyz/data/flag`, {
            headers: {
                "Authorization": this.token
            }
        })
            .then(res => res.json())
            .then(async data => {
                await fetch(data.flag).then(async res => { ok = true; if (res.status != 200) { ok = false;return await this.start(); } })
                if (ok == true) {
                    const que = new Discord.MessageEmbed()
                        .setTitle(`Ghiceste Steagul!`)
                        .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
                        .setColor(this.questionColor || "RANDOM")
                        .setImage(data.flag)
                        .setFooter("©️ FII Gaming")


                    const right = new Discord.MessageEmbed()
                        .setTitle(`Bravo, ai ghicit!`)
                        .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
                        .setColor(this.winColor || "RANDOM")
                        .setDescription(`${data.Data.name.common}`)
                        .setThumbnail(data.flag)
                        .setFooter("©️ FII Gaming")


                    const wrong = new Discord.MessageEmbed()
                        .setTitle(`Ai pierdut!`)
                        .setAuthor(this.message.member.user.tag, this.message.member.user.avatarURL())
                        .setColor(this.lostColor || "RANDOM")
                        .setDescription(`${data.Data.name.common}`)
                        .setThumbnail(data.flag)
                        .setFooter("©️ FII Gaming")

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
                        if (selection === data.Data.name.common.toLowerCase()) {
                            await muc.edit({ components: [], embed: right })
                            gameCollector.stop();
                            setTimeout(() => { if (muc) muc.delete() }, 8000)
                        } else if (selection !== data.Data.name.common) {
                            this.message.channel.send(`Gresit! Nu e **${selection}**`).then(msg => { setTimeout(() => { if (msg) msg.delete() }, 2000) });
                        }
                    })
                }


            })
    }
}

module.exports = GTF;
