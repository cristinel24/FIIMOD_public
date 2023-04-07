const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet(process.env.google_spreadId)
async function login(doc) {
	await doc.useServiceAccountAuth(creds);
}
login(doc);

async function embedGenerator(message) {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();
    let lb = new Array(), loc;
    var con = 1;
    rows.sort((a, b) => {
        return b.win - a.win;
    })
    rows.forEach((row) => {
        lb.push(row);
        if (row.id == message.author.id) loc = con;
        con++;
    })
    let txt = "";
    if (loc == 1) txt = "1st";
    else if (loc == 2) txt = "2nd";
    else if (loc == 3) txt = "3rd";
    else txt = "" + loc + 'th';

    const embeds = [];
    let songs = 10;

    for (let i = 0; i < lb.length; i += 10) {
        const current = lb.slice(i, songs);
        songs += 10;
        let j = i;
        const info = current.map(song => `**${++j}**. [${song.tag}](https://cdn.discordapp.com/attachments/1010247914209165433/1010817315786465300/300133797_2053346871539471_6762210255352649108_n.jpg) • **${song.win}** : **${song.lose}**`).join('\n').replace('\r', "");
        const msg = new Discord.MessageEmbed()
            .setColor('#71368A')
            .setTitle(`⚔️ Bularga Leaderboard ⚔️`)
            .setDescription(`**Wins : Losses**\n\n${info} `)
            .setFooter(`Pozitia ta: ${txt} •  FII Gaming`, message.author.avatarURL());

        embeds.push(msg);
    }
    return embeds;
}

module.exports = async (message, Client) => {

    let currentPage = 0;
    const next = new MessageButton()
        .setStyle("grey")
        .setLabel("Next")
        .setID("next")
    const back = new MessageButton()
        .setStyle("grey")
        .setLabel("Back")
        .setID("back")

    const embeds = await embedGenerator(message);
    let embd = embeds[currentPage];
    let queueEmbed;

    queueEmbed = await message.channel.send(`Page : ${currentPage + 1}/${embeds.length}`, { buttons: [back, next], embed: embd })

    const filter = (button) => button.clicker.id == message.author.id;

    const collector = queueEmbed.createButtonCollector(filter);

    collector.on('collect', async (button) => {
        await button.reply.defer();
        if (button.id === 'next' && currentPage + 1 < embeds.length) {
            currentPage++;
            queueEmbed.edit(`Page : ${currentPage + 1}/${embeds.length}`, embeds[currentPage]);
        }
        else if (button.id === 'back') {
            if (currentPage != 0) {
                currentPage--;
                queueEmbed.edit(`Page : ${currentPage + 1}/${embeds.length}`, embeds[currentPage]);
            }
        }
    })
    Client.channels.cache.get(message.channel.id).messages.fetch(queueEmbed.id).then(msg => { setTimeout(() => { msg.delete() }, 30000) });
}