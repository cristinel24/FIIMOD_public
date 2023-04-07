const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const weather = require("openweather-apis");
const weather2 = require('weather-js');
weather.setAPPID('7bb160d4d51da71aaa0334366e2c379f');

var luni = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
let zisap = new Map([['Monday', 'Luni'], ['Tuesday', 'Marți'], ['Wednesday', 'Miercuri'], ['Thursday', 'Joi'], ['Friday', 'Vineri'], ['Saturday', 'Sâmbătă'], ['Sunday', 'Duminică']]);


module.exports = async (message, mesaj) => {
    weather.setLang('ro');
    weather.setUnits('metric');
    let cuv = mesaj.split(" ");
    let oras, juk = cuv[2];
    for (var i = 3; i < cuv.length; i++)
        juk += " " + cuv[i];
    if (juk != undefined) {
        oras = juk;
        weather.setCity(oras);
    }
    else {
        oras = 'Iasi';
        weather.setCity(oras);
    }
    var ziulica = 0;
    let astz = new MessageButton()
        .setStyle("green")
        .setLabel("Astăzi")
        .setID("azi")
        .setDisabled();
    let maine = new MessageButton()
        .setStyle("blurple")
        .setLabel("Următoarea zi")
        .setID("urm")
    let ieri = new MessageButton()
        .setStyle("blurple")
        .setLabel("Ziua anterioară")
        .setID("ant")

    weather2.find({ search: oras, degreeType: 'C' }, async function (err, result) {
        if (err) console.log(err);

        let lun = parseInt(result[0].current.date.toString().substr(5, 2));
        let zic = parseInt(result[0].current.date.toString().substr(8, 2));
        let msg = new Discord.MessageEmbed()
            .setColor('#1ABC9C')
            .setTitle(`Astăzi, ${zisap.get(result[0].current.day)}, ${zic} ${luni[lun - 1]}`)
            .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
            .setDescription(result[0].current.skytext)
            .setThumbnail(result[0].current.imageUrl)
            .addFields(
                { name: 'Acum', value: result[0].current.temperature + "°C" },
                { name: 'Se simte ca', value: result[0].current.feelslike + "°C", inline: true },
                { name: 'Minim', value: result[0].forecast[1].low + "°C", inline: true },
                { name: 'Maxim', value: result[0].forecast[1].high + "°C", inline: true },
                { name: 'Umiditate', value: result[0].current.humidity + "%", inline: true },
                { name: 'Precipitații', value: result[0].forecast[1].precip + "%", inline: true },
                { name: 'Vânt', value: result[0].current.windspeed, inline: true })
            .setFooter(`Ultima actualizare la ora: ${result[0].current.observationtime}, ${result[0].current.observationpoint}`)

        let cucu = await message.channel.send(msg, { buttons: [astz, maine] });
        const filter = (button) => {
            return 1;
        }
        const collector = cucu.createButtonCollector(filter);
        collector.on('collect', async (button) => {
            let forecast, zic, lun;
            await button.reply.defer();
            if (button.id == "ant") {
                ziulica--;
                if (ziulica == 0) {
                    lun = parseInt(result[0].current.date.toString().substr(5, 2));
                    zic = parseInt(result[0].current.date.toString().substr(8, 2));
                    forecast = new Discord.MessageEmbed()
                        .setColor('#1ABC9C')
                        .setTitle(`Astăzi, ${zisap.get(result[0].current.day)}, ${zic} ${luni[lun - 1]}`)
                        .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
                        .setThumbnail(result[0].current.imageUrl)
                        .addFields(
                            { name: 'Acum', value: result[0].current.temperature + "°C" },
                            { name: 'Se simte ca', value: result[0].current.feelslike + "°C", inline: true },
                            { name: 'Minim', value: result[0].forecast[1].low + "°C", inline: true },
                            { name: 'Maxim', value: result[0].forecast[1].high + "°C", inline: true },
                            { name: 'Umiditate', value: result[0].current.humidity + "%", inline: true },
                            { name: 'Precipitații', value: result[0].forecast[1].precip + "%", inline: true },
                            { name: 'Vânt', value: result[0].current.windspeed, inline: true })
                        .setFooter(`Ultima actualizare la ora: ${result[0].current.observationtime}, ${result[0].current.observationpoint}`)

                    let ieri = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Ziua anterioară")
                        .setID("ant")
                    let maine = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Următoarea zi")
                        .setID("urm")
                    cucu.edit(forecast, { buttons: [astz, maine] });
                }
                else {
                    lun = parseInt(result[0].forecast[ziulica].date.toString().substr(5, 2));
                    zic = parseInt(result[0].forecast[ziulica].date.toString().substr(8, 2));
                    forecast = new Discord.MessageEmbed()
                        .setColor('#1ABC9C')
                        .setTitle(`${zisap.get(result[0].forecast[ziulica].day)}, ${zic} ${luni[lun - 1]}`)
                        .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
                        .setDescription(result[0].forecast[ziulica].skytextday)
                        .addFields(
                            { name: 'Maxim', value: result[0].forecast[ziulica].high + "°C", inline: true },
                            { name: 'Minim', value: result[0].forecast[ziulica].low + "°C", inline: true },
                            { name: 'Precipitații', value: result[0].forecast[ziulica].precip + "%", inline: true });

                    let ieri = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Ziua anterioară")
                        .setID("ant")

                    let astz = new MessageButton()
                        .setStyle("green")
                        .setLabel("Astăzi")
                        .setID("azi")
                    let maine = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Următoarea zi")
                        .setID("urm")
                    if (ziulica == 0)
                        cucu.edit(forecast, { buttons: [astz, maine] });
                    else cucu.edit(forecast, { buttons: [ieri, astz, maine] });
                }

            }
            else if (button.id == "azi") {
                ziulica = 0;
                lun = parseInt(result[0].current.date.toString().substr(5, 2));
                zic = parseInt(result[0].current.date.toString().substr(8, 2));
                forecast = new Discord.MessageEmbed()
                    .setColor('#1ABC9C')
                    .setTitle(`Astăzi, ${zisap.get(result[0].current.day)}, ${zic} ${luni[lun - 1]}`)
                    .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
                    .setDescription(result[0].current.skytext)
                    .setThumbnail(result[0].current.imageUrl)
                    .addFields(
                        { name: 'Acum', value: result[0].current.temperature + "°C" },
                        { name: 'Se simte ca', value: result[0].current.feelslike + "°C", inline: true },
                        { name: 'Minim', value: result[0].forecast[1].low + "°C", inline: true },
                        { name: 'Maxim', value: result[0].forecast[1].high + "°C", inline: true },
                        { name: 'Umiditate', value: result[0].current.humidity + "%", inline: true },
                        { name: 'Precipitații', value: result[0].forecast[1].precip + "%", inline: true },
                        { name: 'Vânt', value: result[0].current.windspeed, inline: true })
                    .setFooter(`Ultima actualizare la ora: ${result[0].current.observationtime}, ${result[0].current.observationpoint}`)

                let ieri = new MessageButton()
                    .setStyle("blurple")
                    .setLabel("Ziua anterioară")
                    .setID("ant")
                let maine = new MessageButton()
                    .setStyle("blurple")
                    .setLabel("Următoarea zi")
                    .setID("urm")
                cucu.edit(forecast, { buttons: [astz, maine] });
            }
            else if (button.id == "urm") {
                ziulica++;
                if (ziulica == 0) {
                    lun = parseInt(result[0].current.date.toString().substr(5, 2));
                    zic = parseInt(result[0].current.date.toString().substr(8, 2));
                    forecast = new Discord.MessageEmbed()
                        .setColor('#1ABC9C')
                        .setTitle(`Astăzi, ${zisap.get(result[0].current.day)}, ${zic} ${luni[lun - 1]}`)
                        .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
                        .setDescription(result[0].current.skytext)
                        .setThumbnail(result[0].current.imageUrl)
                        .addFields(
                            { name: 'Acum', value: result[0].current.temperature + "°C" },
                            { name: 'Se simte ca', value: result[0].current.feelslike + "°C", inline: true },
                            { name: 'Minim', value: result[0].forecast[1].low + "°C", inline: true },
                            { name: 'Maxim', value: result[0].forecast[1].high + "°C", inline: true },
                            { name: 'Umiditate', value: result[0].current.humidity + "%", inline: true },
                            { name: 'Precipitații', value: result[0].forecast[1].precip + "%", inline: true },
                            { name: 'Vânt', value: result[0].current.windspeed, inline: true })
                        .setFooter(`Ultima actualizare la ora: ${result[0].current.observationtime}, ${result[0].current.observationpoint}`)

                    let ieri = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Ziua anterioară")
                        .setID("ant")
                    let maine = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Următoarea zi")
                        .setID("urm")
                    cucu.edit(forecast, { buttons: [ieri, maine] });
                }
                else {
                    lun = parseInt(result[0].forecast[ziulica].date.toString().substr(5, 2));
                    zic = parseInt(result[0].forecast[ziulica].date.toString().substr(8, 2));
                    forecast = new Discord.MessageEmbed()
                        .setColor('#1ABC9C')
                        .setTitle(`${zisap.get(result[0].forecast[ziulica].day)}, ${zic} ${luni[lun - 1]}`)
                        .setAuthor(`Vremea ${result[0].location.name}`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
                        .setDescription(result[0].forecast[ziulica].skytextday)
                        .addFields(
                            { name: 'Maxim', value: result[0].forecast[ziulica].high + "°C", inline: true },
                            { name: 'Minim', value: result[0].forecast[ziulica].low + "°C", inline: true },
                            { name: 'Precipitații', value: result[0].forecast[ziulica].precip + "%", inline: true });

                    let maine = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Următoarea zi")
                        .setID("urm")

                    let ieri = new MessageButton()
                        .setStyle("blurple")
                        .setLabel("Ziua anterioară")
                        .setID("ant")
                    let astz = new MessageButton()
                        .setStyle("green")
                        .setLabel("Astăzi")
                        .setID("azi")
                    if (ziulica == 4)
                        cucu.edit(forecast, { buttons: [ieri, astz] });
                    else cucu.edit(forecast, { buttons: [ieri, astz, maine] });
                }

            }
        });
    });
    return;
}