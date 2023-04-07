const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../../config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet(process.env.google_spreadId)
async function login(doc) {
    await doc.useServiceAccountAuth(creds);
}
login(doc);

module.exports = async (lista, message) => {

    let nr = 0, ok = 0;
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    lista = lista.split('\n')

    rows.forEach((member) => {
        for (i = 0; i < lista.length; i++) {
            //if (member.nr + '\r' == lista[i])
            if (member.nr == lista[i]) {
                nr++; ok = 1;
            }
        }
        if (!ok) {
            message.author.send(`**${member.tag}** NU este la INFORMATICA! ID: **${member.id}**`)
        }
        ok = 0; 
    })

    return message.author.send(`Nr. studenti: **${nr}**`);
}