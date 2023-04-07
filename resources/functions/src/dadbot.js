module.exports = async(message, mesaj) => {
    let ghost = mesaj.split(" "), ggg = "";
    var i = 0, gust = false;
    for(i = 0; i <ghost.length; i++)
    if (((ghost[i] == `i'm` || ghost[i] == `l'm`) && ghost[i].length == 3) || ((ghost[i] == `im` || ghost[i] == `lm`) && ghost[i].length == 2)) { gust = true; break; }
    if (gust == true) {
        i++;
        for (i; i < ghost.length; i++)
            ggg += " " + ghost[i];

        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.first();
       
        if (!webhook) {
            if (ggg.includes("<@")) {
                message.channel
                    .createWebhook('Papa', {
                        avatar: "https://alekeagle.com/assets/dad.518f1968.png",
                    })
                    .then(async (_webhook) => {
                        await _webhook.send(`Are you retarded <@${message.author.id}>?`);
                    });
                return;
            }
            message.channel
                .createWebhook('Papa', {
                    avatar: "https://alekeagle.com/assets/dad.518f1968.png",
                })
                .then(async (_webhook) => {
                    await _webhook.send(`Hi${ggg}, I'm Papa!`);
                });
        } else {
            if (ggg.includes("<@")) {
                await webhook.send(`Are you retarded <@${message.author.id}>?`, {
                    username: 'Papa',
                    avatarURL: "https://alekeagle.com/assets/dad.518f1968.png",
                });
                return;
            }
            await webhook.send(`Hi${ggg}, I'm Papa!`, {
                username: 'Papa',
                avatarURL: "https://alekeagle.com/assets/dad.518f1968.png",
            });
        }
    }
}