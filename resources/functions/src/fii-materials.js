const Discord = require("discord.js");
const fs = require("fs");


let materii = new Map([
    ['logica', 'https://drive.google.com/drive/folders/1o2YrsD5BRYav1bnX6wzJZ_R7h8ykUIIr'],
    ['mate', 'https://drive.google.com/drive/folders/1dMN3PnSpg_6kt73TuXrmnIVD4ScAtQZ_'],
    ['sd', 'https://drive.google.com/drive/folders/1DK4n_j3TpNGh0rokVwCEbGkjoy-Hio4T'],
    ['acso', 'https://drive.google.com/drive/folders/1woPYsWmt8ngxPBHFaToWtffPAjYCUUmz'],
    ['ip1', 'https://drive.google.com/drive/folders/18AHmlTnenaFiztbDTFjxp-80A7Q4EiDV'],
    ['eng1', 'https://drive.google.com/drive/folders/1rICdhzGFLA1TcOk5O1op1S6c8a4vdsIc'],
    ['peda1', 'https://drive.google.com/drive/folders/1nwT-A53BC68WmtQwWC-AK-XkbII2M076'],
    ['oop', 'https://drive.google.com/drive/folders/17_4q0pymMjfcWmbxFyPu-EKwzaEKLFYY'],
    ['so', 'https://drive.google.com/drive/folders/1uEMUXv0-aKjk0Wi5muQjmShCAWgWuZpT'],
    ['faai', 'https://drive.google.com/drive/folders/1bHyhs4yfOMTO0cYm8LIWZil82gXdGNvu'],
    ['ps', 'https://drive.google.com/drive/folders/1JrcJrSHznvsy-zId2jgZQzjf72ofnCOs'],
    ['pa', 'https://drive.google.com/drive/folders/18VxKHPsYKbjmgIX0S1hZT9ITSMHSps6O'],
    ['eng2', 'https://drive.google.com/drive/folders/19s4881EUAsy3J457GbrcD3nNvi267i0w'],
    ['rc', 'https://drive.google.com/drive/folders/1_sKHum0LuVfZ4mZ3wRUybR8pKrGoFbkL'],
    ['bd', 'https://drive.google.com/drive/folders/1yw8SXUyGNwbHDj-2pCptgqZQdzL4kOrw'],
    ['lfac', 'https://drive.google.com/drive/folders/1e5tSwjEcsgvDnxjLMh371xmMlL1mswNT'],
    ['ag', 'https://drive.google.com/drive/folders/1-mBqDsy6np-vHCulIopUDa9Z3jv7dgFF'],
    ['eng3', 'https://drive.google.com/drive/folders/1bf5T-Z7owj6gLsD94KLkH6UKaY98pb8_'],
    ['cdc', 'https://profs.info.uaic.ro/~fltiplea/CDC/CDC.html'],
    ['plp', 'https://drive.google.com/drive/folders/1fjExb8G0dPT0eraPDYpCt9Rm3xuoPbfs'],
    ['ag', 'https://drive.google.com/drive/folders/1yxStmT3QLOukaysVyVyr5k_uwaaGNLGi'],
    ['qc', 'https://profs.info.uaic.ro/~andreea.arusoaie/QC.html'],
    ['web', 'https://drive.google.com/drive/folders/1ljMVViLlknMPQU_8-3f0ZdLXBi6PFKRG'],
    ['pa2', 'https://drive.google.com/drive/folders/1Z0Q0Z3etNIQTj13hWkm6u0UVlXcbuhyG'],
    ['ip2', 'https://drive.google.com/drive/folders/1aYbEYAOF75brS-_39BFtRJJvQcVtUALQ'],
    ['sgbd', 'https://drive.google.com/drive/folders/1iu6ts120_w-HTloteNBILzib62Vmv5Fq'],
    ['ant', 'https://drive.google.com/drive/folders/1-tGW-eONM2zKEBk5FWMQHF_F-XiHeITn'],
    ['se', 'https://drive.google.com/drive/folders/1W5j-gahJ_5273PcGQifLaWxagYCJLoSM'],
    ['ml', 'https://drive.google.com/drive/folders/10m5VL7QbCImCdCw1ozvxhbyX9ggKJwZq'],
    ['is', 'https://drive.google.com/drive/folders/19jpMmBa8a6jyYupBueWBAK-zatJPAZd1'],
    ['ai', 'https://drive.google.com/drive/folders/1kNEMvePTU52dxNO4ZvP5YvnS3lehDmTN'],
    ['pp', 'https://drive.google.com/drive/folders/1sAm-UyN-2MUWpBqbqurAwTOcwZ0t63r_'],
    ['rn', 'https://drive.google.com/drive/folders/1GFmVwSwdqABehnNF1AmC0wsG_-17IEXj'],
    ['tpm', 'https://drive.google.com/drive/folders/1Sk6YoVLFLnO7RwZtX9Iy1ZzQ18aq8jq4'],
    ['cn', 'https://drive.google.com/drive/folders/1BYvIAZpIi6KlGbvswFa6eL3k9CaUMvgB'],
    ['grafica', 'https://drive.google.com/drive/folders/1mkz_mC5DYI5yLjWqw9K3kf546lo5l5L7'],
    ['mobile', 'https://drive.google.com/drive/folders/16qu3Zf9bwdpYHcXPdC9BUUZ0r-AvPGdl'],
    ['cloud', 'https://drive.google.com/drive/folders/1Pj3PuXaA75SZPv0j-3_Ltm_bPu6wepvu'],
    ['ioc', 'https://profs.info.uaic.ro/~busaco/teach/courses/hci/'],
    ['issa', 'https://drive.google.com/drive/folders/1Vjqkq12cC-DxGqYQ-nva9_YVNisiAy1z']
]);

module.exports = async (Client, materia, interaction) => {
    const guild = Client.guilds.cache.get(interaction.guild_id);
    console.log(interaction);

    var person = {
        id: interaction.member.user.id,
        name: "" + interaction.member.user.username + '#' + interaction.member.user.discriminator
    }

    let msg = new Discord.MessageEmbed()
        .setColor("Purple")
        .setTitle(`Fii-Materials | ${titlu}`)
        .setAuthor(`${person.name}`, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}`)
        .setDescription(`Link arhivă: [Aici](${materii[materia]})`)
        .setThumbnail(`https://cdn-icons-png.flaticon.com/512/1784/1784897.png`)
        .setTimestamp()
        .setFooter(`${guild.name}`, guild.iconURL())
}