const Discord = require('discord.js');
var gis = require('g-i-s');
const { PriceGetter } = require('crypto-price-getter')

module.exports = async (message) => {
    let cuvs = message.content.split(" ");
    if (cuvs[2] == "" || cuvs[2] == null || cuvs[2] == undefined) { message.channel.send("Specifica o moneda! (ex: BTC, LTC, ADA, DOT)").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) }); return; }
    let moneda = cuvs[2].toUpperCase();

    let link = "";
    await gis(`${moneda} coin icon png`, async (er, results) => {

        let a, b, c;
        try {
            a = await PriceGetter.getLatestTradePrice(`${moneda}`, "EUR")
            b = await PriceGetter.get24hrStats(`${moneda}`, "EUR")
            c = await PriceGetter.get24hrPercentageChange(`${moneda}`, "EUR")
            i = 0;
            while (results[i].width > 3000 || results[i].url[results[i].url.length - 1] != "g") {
                i++;
            }
            link = results[i];
        }
        catch (e) {
            if (e) {
                message.channel.send("Nu am inca aceasta moneda in portofel :(").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) }); return;
            }
        }
        let msg = new Discord.MessageEmbed()
            .setColor('#f2e829')
            .setTitle(`${moneda}`)
            .setAuthor('FII Bot Crypto', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
            .setThumbnail(link.url)
            .setDescription('In ultimele 24h')
            .addFields(
                { name: `Pret:`, value: `${a} €`, inline: true },
                { name: `Crestere:`, value: `${c}%`, inline: true },
                { name: `Pretul de ieri:`, value: `${b.last} €`, inline: false },
                { name: `Cel mai mare pret (azi)`, value: `${b.high} €`, inline: true })
            .setTimestamp()
            .setFooter('©️ FII Bot')
        return message.channel.send(msg);

    });
}