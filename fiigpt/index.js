process.env.NODE_NO_WARNINGS = 'stream/web';
const {Client, IntentsBitField }= require('discord.js');
const {Configuration, OpenAIApi } = require('openai');
const { ActivityType } = require('./node_modules/discord-api-types/v10');
require('dotenv/config');
const client= new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

process.on('unhandledRejection', error => {
    if (error.httpStatus == 404) return;
    else if (error == 'DiscordAPIError: Unknown Message') return;
    else console.log(error);
});

client.on('ready', () =>{
    console.log('Bot is online!');
    client.user.setActivity({
        name: "Chat-GPT",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=0tE1cXA0GLo"
    });
})

const configuration = new Configuration({
    apiKey: process.env.gpttoken,
})
const openai=new OpenAIApi(configuration);

client.on('messageCreate', async (message)=>{
    if(message.author.bot) return;
    if (!message.content.startsWith("fiigpt")) return;

    let conversationLog = [
        {
            role: 'system',
            content: 'You are a sarcastic chatbot.'
        }];

    await message.channel.sendTyping();
    
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    prevMessages.forEach((msg) => {
        if (!msg.content.startsWith("fiigpt")) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        if (msg.author.id != message.author.id) return;
        let content = msg.content.split(" ");
        let mesaj="";
        for(i=1; i<content.length; i++){
            mesaj+=content[i] + ' ';
        }

        conversationLog.push({
            role: 'user',
            content: mesaj,
        })
    });
    
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
        });
    message.reply(result.data.choices[0].message);
})

client.login(process.env.login_fiigpt);