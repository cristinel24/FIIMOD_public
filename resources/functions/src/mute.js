const Discord = require("discord.js");

module.exports = async (message, mesaj) => {
    message.delete();
    if (mesaj.startsWith("mute")) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (member != message.member)
                member.voice.setMute(true);
        }
        return;
    }
    if (mesaj.startsWith("unmute")) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (member != message.member)
                member.voice.setMute(false);
        }
        return;
    }
    if (mesaj.startsWith("deaf")) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (member != message.member)
                member.voice.setDeaf(true);
        }
        return;
    }
    if (mesaj.startsWith("undeaf")) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            if (member != message.member)
                member.voice.setDeaf(false);
        }
        return;
    }
    if (mesaj.startsWith("disconnect")) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
            member.voice.kick();
        }
        return;
    }
    else if (mesaj.startsWith("mute") || mesaj.startsWith("unmute") || mesaj.startsWith("deaf") || mesaj.startsWith("undeaf") || mesaj.startsWith("disconnect")) {
        return message.channel.send("Nu ai drepturi xd");
    }
}