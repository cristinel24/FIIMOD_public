const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../../config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet(process.env.google_spreadId)
async function login(doc) {
    await doc.useServiceAccountAuth(creds);
}
login(doc);


module.exports = async (Client, spec, interaction) => {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const guild = Client.guilds.cache.get(interaction.guild_id);
    const member = await guild.members.fetch(interaction.member.user.id);
    var person = {
        id: interaction.member.user.id,
        name: "" + interaction.member.user.username + '#' + interaction.member.user.discriminator
    }

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
    rows.forEach((row) => {
        if (row.id == person.id) {
            row.tag = person.name;
            row.spec = spec;
            row.save();
        }
    })
}