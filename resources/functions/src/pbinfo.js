const Discord = require('discord.js');
const linkCheck = require('link-check');

async function pbinfo(message) {
    let nr = Math.floor(Math.random() * 8000);
    let lu = "https://www.pbinfo.ro/probleme/"
    let linku = lu + nr;

    linkCheck(linku, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(result.status)
        if (result.status == "dead")
            pbinfo(message);
        else if (result.status == "alive") {
            let j = new Discord.MessageEmbed()
                .setColor("#33cc00")
                .setAuthor('FII Bot Informatician', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
                .setDescription("www.pbinfo.com")
                .setThumbnail("https://www.pbinfo.ro/css/copil-color.png")
                .setURL(linku)
                .setTitle("Problema #" + nr)
                .setTimestamp()
                .setFooter(`${message.guild.name}`, message.guild.iconURL());
            return message.reply(j);
        }
    })
}

module.exports = async (message) => {
    pbinfo(message);
}