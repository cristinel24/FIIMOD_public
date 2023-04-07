const Discord = require("discord.js");
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


module.exports = async (Client, grupa, interaction) => {

    const guild = Client.guilds.cache.get(interaction.guild_id);
    const member = await guild.members.fetch(interaction.member.user.id);
    let selectare_grupe = Client.channels.cache.get('1022460690566488084');
    var person = {
        id: interaction.member.user.id,
        name: "" + interaction.member.user.username + '#' + interaction.member.user.discriminator
    }
    let spec = "";
    if (grupa[0] == "A" || grupa[0] == "B") spec = "ro";
    else if (grupa[0] == "E") spec = "eng";

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    var ok = 0;
    rows.forEach((row) => {
        if (row.id == person.id) {
            let rol = roluri.get(grupa);
            let canal = canale.get(grupa);
            let welcome = Client.channels.cache.get(canal);
            if (grupa[0] == 'A') member.roles.add('1022529765376282645');
            if (grupa[0] == 'B') member.roles.add('1022530385306988554');
            if (grupa[0] == 'E') member.roles.add('1022530625019858974');
            member.roles.add(rol);
            member.roles.remove('1022488501943550022');
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
            let msg = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Nou coleg de grupa!")
                .setAuthor(`${person.name}`, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
                .setDescription(`Felicitari, <@${person.id}>! \nTi-ai confirmat grupa cu succes!`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
                .setTimestamp()
                .setFooter(`${guild.name}`, guild.iconURL())
            welcome.send(msg);
            row.grupa = grupa;
            row.spec = spec;
            row.save();
            ok = 1;
        }
    })
}