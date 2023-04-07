const Discord = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.api_key,
})
const openai = new OpenAIApi(configuration);


module.exports = async (Client, message) => {

    if (!message.content.startsWith("fiibot")) return;

    let conversationLog = [
        {
            role: 'system',
            content: 'You are a friendly chatbot.'
        }];

    
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    for (i = 0; i < 15 / 2; i++) {
        let aux = prevMessages[i];
        prevMessages[i] = prevMessages[15 - 1 - i];
        prevMessages[15 - 1 - i] = aux;
    }

    prevMessages.forEach((msg) => {
        if (!message.content.startsWith("fiibot")) return;
        if (msg.author.id !== Client.user.id && message.author.bot) return;
        if (msg.author.id != message.author.id) return;

        conversationLog.push({
            role: 'user',
            content: msg.content,
        })
    });
    

    try {
        const result = await openai.createChatCompletion({
            model: 'hpt-3.5-turbo',
            messages: conversationLog,
        });
    }
    catch (err) {
        console.log(err);
    }
    return message.reply(result.data.choices[0].message);

};