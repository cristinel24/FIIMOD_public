const Discord = require("discord.js");
const { Aki } = require("aki-api");
const games = new Set();
const attemptingGuess = new Set();


module.exports = async function (message, client, region) {
    try {
        region = "en";
        // defining for easy use
        let usertag = message.author.tag
        let avatar = message.author.displayAvatarURL()

        // check if a game is being hosted by the player
        if (games.has(message.author.id)) {
            let alreadyPlayingEmbed = new Discord.MessageEmbed()
                .setAuthor(usertag, avatar)
                .setTitle(`❌ Te joci deja Akinator!`)
                .setDescription("**Te joci deja Akinator!. Scrie 's' sau 'stop' sa opresti jocul.**")
                .setColor("RED")

            return message.channel.send({ embed: alreadyPlayingEmbed })
        }

        // adding the player into the game
        games.add(message.author.id)

        let startingEmbed = new Discord.MessageEmbed()
            .setAuthor(usertag, avatar)
            .setTitle(`Incepe Jocul...`)
            .setDescription("**Se incarca...**")
            .setColor("RANDOM")

        let startingMessage = await message.channel.send({ embed: startingEmbed })

        // starts the game
        let aki = new Aki(region)
        await aki.start();

        let notFinished = true;
        let stepsSinceLastGuess = 0;
        let hasGuessed = false;

        let noResEmbed = new Discord.MessageEmbed()
            .setAuthor(usertag, avatar)
            .setTitle(`Joc terminat`)
            .setDescription(`**${message.author.username}, s-a terminat jocul deoarece au fost mai mult de 60 de secunde de inacvtivitate.**`)
            .setColor("RANDOM")

        let akiEmbed = new Discord.MessageEmbed()
            .setAuthor(usertag, avatar)
            .setTitle(`Intrebare: ${aki.currentStep + 1}`)
            .setDescription(`**Progres: 0%\n${aki.question}**`)
            .addField("Scrie...", "**D** sau **Da**\n**N** sau **Nu**\n**I** sau **IDK**\n**P** sau **Probabil**\n**PN** sau **Probabil Nu**\n**B** sau **Back**")
            .setFooter(`Poti scrie "S" sau "Stop" sa opresti jocul. | ©️ FII Gaming`)
            .setColor("RANDOM")

        await startingMessage.delete();
        let akiMessage = await message.channel.send({ embed: akiEmbed });

        // if message was deleted, quit the player from the game
        client.on("messageDelete", async deletedMessage => {
            if (deletedMessage.id == akiMessage.id) {
                notFinished = false;
                games.delete(message.author.id)
                attemptingGuess.delete(message.guild.id)
                await aki.win()
                return;
            }
        })

        // repeat while the game is not finished
        while (notFinished) {
            if (!notFinished) return;

            stepsSinceLastGuess = stepsSinceLastGuess + 1

            if (((aki.progress >= 95 && (stepsSinceLastGuess >= 10 || hasGuessed == false)) || aki.currentStep >= 78) && (!attemptingGuess.has(message.guild.id))) {
                attemptingGuess.add(message.guild.id)
                await aki.win();

                stepsSinceLastGuess = 0;
                hasGuessed = true;

                let guessEmbed = new Discord.MessageEmbed()
                    .setAuthor(usertag, avatar)
                    .setTitle(`Sunt ${Math.round(aki.progress)}% sigur ca te-ai gandit la...`)
                    .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\n\nEste acesta personajul tau? **(Scrie D/Da sau N/Nu)**`)
                    .addField("Rank", `**#${aki.answers[0].ranking}**`, true)
                    .addField("Nr. Intrebari: ", `**${aki.currentStep}**`, true)
                    .setImage(aki.answers[0].absolute_picture_path)
                    .setColor("RANDOM")
                await akiMessage.edit({ embed: guessEmbed });

                // valid answers if the akinator sends the last question
                const guessFilter = x => {
                    return (x.author.id === message.author.id && ([
                        "d",
                        "da",
                        "n",
                        "nu"
                    ].includes(x.content.toLowerCase())));
                }

                await message.channel.awaitMessages(guessFilter, {
                    max: 1, time: 60000
                })
                    .then(async responses => {
                        if (!responses.size) {
                            return akiMessage.edit({ embed: noResEmbed });
                        }
                        const guessAnswer = String(responses.first()).toLowerCase();

                        await responses.first().delete();

                        attemptingGuess.delete(message.guild.id)

                        // if they answered yes
                        if (guessAnswer == "d" || guessAnswer == "da") {
                            let finishedGameCorrect = new Discord.MessageEmbed()
                                .setAuthor(usertag, avatar)
                                .setTitle(`Bine jucat!`)
                                .setThumbnail(aki.answers[0].absolute_picture_path)
                                .setDescription(`**${message.author.username}, am ghicit inca o data 😎!**`)
                                .addField("Personaj", `**${aki.answers[0].name}**`, true)
                                .addField("Rank", `**#${aki.answers[0].ranking}**`, true)
                                .addField("Nr. Intrebari:", `**${aki.currentStep}**`, true)
                                .setColor("RANDOM")
                            await akiMessage.edit({ embed: finishedGameCorrect })
                            notFinished = false;
                            games.delete(message.author.id)
                            return;

                            // otherwise
                        } else if (guessAnswer == "n" || guessAnswer == "no") {
                            if (aki.currentStep >= 78) {
                                let finishedGameDefeated = new Discord.MessageEmbed()
                                    .setAuthor(usertag, avatar)
                                    .setTitle(`Bine jucat!`)
                                    .setDescription(`**${message.author.username}, bravo! M-ai invins... bruh...**`)
                                    .setColor("RANDOM")
                                await akiMessage.edit({ embed: finishedGameDefeated })
                                notFinished = false;
                                games.delete(message.author.id)
                            } else {
                                aki.progress = 50
                            }
                        }
                    });
            }

            if (!notFinished) return;

            let updatedAkiEmbed = new Discord.MessageEmbed()
                .setAuthor(usertag, avatar)
                .setTitle(`Intrebare: ${aki.currentStep + 1}`)
                .setDescription(`**Progres: ${Math.round(aki.progress)}%\n${aki.question}**`)
                .addField("Scrie...", "**D** sau **Da**\n**N** sau **Nu**\n**I** sau **IDK**\n**P** sau **Probabil**\n**PN** sau **Probabil Nu**\n**B** sau **Back**")
                .setFooter(`Poti scrie "S" sau "Stop" sa opresti jocul. | ©️ FII Gaming`)
                .setColor("RANDOM")
            akiMessage.edit({ embed: updatedAkiEmbed })

            // all valid answers when answering a regular akinator question
            const filter = x => {
                return (x.author.id === message.author.id && ([
                    "d",
                    "da",
                    "n",
                    "nu",
                    "i",
                    "idk",
                    "i",
                    "p",
                    "probabil",
                    "pn",
                    "probabil nu",
                    "b",
                    "back",
                    "s",
                    "stop"
                ].includes(x.content.toLowerCase())));
            }

            await message.channel.awaitMessages(filter, {
                max: 1, time: 60000
            })
                .then(async responses => {
                    if (!responses.size) {
                        await aki.win()
                        notFinished = false;
                        games.delete(message.author.id)
                        return akiMessage.edit({ embed: noResEmbed })
                    }
                    const answer = String(responses.first()).toLowerCase().replace("'", "");

                    // assign points for the possible answers given
                    const answers = {
                        "d": 0,
                        "da": 0,
                        "n": 1,
                        "nu": 1,
                        "i": 2,
                        "idk": 2,
                        "p": 3,
                        "probabil": 3,
                        "pn": 4,
                        "probabil nu": 4,
                    }

                    let thinkingEmbed = new Discord.MessageEmbed()
                        .setAuthor(usertag, avatar)
                        .setTitle(`Intrebare: ${aki.currentStep + 1}`)
                        .setDescription(`**Progres: ${Math.round(aki.progress)}%\n${aki.question}**`)
                        //.addField("Scrie...", "**D** sau **Da**\n**N** sau **Nu**\n**I** sau **IDK**\n**P** sau **Probabil**\n**PN** sau **Probabil Nu**\n**B** sau **Back**")
                        .setFooter(`Hmm, ma gandesc...`)
                        .setColor("RANDOM")
                    await akiMessage.edit({ embed: thinkingEmbed })

                    await responses.first().delete();

                    if (answer == "b" || answer == "back") {
                        if (aki.currentStep >= 1) {
                            await aki.back();
                        }

                        // stop the game if the user selected to stop
                    } else if (answer == "s" || answer == "stop") {
                        games.delete(message.author.id)
                        let stopEmbed = new Discord.MessageEmbed()
                            .setAuthor(usertag, avatar)
                            .setTitle(`Joc terminat`)
                            .setDescription(`**${message.author.username}, ai inchis jocul!**`)
                            .setColor("RANDOM")
                        await aki.win()
                        await akiMessage.edit({ embed: stopEmbed })
                        notFinished = false;
                    } else {
                        await aki.step(answers[answer]);
                    }

                    if (!notFinished) return;
                });
        }
    } catch (e) {
        // log any errors that come
        attemptingGuess.delete(message.guild.id)
        games.delete(message.guild.id)
        console.log(e);
    }
}
