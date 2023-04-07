const Discord = require("discord.js");

module.exports = async (message) => {
    let cuv = message.content.split(" ");
    let person = cuv[2];
    if (person == null)
        return message.channel.send("Zi cu cine ca sa ti zic un numar random ca oricum nimeni nu te iubeste");
    if (!person.startsWith("<@"))
        return message.channel.send("Da tag cuiva");

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "❌".repeat(10 - loveIndex);
    let sa = person.split('<');
    let aa = sa[1].split('@');
    let ad = aa[1].split(">")
    let id = ad[0];
    let mess = new Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(`${message.author.toString()}, <@${id}> te iubeste:\n\n${Math.floor(love)}%\n\n${loveLevel}`);
    return message.channel.send(mess);
}