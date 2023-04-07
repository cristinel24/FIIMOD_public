const Discord = require('discord.js');
const snoowrap = require('snoowrap');
const reddit = new snoowrap({
    userAgent: 'lmao',
    clientId: process.env.reddit_id,
    clientSecret: process.env.reddit_secret,
    refreshToken: process.env.reddit_refresh_token
});

module.exports = async (message) => {
    let aux, msg;
    if (message.content.startsWith('r/')) aux = message.content.split('/');
    (await reddit.getSubreddit(aux[1])).getRandomSubmission().then(post => {
        let link = "https://www.reddit.com" + post.permalink;
        var desc = "Image";
        if (post.is_video == true) desc = "Video";

        msg = new Discord.MessageEmbed()
            .setColor(post.author_flair_background_color)
            .setTitle(post.title)
            .setURL(link)
            .setAuthor(`${message.content} - Random Post`)
            .setDescription(desc)
            .setImage(post.url_overridden_by_dest)
        message.channel.send(msg);
    });
}