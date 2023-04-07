const Discord = require("discord.js");
const fs = require("fs");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../../config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet(process.env.google_spreadId)
async function login(doc) {
    await doc.useServiceAccountAuth(creds);
}
login(doc);

let roluri = new Map([
    ['A1', '1022448443353989190'],
    ['A2', '1022448552800161873'],
    ['A3', '1022448593396834344'],
    ['A4', '1022448647268466760'],
    ['A5', '1022448726083649576'],
    ['B1', '1022448767934402600'],
    ['B2', '1022448869566578709'],
    ['B3', '1022448902307336242'],
    ['B4', '1022448935756894228'],
    ['E11', '1022453847555325973'],
    ['E12', '1022453881977978890'],
    ['E13', '1022453912025972746']
]);

let canale = new Map([
    ['A1', '1022496736490561586'],
    ['A2', '1022497285558521867'],
    ['A3', '1022499000840106048'],
    ['A4', '1022499026454728765'],
    ['A5', '1022499121770287126'],
    ['B1', '1022499163503591525'],
    ['B2', '1022499176048754698'],
    ['B3', '1022499188338077696'],
    ['B4', '1022499203001360475'],
    ['E11', '1022499216125349908'],
    ['E12', '1022499232583790684'],
    ['E13', '1022499246110416977']
]);

module.exports = async (Client, nrdosar, grupa, spec, lista, interaction) => {

    let locs = Client.channels.cache.get('1010319477084274689');
    let problem = Client.channels.cache.get('1010313240334581761');
    let mods = Client.channels.cache.get('1006893192190369972');
    let number = nrdosar;
    const guild = Client.guilds.cache.get(interaction.guild_id);
    const member = await guild.members.fetch(interaction.member.user.id);
    

    listam = lista.split("\n");

    var bines = 0;
    for (i = 0; i < listam.length; i++) {
        if (listam[i] == number) {
            bines = 1; break;
        }
    }
    var person = {
        id: interaction.member.user.id,
        name: "" + interaction.member.user.username + '#' + interaction.member.user.discriminator
    }
    if (!bines) {
        problem.send(`**Eroare <@${person.id}>!** Locul nu exista pe lista oficiala!`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 3000) });
        mods.send(`<#1010313240334581761>: **Eroare <@${person.id}>!** Locul nu exista pe lista oficiala!`);
        return 0;
    }

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    var ok = 0;
    rows.forEach((row) => {
        if (row.nr == number && ok == 0) {
            if (row.id == person.id) {
                problem.send(`**Eroare <@${person.id}>!** Ti-ai confirmat deja acest loc!`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 3000) });
                mods.send(`<#1010313240334581761>: **Eroare <@${person.id}>!** Ti-ai confirmat deja acest loc!`);
            } else {
                problem.send(`**Eroare <@${person.id}>!** Locul a fost confirmat deja de catre <@${row.id}>!`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
                mods.send(`<#1010313240334581761>: **Eroare <@${person.id}>!** Locul a fost confirmat deja de catre <@${row.id}>!`);
            }
            ok = 1;
            return 0;
        }
        if (row.id == person.id && ok == 0) {
            problem.send(`**Eroare <@${person.id}>!** Ai confirmat deja locul cu numarul de dosar **${row.nr}**!`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            ok = 1;
            return 0;
        }
    })
    if (ok == 0) {
        await doc._rawSheets[0].addRows([{ id: person.id, tag: person.name, nr: number, spec: spec , grupa: grupa}]);
        role = guild.roles.cache.find(r => r.id === "1006920132683116634");
        member.roles.remove('1010298297237393479');
        member.roles.add(role);
        let msg = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Loc Confirmat!")
            .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
            .setDescription(`Felicitari, <@${person.id}>! \nTi-ai confirmat locul cu succes!`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
            .setTimestamp()
            .setFooter(`${guild.name}`, guild.iconURL())
        locs.send(msg);

        switch (spec) {
            case 'ro':
                role = guild.roles.cache.find(r => r.id === "1013488048337600512");
                member.roles.add(role);
                break;
            case 'eng':
                role = guild.roles.cache.find(r => r.id === "1013491261145100338");
                member.roles.add(role);
                break;

        }
        let rol = roluri.get(grupa);
        let canal = canale.get(grupa);
        let welcome = Client.channels.cache.get(canal);
        if (grupa[0] == 'A') member.roles.add('1022529765376282645');
        if (grupa[0] == 'B') member.roles.add('1022530385306988554');
        if (grupa[0] == 'E') member.roles.add('1022530625019858974');
        member.roles.add(rol);

        msg = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Nou coleg de grupa!")
            .setAuthor(`${person.name}`, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
            .setDescription(`Felicitari, <@${person.id}>! \nTi-ai confirmat grupa cu succes!`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
            .setTimestamp()
            .setFooter(`${guild.name}`, guild.iconURL())
        welcome.send(msg);
    }
    return 1;
}