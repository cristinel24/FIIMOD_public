/*     FII MODERATION
 *       Discord bot
 *              
 * created by Cristian Andrei
 * started on 18.08.2022 */

const Discord = require("discord.js");
const fs = require("fs");
const Client = new Discord.Client();
const Valeriu = 1009816439030550669;
const gaming_prefix = "!";
const prefix = "-";
const { DiscordTogether } = require('./valeriu_gaming/discord-together/index.js');
Client.discordTogether = new DiscordTogether(Client);
const heroku = require("heroku-restarter")(process.env.heroku, "fiimod");
require('dotenv').config();

const { Calculator, Snake, WouldYouRather, NeverHaveIEver, QuickClick, Fight, Leaderboard, RockPaperScissors, Trivia, Sudo, WillYouPressTheButton, FastType, LieSwatter, GuessThePokemon, ShuffleGuess, bent, flip, mirror, reverseText, tinyCaptial, vaporwave, Logo, Flag, HangmanGame, ConnectFour, News } = require('./valeriu_gaming/index.js');
const akinator = require("./valeriu_gaming/discord.js-akinator/index.js")
const moment = require('moment');
const { weirdToNormalChars } = require('weird-to-normal-chars');
const { meteo, pbinfo, reddit, glume, dadbot, crypto, confirmare, combinatii, mute, deletem, check, grupe, fiimaterials, chatgpt } = require('./resources/functions/index.js')
const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
require("discord-buttons")(Client);
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet(process.env.google_spreadId)
async function login(doc) {
    await doc.useServiceAccountAuth(creds);
}
login(doc);

const ytdl = require("discord-ytdl-core");
const yts = require("yt-search");
const { execSync, exec } = require('child_process');
const createBar = require("string-progressbar");
const Musixmatch = require('@raflymln/musixmatch-lyrics');
const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch)
const Genius = require("genius-lyrics");
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotify_clientId,
    clientSecret: process.env.spotify_clientSecret,
    redirectUri: 'https://www.youtube.com/channel/UCIrw99lT7bD7am9AiSdst-w'
});
spotifyApi.setAccessToken(process.env.spotify_accesToken);

spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        spotifyApi.setAccessToken(data.body[`Bearer ${process.env.spotify_accesToken}`]);
    }, function (err) {
        console.log('Something went wrong!', err);
    });

const ly = new Genius.Client(process.env.genius);

let queue = new Map();
let stream, ms, msgrow, currentsong = 0, qsongs = 0, row, dispatcher;

///Joculete
const backgammon = "https://cardgames.io/backgammon/";
const uno = "https://www.crazygames.ro/joc/uno-online";
const chess = "https://www.chess.com/ro";
const dame = "https://www.freeboardgames.org/play/checkers";
const skribbl = "https://skribbl.io/";
const cards = "https://xyzzy.clrtd.com/zy/game.jsp";
const krunker = "https://krunker.io/";
const prinde_berea = "https://www.oyuncubey.com/en/games/BeerStrip.aspx";

///DUH
var duh = new Array("da", "absolut", "cu siguranta", "cel mai probabil", "sigur, de ce nu?", "vei afla in curand", "nu m-as baza pe asta", "posibil", "probabil", "nu stiu", "nu sunt sigur", "sigur, de ce nu?", "probabil ca nu", "cu siguranta ca nu", "imposibil", "inimaginabil");

process.on('unhandledRejection', error => {
    if (error.httpStatus == 404) return;
    else if (error == 'DiscordAPIError: Unknown Message') return;
    else console.log(error);
});

Client.on('ready', async () => {
    console.log("Bot 'FII Bot' is online.");
    exec("node ./fiigpt/index.js");
    //Client.channels.cache.get('1006725055339835423').send("", { files: ["./resources/valentine.png"] });
    //let msg = new Discord.MessageEmbed()
    //    .setColor("PURPLE")
    //    .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
    //    .setTitle("Fondu clasei")
    //    .setDescription('**Botii FII isi vor incheia activitatea** deoarece platforma de hosting (Heroku) nu mai accepta free dynos (resources). Daca vrei sa-l ajuti pe **FII Mod** sau pe **FII bot** cu o bucată de resursă, poti dona orice fărâmă de ban [AICI](https://www.paypal.com/donate/?hosted_button_id=ZNCRRKBDBX7CE). <- \n\nGoal: `2$/month`\n[Click for reward](https://cdn.discordapp.com/attachments/1010247914209165433/1044328837082775642/316251025_875560120111990_9061996522455374482_n.jpg)')
    //    .setThumbnail("https://cdn.discordapp.com/attachments/1010247914209165433/1044317956114481172/ezgif.com-gif-maker.gif")
    //    .setTimestamp()
    //    .setFooter(`Facultatea de Informatica Iasi`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
    //Client.channels.cache.get('1010247914209165433').send(msg);
    //Client.channels.cache.get('1010465479732768809').send(`<@&1010298297237393479>, friendly-reminder: **confirmati-va locul** pe canalul <#1010313240334581761> si veti avea **full acces la server**!`);
    //let msg = new Discord.MessageEmbed()
    //    .setColor("PURPLE")
    //    .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
    //    .setTitle("Confirmare grupa")
    //    .setDescription("<@&1022488501943550022>, va rugam sa va setati grupa din care faceti parte pentru a avea **full acces la server**!")
    //    .setThumbnail("https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
    //    .addFields(
    //        { name: "Scrie comanda:", value: "`/grupa [numele grupei]`" },
    //        { name: "Exemplu:", value: "`/grupa B1`" }
    //    )
    //    .setImage("https://cdn.discordapp.com/attachments/1022460690566488084/1022525753587421235/grupe.gif")
    //    .setTimestamp()
    //    .setFooter(`Facultatea de Informatica Iasi`, "https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png")
    //Client.channels.cache.get('1022460690566488084').send(msg);
    Client.user.setActivity('Facultatea de Informatica', {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=fC7oUOUEEi4"
    });

    Client.api.applications(Client.user.id).commands.post({
        data: {
            name: "games",
            description: "Joculetze cu prietenii tai (daca ai)",
            options: [
                {
                    name: "voice_channel",
                    description: "Voice Channel ul pentru care vrei sa pornesti jocul",
                    type: 7,
                    required: true
                },
                {
                    name: "game",
                    description: "Jocul pe care vrei sa-l jucati",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "Poker",
                            value: 'poker',
                        },
                        {
                            name: "Chess",
                            value: 'chess',
                        },
                        {
                            name: "Betrayal",
                            value: 'betrayal',
                        },
                        {
                            name: "Fishing",
                            value: 'fishing',
                        },
                        {
                            name: "Doodle Crew",
                            value: 'doodlecrew',
                        },
                        {
                            name: "Letter Tile",
                            value: 'lettertile',
                        },
                        {
                            name: "Word Snacks",
                            value: 'wordsnack',
                        },
                        {
                            name: "Spell Cast",
                            value: 'spellcast',
                        },
                        {
                            name: "Awk Word",
                            value: 'awkword',
                        },
                        {
                            name: "Checkers",
                            value: 'checkers',
                        }
                    ],
                }
            ]

        }
    });

    Client.api.applications(Client.user.id).commands.post({
        data: {
            name: "youtube",
            description: "Youtube Together",
            options: [
                {
                    name: "voice_channel",
                    description: "Voice Channel-ul pentru care vrei sa deschizi youtube-ul",
                    type: 7,
                    required: true
                },
            ]

        }
    });
    Client.api.applications(Client.user.id).commands.post({
        data: {
            name: "grupa",
            description: "Grupa ta!",
            options: [
                {
                    name: "grupa",
                    description: "Grupa din care faci parte!",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "A1",
                            value: "A1"
                        },
                        {
                            name: "A2",
                            value: "A2"
                        },
                        {
                            name: "A3",
                            value: "A3"
                        },
                        {
                            name: "A4",
                            value: "A4"
                        },
                        {
                            name: "A5",
                            value: "A5"
                        },
                        {
                            name: "B1",
                            value: "B1"
                        },
                        {
                            name: "B2",
                            value: "B2"
                        },
                        {
                            name: "B3",
                            value: "B3"
                        },
                        {
                            name: "B4",
                            value: "B4"
                        },
                        {
                            name: "E11",
                            value: "E11"
                        },
                        {
                            name: "E12",
                            value: "E12"
                        },
                        {
                            name: "E13",
                            value: "E13"
                        },
                    ]
                }
            ]
        }
    });
    Client.api.applications(Client.user.id).commands.post({
        data: {
            name: "confirm",
            description: "Confirmati locul!",
            options: [
                {
                    name: "nr_dosar",
                    description: "Numarul dosarului tau!",
                    type: 4,
                    required: true
                },
                {
                    name: "grupa",
                    description: "Grupa din care faci parte!",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "A1",
                            value: "A1"
                        },
                        {
                            name: "A2",
                            value: "A2"
                        },
                        {
                            name: "A3",
                            value: "A3"
                        },
                        {
                            name: "A4",
                            value: "A4"
                        },
                        {
                            name: "A5",
                            value: "A5"
                        },
                        {
                            name: "B1",
                            value: "B1"
                        },
                        {
                            name: "B2",
                            value: "B2"
                        },
                        {
                            name: "B3",
                            value: "B3"
                        },
                        {
                            name: "B4",
                            value: "B4"
                        },
                        {
                            name: "E11",
                            value: "E11"
                        },
                        {
                            name: "E12",
                            value: "E12"
                        },
                        {
                            name: "E13",
                            value: "E13"
                        },
                    ]
                }
            ]

        }
    });

    //Client.api.applications(Client.user.id).commands.post({
    //    data: {
    //        name: "fii-materials",
    //        description: "Cauta materiale pe fii-materials!",
    //        options: [
    //            {
    //                name: "materia",
    //                description: "Materia pe care vrei sa o cauti",
    //                type: 3,
    //                required: true,
    //                choices: [
    //                    {
    //                        name: "Logică (Logică pentru Informatică)",
    //                        value: "logica"
    //                    },
    //                    {
    //                        name: "Mate (Matematică - Calcul Diferențial și Integral)",
    //                        value: "mate"
    //                    },
    //                    {
    //                        name: "SD (Structuri de Date)",
    //                        value: "sd"
    //                    },
    //                    {
    //                        name: "ACSO (Arhitectura Calculatoarele și Sisteme de Operare)",
    //                        value: "acso"
    //                    },
    //                    {
    //                        name: "IP (Introducere în Programare)",
    //                        value: "ip1"
    //                    },
    //                    {
    //                        name: "POO (Programare orientată pe obiecte)",
    //                        value: "oop"
    //                    },
    //                    {
    //                        name: "SO (Sisteme de Operare)",
    //                        value: "so"
    //                    },
    //                    {
    //                        name: "FAAI (Fundamente Algebrice Ale Informaticii)",
    //                        value: "faai"
    //                    },
    //                    {
    //                        name: "PS (Probabilități și Statistici)",
    //                        value: "ps"
    //                    },
    //                    {
    //                        name: "PA (Proiectarea Algoritmilor)",
    //                        value: "pa"
    //                    },
    //                    {
    //                        name: "RC (Rețele de Calculatoare)",
    //                        value: "rc"
    //                    },
    //                    {
    //                        name: "BD (Baze de Date)",
    //                        value: "bd"
    //                    },
    //                    {
    //                        name: "LFAC (Limbaje formale, automate si compilatoare)",
    //                        value: "lfac"
    //                    },
    //                    {
    //                        name: "AG (Algoritmica Grafurilor)",
    //                        value: "ag"
    //                    },
    //                    {
    //                        name: "CDC (Calculabilitate, Decidabilitate si Complexitate)",
    //                        value: "cdc"
    //                    },
    //                    {
    //                        name: "PLP (Principii ale Limbajelor de Programare)",
    //                        value: "plp"
    //                    },
    //                    {
    //                        name: "AG (Algoritmi Genetici)",
    //                        value: "genetici"
    //                    },
    //                    {
    //                        name: "QC (Quantum Computing)",
    //                        value: "qc"
    //                    },
    //                    {
    //                        name: "TW (Tehnologii WEB)",
    //                        value: "web"
    //                    },
    //                    {
    //                        name: "PA (Programare Avansată)",
    //                        value: "pa2"
    //                    },
    //                    {
    //                        name: "IP (Ingineria Programării)",
    //                        value: "ip2"
    //                    },
    //                    {
    //                        name: "SGBD (Practică SGBD)",
    //                        value: "sgbd"
    //                    },
    //                    {
    //                        name: "Antreprenoriat (Antreprenoriat si inovare in IT)",
    //                        value: "ant"
    //                    },
    //                    {
    //                        name: "SE (Sisteme Embedded)",
    //                        value: "se"
    //                    },
    //                    {
    //                        name: "ML (Machine Learning)",
    //                        value: "ml"
    //                    },
    //                    {
    //                        name: "IS (Securitatea Informației)",
    //                        value: "is"
    //                    },
    //                    {
    //                        name: "AI (Inteligență Artificială)",
    //                        value: "ai"
    //                    },
    //                    {
    //                        name: "PP (Programare în Python)",
    //                        value: "pp"
    //                    },
    //                    {
    //                        name: "RN (Rețele Neuronale)",
    //                        value: "rn"
    //                    },
    //                    {
    //                        name: "TPM (Tehnici de Programare Multiprocesor)",
    //                        value: "tpm"
    //                    },
    //                    {
    //                        name: "CN (Calcul Numeric)",
    //                        value: "cn"
    //                    },
    //                    {
    //                        name: "Grafică (Grafică pe Calculator și Geometrie Computațională)",
    //                        value: "grafica"
    //                    },
    //                    {
    //                        name: "Mobile (Tehnici de Programare pe Platforme Mobile)",
    //                        value: "mobile"
    //                    },
    //                    {
    //                        name: "Cloud (Cloud Computing)",
    //                        value: "cloud"
    //                    },
    //                    {
    //                        name: "IOC (Interacțiune Om-Calculator)",
    //                        value: "ioc"
    //                    },
    //                    {
    //                        name: "ISSA (Inginerie Software Specifică Automobilelor)",
    //                        value: "issa"
    //                    }
    //                ]
    //            }
    //        ]
    //    }
    //});

    

    Client.ws.on("INTERACTION_CREATE", async interaction => {
        if (interaction.type != 2) return;
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        if (command == "games") {
            const voice = args.find(arg => arg.name.toLowerCase() == "voice_channel").value;
            const description = args.find(arg => arg.name.toLowerCase() == "game").value;
            Client.discordTogether.createTogetherCode(voice, description).then(async invite => {

                Client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, invite.code)

                    }
                });
            });
            setTimeout(() => {
                Client.api.webhooks(Client.user.id, interaction.token)
                    .messages("@original").delete();
            }, 1800000);
        }
        if (command == "youtube") {
            const voice = args.find(arg => arg.name.toLowerCase() == "voice_channel").value;
            Client.discordTogether.createTogetherCode(voice, 'youtube').then(async invite => {

                Client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, invite.code)

                    }
                });
            });
            setTimeout(() => {
                Client.api.webhooks(Client.user.id, interaction.token)
                    .messages("@original").delete();
            }, 1800000);
        }
        if (command == 'confirm') {
            Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, "** **")

                }
            });
            setTimeout(() => {
                Client.api.webhooks(Client.user.id, interaction.token)
                    .messages("@original").delete();
            }, 3000);
            const nrdosar = args.find(arg => arg.name.toLowerCase() == "nr_dosar").value;
            const grupa = args.find(arg => arg.name.toLowerCase() == "grupa").value;
            let spec = "";
            if (grupa[0] == "A" || grupa[0] == "B") spec = "ro";
            else if (grupa[0] == "E") spec = "eng";
            let lista = await fs.readFileSync("./config/L9_merged.txt", 'utf8').toString();
            return await confirmare(Client, nrdosar, grupa, spec, lista, interaction) 
        }
        if (command == 'grupa') {
            Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, "** **")

                }
            });
            setTimeout(() => {
                Client.api.webhooks(Client.user.id, interaction.token)
                    .messages("@original").delete();
            }, 3000);
            const grupa = args.find(arg => arg.name.toLowerCase() == "grupa").value;

            return await grupe(Client, grupa, interaction)
        }
        else if (command == 'fii-materials') {
            Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, "** **")

                }
            });
            setTimeout(() => {
                Client.api.webhooks(Client.user.id, interaction.token)
                    .messages("@original").delete();
            }, 3000);
            const titlu = args.find(arg => arg.name.toLowerCase() == "materia").name;
            const materia = args.find(arg => arg.name.toLowerCase() == "materia").value;

            return await fii - materials(Client, materia, titlu, interaction);
        }
        
    });
    async function createAPIMessage(interraction, content) {
        const apiMessage = await Discord.APIMessage.create(Client.channels.resolve(interraction.channel_id), content)
            .resolveData()
            .resolveFiles();

        return { ...apiMessage.data, files: apiMessage.files };
    }
})

Client.on("voiceStateUpdate", async function (oldMember, newMember) {
    if (newMember.id == Valeriu && newMember.serverMute == true) {
        let channel = newMember.guild.channels.cache.get(newMember.channelID);
        for (const [memberID, member] of channel.members) {
            if (memberID == Valeriu) {
                member.voice.setMute(false);
                const fetchedLogs = await newMember.guild.fetchAuditLogs({
                    limit: 1,
                    type: 'MEMBER_UPDATE',
                });
                const banLog = fetchedLogs.entries.first();
                const { executor, target } = banLog;
                executor.send("Nu mi mai da mute ca nu te ascult");
            }
        }
    }
    if (newMember.serverDeaf == true && newMember.id == Valeriu) {
        let channel = newMember.guild.channels.cache.get(newMember.channelID);
        for (const [memberID, member] of channel.members) {
            if (memberID == Valeriu)
                member.voice.setDeaf(false);
        }
    }
    if (!newMember.connection && newMember.id == Valeriu) {
        let serverQueue = queue.get(newMember.guild.id);
        if (serverQueue && serverQueue.songs[0]) {
            serverQueue.connection = await oldMember.guild.channels.cache.get(oldMember.channelID).join();
            Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
            play(newMember.guild, serverQueue.songs[0]);
        }
    }
});

Client.on('guildMemberAdd', async function (member) {

    anunturi_kgb = Client.channels.cache.get('1006862397803331655');
    let msg = new MessageEmbed()
        .setColor('#2ECC71')
        .setTitle(`${member.user.username} s-a alaturat serverului!`)
        .setAuthor(`${member.user.tag}`, member.user.avatarURL({dynamic: true}))
        .setDescription(`Felicitari, <@${member.id}> ! 😎🥳💪`)
        .setThumbnail(member.user.avatarURL({dynamic: true}))
        .addField('Cont creat:', moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a'), true)
        .setTimestamp()
        .setFooter(`${member.guild.name}`, member.guild.iconURL());

    anunturi_kgb.send(msg);

    if (member.guild.id == '999949998420672582') {
        if (member.user.bot) {
            let role = member.guild.roles.cache.find(r => r.id === "1009412681289179176");
            member.roles.add(role);
        }
        else {
            let role = member.guild.roles.cache.find(r => r.id === "1010298297237393479");
            member.roles.add(role);
        }
    }
});

Client.on('guildMemberRemove', async function (member) {
    anunturi_kgb = Client.channels.cache.get('1006862397803331655');
    const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    rows.forEach((row) => {
        if (row.id == member.id) {
            row.delete();
        }
    })
    const banLog = fetchedLogs.entries.first();
    if (banLog.action == 'MEMBER_KICK') {
        const { executor, target } = banLog;
        if (target.id == member.id) {
            msg = new MessageEmbed()
                .setColor('#E74C3C')
                .setTitle(`${member.user.username} a primit kick!`)
                .setAuthor(`${member.user.tag}`, member.user.avatarURL({dynamic: true}))
                .setDescription(`Dat afara de catre: ${executor.username}#${executor.discriminator}`)
                .setThumbnail(member.user.avatarURL({dynamic: true}))
                .setTimestamp()
                .setFooter(`${member.guild.name}`, member.guild.iconURL());
            return anunturi_kgb.send(msg);
        }
    }
    else if (banLog.action == 'MEMBER_BAN_ADD') return;
    msg = new MessageEmbed()
        .setColor('#E74C3C')
        .setTitle(`${member.user.username} a iesit de pe server 😐`)
        .setAuthor(`${member.user.tag}`, member.user.avatarURL({dynamic: true}))
        .setThumbnail(member.user.avatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter(`${member.guild.name}`, member.guild.iconURL());

    return anunturi_kgb.send(msg);
});

Client.on('guildBanAdd', async function (ban) {
    const fetchedLogs = await ban.fetchAuditLogs({
        limit: 1
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    rows.forEach((row) => {
        if (row.id == member.id) {
            row.delete();
        }
    })
    const banLog = fetchedLogs.entries.first();
    if (banLog.action == 'MEMBER_BAN_ADD') {
        const { executor, target } = banLog;

        anunturi_kgb = Client.channels.cache.get('1006862397803331655');
        let msg = new MessageEmbed()
            .setColor('#0080ff')
            .setTitle(`${target.username} a primit ban!`)
            .setAuthor(`${target.username}#${target.discriminator}`, target.avatarURL({dynamic: true}))
            .setDescription(`Banat de catre: ${executor.username}#${executor.discriminator}`)
            .setThumbnail(target.avatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter(`${ban.name}`, ban.iconURL());

        return anunturi_kgb.send(msg);
    }
});

Client.on('guildBanRemove', async function (ban) {
    const fetchedLogs = await ban.fetchAuditLogs({
        limit: 1,
    });
    const banLog = fetchedLogs.entries.first();
    if (banLog.action == 'MEMBER_BAN_REMOVE') {
        const { executor, target } = banLog;
        anunturi_kgb = Client.channels.cache.get('1006862397803331655');
        let msg = new MessageEmbed()
            .setColor('#0080ff')
            .setTitle(`${target.username}#${target.discriminator} a primit unban!`)
            .setAuthor(`${ban.name}`, ban.iconURL())
            .setDescription(`Ban revocat de catre: ${executor.username}#${executor.discriminator}`)
            .setThumbnail(target.avatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter(`${ban.name}`, ban.iconURL());

        return anunturi_kgb.send(msg);
    }
});

Client.on('messageUpdate', async function (oldMessage, newMessage) {
    var message = Client.channels.cache.get(newMessage.channel.id);
    var mesaj = weirdToNormalChars(newMessage.content.toLowerCase());
    var msj = "";
    for (var i = 0; i < mesaj.length; i++)
        if ((mesaj[i] >= 'a' && mesaj[i] <= 'z') || mesaj[i] == '/')
            msj += mesaj[i];
    if ((msj.includes("nigger") || msj.includes("nigga") || msj.includes("niga") || msj.includes("nibba") || msj.includes("tigan") || msj.includes("nlgger")) && message.author != Valeriu) {
        newMessage.reply("esti putin cam rasist");
        newMessage.delete();
    }
});

Client.on('message', async message => {

    if (message.author.id == Valeriu) return;
    if (message.author.bot) return;

    //if (message.content.startsWith("fiibot")) {
    //    chatgpt(Client, message);
    //}


    //if (message.author.id == '272049642261315596') {
    //    let memb = Client.guilds.cache.get('999949998420672582').members.cache.array().filter(mbm => { return (mbm.roles.cache.has('1022448443353989190') || mbm.roles.cache.has('1022448552800161873') || mbm.roles.cache.has('1022448593396834344') || mbm.roles.cache.has('1022448647268466760') || mbm.roles.cache.has('1022448726083649576'))})
    //    memb.forEach(member => {
    //        member.roles.add('1022529765376282645');
    //    })
    //    memb = Client.guilds.cache.get('999949998420672582').members.cache.array().filter(mbm => { return (mbm.roles.cache.has('1022448767934402600') || mbm.roles.cache.has('1022448869566578709') || mbm.roles.cache.has('1022448902307336242') || mbm.roles.cache.has('1022448935756894228')) })
    //    memb.forEach(member => {
    //        member.roles.add('1022530385306988554');
    //    })
    //    memb = Client.guilds.cache.get('999949998420672582').members.cache.array().filter(mbm => { return (mbm.roles.cache.has('1022453847555325973') || mbm.roles.cache.has('1022453881977978890') || mbm.roles.cache.has('1022453912025972746')) })
    //    memb.forEach(member => {
    //        member.roles.add('1022530625019858974');
    //    })
    //}
    //return;
    message.content = weirdToNormalChars(message.content);
    let admin;
    admin = "1006657031865913465";
    kalinka = Client.channels.cache.get('1006673343681941515');

    function WordCount(str) {
        return str.split(" ").length;
    }
    var mesaj = message.content.toLowerCase();

    if (message.content == 'fii-check' && message.author.id == '272049642261315596') {
        let lista = await fs.readFileSync("./config/L9_merged.txt", 'utf8');
        check(lista, message);
        return message.delete();
    }

    ///MUSIC
    if (message.channel.id == "1006673343681941515") {
        let serverQueue;
        let prefix = '-';
        if (message.guild)
            serverQueue = queue.get(message.guild.id);
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        if (mesaj.startsWith("ping") && mesaj.length == 4) {
            message.channel.send("Am `" + `${Date.now() - message.createdTimestamp}` + "ms`" + ", nu am mai platit netul de " + Math.floor(Math.random() * 11 + 2) + " luni"); return;
        }

        if (mesaj.startsWith(`${prefix}ajutor`) || mesaj.startsWith(`${prefix}help`)) {
            message.react("✅");
            let msg = new Discord.MessageEmbed()
                .setColor('#34495E')
                .setTitle('FII Music')
                .setDescription('Uite aici ai comenzile mele:')
                .addFields(
                    { name: `**${prefix}p | ${prefix}play**`, value: `Pui orice melodie de pe Youtube/Spotify`, inline: true },
                    { name: `**${prefix}np | ${prefix}now | ${prefix}acum**`, value: `Melodia curenta, precum si timestamp-ul`, inline: true },
                    { name: `**${prefix}n | ${prefix}skip**`, value: `Urmatoarea melodie`, inline: true },
                    { name: `** **`, value: `** **` },
                    { name: `**${prefix}stop**`, value: `Opresti redarea audio`, inline: true },
                    { name: `**${prefix}lyrics**`, value: `Versuri. Nu merge pentru toate melodiile, merge in mare parte tot ce e pe genius`, inline: true },
                    { name: `**${prefix}seek (mm:ss)**`, value: `Jump la un anumit moment din melodie (de ex: minutul 1:36 din Melodia X)`, inline: true },
                    { name: `** **`, value: `** **` },
                    { name: `**${prefix}l | ${prefix}loop **`, value: `Loop melodie/queue \n`, inline: true },
                    { name: `**${prefix}q | ${prefix}queue**`, value: `Efectiv queue-ul (lista de dedicatii)`, inline: true },
                    { name: `**${prefix}pause**`, value: `Efectiv pause`, inline: true },
                    { name: `** **`, value: `** **` },
                    { name: `**${prefix}resume**`, value: `Efectiv resume`, inline: true },
                    { name: `**${prefix}clear**`, value: `Stergi lista de dedicatii (queue-ul)`, inline: true },
                    { name: `**${prefix}reset**`, value: `Resetezi bot-ul daca nu mai merge corespunzator`, inline: true },
                    { name: `** **`, value: `** **` },
                    { name: `**${prefix}r | ${prefix}remove**`, value: `Dai remove la o melodie din queue`, inline: true },
                    { name: `**${prefix}rm (X:Y)**`, value: 'Stergi melodii din queue dintr-un interval inchis de 2 numere (ex. `-rm 6 9` sterge 4 melodii)', inline: true },
                    { name: `**${prefix}m | ${prefix}move (X:Y)**`, value: `Muti melodia X pe pozitia Y`, inline: true },
                    { name: `**${prefix}j | ${prefix}jump (X)**`, value: `Sari la melodia X din queue`, inline: true },
                    { name: `**${prefix}v | ${prefix}volume (X)**`, value: `Volume boost`, inline: true },
                    { name: `**${prefix}shuffle**`, value: "Efectiv shuffle la queue", inline: true },
                    { name: `**${prefix}manea [optional: numar]**`, value: 'Adaugi in queue o manea random', inline: true },
                    { name: `**${prefix}radio**`, value: `Radio cu cele mai ascultate posturi romanesti`, inline: true })
                .setFooter(`realizat de Cristinel#7969`, 'https://cdn.discordapp.com/attachments/1009798198325420153/1009802480332325014/119023392_767970660648080_1182354882399763344_n.jpg');
            let imp = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("IMPORTANT!")
                .setDescription("Daca bot-ul se opreste random din a reda audio, folositi-va de comenzile de mai jos:")
                .addFields(
                    { name: "```-j 0```", value: "Dati play la melodia 0 (melodia curenta) din queue", inline: true },
                    { name: "```-reset```", value: "Resetati disptacher-ul audio precum si queue-ul", inline: true }
                )
                .setFooter(`realizat de Cristinel#7969`, 'https://cdn.discordapp.com/attachments/1009798198325420153/1009802480332325014/119023392_767970660648080_1182354882399763344_n.jpg');
            return message.author.send(msg, imp);
        }

        if (mesaj.startsWith(`${prefix}play`) || mesaj.startsWith(`${prefix}p `)) {
            execute(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}now`) || mesaj.startsWith(`${prefix}np`) || mesaj.startsWith(`${prefix}acum`)) {
            if (serverQueue.songs[0])
                NowPlaying(ms + serverQueue.connection.dispatcher.streamTime, message, serverQueue);
            else return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            return;
        }
        else if (mesaj.startsWith(`${prefix}skip`) || mesaj.startsWith(`${prefix}n`)) {
            skip(message, serverQueue, message.author, false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}stop`)) {
            stop(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}lyric`)) {
            Lyrics(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}leave`)) {
            Leave(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}radio`)) {
            Radio(message, false);
            let post = {
                name: "", url: "", site: ""
            };
            Client.once('clickMenu', async menu => {
                switch (menu.values[0]) {
                    case 'antenasatelor': post.name = 'Antena Satelor'; post.url = "http://89.238.227.6:8040/litsne.pls"; post.site = "https://www.antenasatelor.ro/"; break;
                    case 'dancefm': post.name = 'Dance FM'; post.url = "https://edge126.rcs-rds.ro/profm/dancefm.mp3"; post.site = "https://www.dancefm.ro/"; break;
                    case 'deephouse': post.name = 'Deep House Romania'; post.url = "http://live.dancemusic.ro:7000/stream"; post.site = "https://www.dancemusic.ro/"; break;
                    case 'digifm': post.name = 'Digi FM'; post.url = "http://edge76.rdsnet.ro:84/digifm/digifm.mp3"; post.site = "https://www.digifm.ro/"; break;
                    case 'europafm': post.name = 'Europa FM'; post.url = "http://astreaming.europafm.ro:8000/EuropaFM_aac"; post.site = "https://www.europafm.ro/"; break;
                    case 'kissfm': post.name = 'Kiss FM'; post.url = "https://live.kissfm.ro/kissfm.aacp"; post.site = "https://www.kissfm.ro/"; break;
                    case 'magicfm': post.name = 'Magic FM'; post.url = "https://live.magicfm.ro/magicfm.aacp"; post.site = "https://www.magicfm.ro/"; break;
                    case 'manele-premium': post.name = 'Manele Premium Romania'; post.url = "http://stream.adradio.ro/mp128"; post.site = "http://manelepremium.com/"; break;
                    case 'manele-unu': post.name = 'Manele UNU Romania'; post.url = "http://radio1manele.no-ip.org:8000/listne.pls"; post.site = "https://radiounumanele.ro/"; break;
                    //case 'manele-vechi': post.name = 'Manele Vechi Romania'; post.url = "http://ssl.ascultatare.ro:8122/stream"; post.site = "https://myradioonline.ro/radio-manele-vechi"; break;
                    case 'ortodox': post.name = 'Ortodox Radio Romania'; post.url = "http://www.ortodoxradio.ro:8000/stream48"; post.site = "https://www.ortodoxradio.ro/"; break;
                    case 'profm': post.name = 'Pro FM'; post.url = "http://edge126.rdsnet.ro:84/profm/profm.mp3"; post.site = "https://www.profm.ro/"; break;
                    case 'rockfm': post.name = 'Rock FM'; post.url = "https://live.rockfm.ro/rockfm.aacp"; post.site = "https://www.rockfm.ro/"; break;
                    case 'romania-actualitati': post.name = 'Radio Romania Actualitati'; post.url = "http://89.238.227.6:8008/listne.pls"; post.site = "http://www.romania-actualitati.ro/"; break;
                    case 'romanticfm': post.name = 'Romantic FM'; post.url = "http://zuicast.digitalag.ro:9420/romanticfm"; post.site = "https://romanticfm.ro/live"; break;
                    case 'taraf': post.name = 'Taraf FM'; post.url = "http://asculta.radiotaraf.ro:7100/listne.pls"; post.site = "https://radiotaraf.ro/"; break;
                    case 'lautaru-popular': post.name = 'Lautaru Popular'; post.url = "http://162.19.18.212:9000/stream"; post.site = "https://radiotaraf.ro/radio-taraf-petrecere-popular-etno/"; break;
                    case 'virgin': post.name = 'Virgin Radio'; post.url = "http://astreaming.virginradio.ro:8000/virgin_mp3_64k"; post.site = "https://virginradio.ro/"; break;
                    case 'vivafm': post.name = 'Viva FM Iasi'; post.url = "https://sonicpanel.hostclean.ro/8004/stream"; post.site = "https://vivafm.ro/"; break;
                    case 'jazzfm': post.name = 'Jazz FM'; post.url = "http://s4.radio.co:80/s1e25bf273/listen"; post.site = "https://jazzfm.ro/"; break;
                    case 'penny': post.name = 'Penny FM'; post.url = "https://listen.radiomax.technology/Penny-Romania"; post.site = "https://www.pennyfm.ro/"; break;
                    case 'evanghelia': post.name = 'Radio Vocea Evangheliei'; post.url = "http://streamer.radio.co:80/sb94ce6fe2/listen"; post.site = "http://www.rve.ro/"; break;
                    case 'itsy': post.name = 'Radio Itsy Bitsy'; post.url = "http://live.itsybitsy.ro:8000/itsybitsy"; post.site = "http://www.itsybitsy.ro"; break;
                    case 'cluj': post.name = 'Cluj FM'; post.url = "http://89.238.227.6:8384/"; post.site = "http://www.radiocluj.ro/ro/"; break;
                    case 'qanon': post.name = 'Qanon Romania'; post.url = "http://radioqanon.asculta.live:8000/listei.pls"; post.site = "https://buletin.de/bucuresti/qanon-o-miscare-din-sua-care-a-convins-mii-de-romani-ca-donald-trump-e-salvatorul-lumii-isi-trimit-copiii-cu-masti-false-la-scoala-si-se-pregatesc-de-distrugerea-ocultei-mondiale-satanice/"; break;
                }
                menu.reply.defer();
                if (post.url != "") {
                    radio_q(message, serverQueue, post, menu.clicker, false); menu.message.delete();
                }
            })

            return;
        }
        else if (mesaj.startsWith(`${prefix}rec`)) {
            Record(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}lis`)) {
            Listen(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}loop`) || mesaj.startsWith(`${prefix}l`)) {
            Loop(message, serverQueue, message.author, row, serverQueue.songs[0], false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}queue`) || mesaj.startsWith(`${prefix}q`)) {
            Queue(message, serverQueue, message.author, false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}pause`)) {
            Pause(message, serverQueue, message.author, false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}resume`)) {
            Resume(message, serverQueue, message.author, false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}clear`)) {
            Clear(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}manea`)) {
            Manea(message, serverQueue, false);
            return;
        }
        else if (mesaj.startsWith(`${prefix}reset`)) {
            Reset(message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}rm`) || mesaj.startsWith(`${prefix}removemultiple`)) {
            RemoveMultiple(args, message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}remove`) || mesaj.startsWith(`${prefix}r`)) {
            Remove(args, message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}move`) || mesaj.startsWith(`${prefix}m`)) {
            Move(args, message, serverQueue);
            return;
        }
        else if ((mesaj.startsWith(`${prefix}jump`) || mesaj.startsWith(`${prefix}j`)) && message.author != Valeriu) {
            Jump(args, message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}volume`) || mesaj.startsWith(`${prefix}v`)) {
            Volume(args, message, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}shuffle`)) {
            Shuffle(message, serverQueue.songs, serverQueue);
            return;
        }
        else if (mesaj.startsWith(`${prefix}seek`) || mesaj.startsWith(`${prefix}s`)) {
            Seek(args, message, serverQueue);
            return;
        }
        else {
            if (message.author != Valeriu && mesaj.includes(`${prefix}`))
                message.channel.send("Baga un link calumea sau invata sa scri macar. Vezi ca aici ma uit doar daca pui muzica").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 7000) });
        }
    }

    ///Heroku
    if (message.author.id == '272049642261315596' && mesaj == '$restart') {
        herok(message);
    }
    ///CRISTI
    if (message.author.id == '272049642261315596' && mesaj == '$db') {
        let but = new MessageButton()
            .setStyle("url")
            .setLabel("Database")
            .setURL(process.env.database)
        return message.author.send(but);
    }

    ///Dad Bot
    if (mesaj.includes(`i'm `) || mesaj.includes(`im `) || mesaj.includes(`lm `) || mesaj.includes(`l'm `)) {
        dadbot(message, mesaj);
    }

    ///Valeriu Mute
    if (((mesaj.startsWith("mute") || mesaj.startsWith("unmute") || mesaj.startsWith("deaf") || mesaj.startsWith("undeaf") || mesaj.startsWith("disconnect"))) && message.member.roles.cache.has(admin)) {
        return mute(message, mesaj);
    }

    ///Delete command
    if (mesaj.startsWith("delete")) {
        if (message.member.roles.cache.has(admin) || message.member.id == "272049642261315596") {
            deletem(message, mesaj);
        } else {
            message.channel.send("Nu ai drepturi xd");
        }
        return;
    }



    ///Reddit
    if (mesaj.startsWith('r/')) {
        return reddit(message);
    }

    ///Crypto
    if (mesaj.startsWith("fii crypto")) return crypto(message);

    ///Reacts
    if ((mesaj.includes("ok") || mesaj.includes("bine") || mesaj.includes("bn")) && message.author != Valeriu) {
        message.react("👍");
    }
    if ((mesaj.includes("iubesc") || mesaj.includes("iubire") || mesaj.includes("iub") || mesaj.includes("ubesk") || mesaj.includes("love") || mesaj.includes("dragoste")) && message.author != Valeriu) {
        message.react("❤");
    }
    if (mesaj.includes("urasc") || mesaj.includes("detest") || mesaj.includes("cluj") || mesaj.includes("clug")) {
        message.react("😫");
    }
    if (mesaj.includes("galati") || mesaj.includes("galatzi") || mesaj.includes("craiova") || mesaj.includes("braila") || mesaj.includes("vaslui") || mesaj.includes("te tai") || mesaj.includes("te bat") || mesaj.includes("te omor") || mesaj.includes("😳")) {
        message.react("😳");
    }
    if (mesaj.includes("iasi")) {
        message.react("😎");
    }
    if (mesaj.includes("rau") || mesaj.includes("rău")) {
        message.react("😭");
    }
    if (mesaj.includes("roman") || mesaj.includes("manele") || mesaj.includes("manea")) {
        message.react("🇷🇴");
    }
    if (mesaj.includes("harghita") || mesaj.includes("secuiesc") || mesaj.includes("ungur") || mesaj.includes("ungaria")) {
        message.react("🇭🇺");
    }
    if (mesaj.includes("constanta")) {
        message.react("🚢");
    }
    if (mesaj.includes("nani") || mesaj.includes("what") || mesaj.includes("wtf")) {
        message.react("⁉");
    }
    if (mesaj.includes("cox") || mesaj.includes("xanax") || mesaj.includes("lsd") || mesaj.includes("cocaina") || mesaj.includes("meth") || mesaj.includes("boaba") || mesaj.includes("drog") || mesaj.includes("droage") || mesaj.includes("ilegal") || mesaj.includes("metamfetamina") || mesaj.includes("heroina") || mesaj.includes("iarba") || mesaj.includes("marijuana") || mesaj.includes("marihuana")) {
        message.react("🅱");
        message.react("🅾");
        message.react("🆎");
        message.react("🅰");
    }
    if (mesaj.includes("joi")) {
        message.react("🦆"); message.react("🎺");
    }

    ///Joculete
    if (mesaj.includes("fii uno") && message.author != Valeriu) {
        message.channel.send(uno);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii backgammon") || mesaj.includes("fii table") || mesaj.includes("fii table")) && message.author != Valeriu) {
        message.channel.send(backgammon);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii sah") || mesaj.includes("fii chess") || mesaj.includes("jocul mintii")) && message.author != Valeriu) {
        message.channel.send(chess);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii dame") || mesaj.includes("fii checkers")) && message.author != Valeriu) {
        message.channel.send(dame);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii skribbl") || mesaj.includes("fii scribal") || mesaj.includes("fii scribl") || mesaj.includes("fii skrib")) && message.author != Valeriu) {
        message.channel.send(skribbl);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii cards") || mesaj.includes("fii cah") || mesaj.includes("fii card")) && message.author != Valeriu) {
        message.channel.send(cards);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if (mesaj.includes("fii krunker") && message.author != Valeriu) {
        message.channel.send(krunker);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    if ((mesaj.includes("fii prinde berea") || mesaj.includes("fii dezbraca fata")) && message.author != Valeriu) {
        message.channel.send(prinde_berea);
        message.channel.send("Distractie placuta, sper sa castigi");
    }
    ///Altele
    var msj = "";
    for (var i = 0; i < mesaj.length; i++)
        if (mesaj[i] >= 'a' && mesaj[i] <= 'z')
            msj += mesaj[i];
    if ((msj.includes("nigger") || msj.includes("nigga") || msj.includes("niga") || msj.includes("nibba") || msj.includes("tigan") || msj.includes("nlgger")) && message.author != Valeriu) {
        message.reply("esti putin cam rasist");
        message.delete();
    }
    if (mesaj.startsWith("!sudo")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 2; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        await Sudo({
            message: message,
            member: message.mentions.members.first(),
            text: `${msj.toString()}`,
            deleteMessage: true
        });
        return;
    }
    ///FII Gaming
    if (mesaj.startsWith(gaming_prefix) && message.channel.id == '1009848309009092698') {
        return Gaming(message);
    } else if (mesaj.startsWith(gaming_prefix) && message.channel.id != '1009848309009092698') {
        message.reply("te rog foloseste canalul <#1009848309009092698> pentru aceasta comanda!").then(msg => { setTimeout(() => { msg.delete() }, 5000) });
        return message.delete();
    }

    if ((mesaj.startsWith("fii") && message.content.length == 3) || mesaj.startsWith("fii?") && message.content.length == 4) {
        return message.channel.send('?');
    }
    if (mesaj.startsWith("fii combinatii") /*&& message.channel.id=="497450005758607360"*/) {
        return combinatii(message);
    }

    if (mesaj.includes("taci") && message.author != Valeriu) {
        message.channel.send("taci tu ca nu ai drepturi"); return;
    }
    if ((mesaj.includes("de ce ") || (mesaj.includes("dc") && mesaj.length == 2)) && message.author != Valeriu) {
        message.channel.send("Ca sa intrebe prostii"); return;
    }
    if (mesaj.includes("noapte buna") || (mesaj.includes(" nb") || mesaj.includes("nb ") || (mesaj.includes("nb") && mesaj.length == 2)) || mesaj.includes("somn usor")) {
        message.channel.send("Noapte buna"); return;
    }
    if ((mesaj.includes("buna ziua") || mesaj.includes("buna dimineata") || mesaj.includes("buna dimi") || mesaj.includes("buna siua") || mesaj.includes("buna siara") || mesaj.includes("buna seara") || mesaj.includes("buna fii")) && message.author != Valeriu) {
        message.channel.send("Salut, ca buna esti deja 😏😉"); return;
    }
    //if (mesaj.includes("salut") || mesaj.includes("salutare")) {
    //    message.channel.send("Buna, ca salut esti deja 😏😉"); return;
    //}
    if ((mesaj.startsWith("fii help") || mesaj.startsWith("fii ajutor")) && message.author != Valeriu) {
        message.react('✅');
        let gaming = new MessageEmbed()
            .setColor('	#800080')
            .setTitle('Gaming Commands')
            .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
            .setDescription('\n• ** /games [voice_channel] [game] ** - Va jucati la pacanele\n\n• ** !bataie [@tag] ** - Faceti 1v1 in bularga cu un amic\n\n•** !bataie -lb** - Vezi care e cel mai periculos om din Bularga\n\n• ** !rps [@tag] ** - Faceti `unu doi trei si` cu un alt amic\n\n• ** !sudo [@tag]: [your_message] ** - il faci pe unu sa zica cv\n\n• ** !calculator ** - Daca nu ai calculator in casa\n\n• ** !snake ** - Te joci snake\n\n• ** !wyr ** - Would You Rather\n\n• ** !nhie ** - Never Have I Ever\n\n• ** !quick ** - Quick Click • Joc de viteza\n\n• ** !trivia [optional: topic] [optional: dificultate] !trivia help pentru instructiuni**  - Trivia cu intrebari din toate domeniile\n\n•  ** !button ** - Will you press the button?\n\n• ** !ft** - Fast Typing Game\n\n• ** !am [optional: dificultate] !am topics pentru toate topicurile** - Adevar sau Minciuna\n\n• ** !guess** - Cuvinte Amestecate\n\n• ** !akinator** - FII Ghicitor in stele\n\n• ** !logo** - Ghiceste Logo-ul!\n\n• ** !steag** - FII Geografist')
            .setTimestamp()
            .setFooter('©️ FII Bot');

        let fun = new MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle('Fun Commands')
            .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
            .setDescription('\n•  ** /youtube [voice_channel] ** || ** Youtube Together ** - Activitati interactive impreuna cu prietenii tai (daca ai)\n\n•  ** r/[orice subreddit] ** - o postare random de pe acel subreddit\n\n• ** fii combinatii** - Vezi cat de mult te iubeste crush ul\n\n• ** fii zi o gluma** - Glume care te fac sa te sinucizi\n\n• ** fii [message]?** - Intreaba-l pe FII ceva. Iti va raspunde cu da sau nu.\n\n• ** !flip [message]** - Flip Text\n\n• ** !bent [message]** - Bent Text\n\n• ** !mirror [message]** - Mirror Text\n\n• ** !reverse [message]** - Reverse Text\n\n• ** !tiny [message]** - Tiny Text\n\n• ** !vapor [message]** - Vaporwave Text')
            .setTimestamp()
            .setFooter('©️ FII Bot');

        let util = new MessageEmbed()
            .setColor('#FFA500')
            .setTitle('Util Commands')
            .setAuthor('FII Bot', 'https://cdn.discordapp.com/attachments/924601604827672581/1009799018420904026/download_1.png')
            .setDescription('\n•  ** delete [number] ** - Sterge [number] mesaje de pe canal **(ADMIN ONLY)**\n\n• ** -mute -unmute -deaf -undeaf ** - Face exact ceea ce crezi tu tuturor utilizatorilor care sunt in acelasi voice channel cu FII **(ADMIN ONLY)**\n\n• ** fii meteo [oras] / FII vremea [oras] ** - Spune vremea in orasul mentionat\n\n• ** fii pbinfo** - Iti da o problema random de pe pbinfo.com\n\n')
            .setTimestamp()
            .setFooter('©️ FII Bot');
        let msg = new Discord.MessageEmbed()
            .setColor('#34495E')
            .setTitle('FII Music')
            .setDescription('Uite aici ai comenzile mele:')
            .addFields(
                { name: `**${prefix}p | ${prefix}play**`, value: `Pui orice melodie de pe Youtube/Spotify`, inline: true },
                { name: `**${prefix}np | ${prefix}now | ${prefix}acum**`, value: `Melodia curenta, precum si timestamp-ul`, inline: true },
                { name: `**${prefix}n | ${prefix}skip**`, value: `Urmatoarea melodie`, inline: true },
                { name: `** **`, value: `** **` },
                { name: `**${prefix}stop**`, value: `Opresti redarea audio`, inline: true },
                { name: `**${prefix}lyrics**`, value: `Versuri. Nu merge pentru toate melodiile, merge in mare parte tot ce e pe genius`, inline: true },
                { name: `**${prefix}seek (mm:ss)**`, value: `Jump la un anumit moment din melodie (de ex: minutul 1:36 din Melodia X)`, inline: true },
                { name: `** **`, value: `** **` },
                { name: `**${prefix}l | ${prefix}loop **`, value: `Loop melodie/queue \n`, inline: true },
                { name: `**${prefix}q | ${prefix}queue**`, value: `Efectiv queue-ul (lista de dedicatii)`, inline: true },
                { name: `**${prefix}pause**`, value: `Efectiv pause`, inline: true },
                { name: `** **`, value: `** **` },
                { name: `**${prefix}resume**`, value: `Efectiv resume`, inline: true },
                { name: `**${prefix}clear**`, value: `Stergi lista de dedicatii (queue-ul)`, inline: true },
                { name: `**${prefix}reset**`, value: `Resetezi bot-ul daca nu mai merge corespunzator`, inline: true },
                { name: `** **`, value: `** **` },
                { name: `**${prefix}r | ${prefix}remove**`, value: `Dai remove la o melodie din queue`, inline: true },
                { name: `**${prefix}rm (X:Y)**`, value: 'Stergi melodii din queue dintr-un interval inchis de 2 numere (ex. `-rm 6 9` sterge 4 melodii)', inline: true },
                { name: `**${prefix}m | ${prefix}move (X:Y)**`, value: `Muti melodia X pe pozitia Y`, inline: true },
                { name: `**${prefix}j | ${prefix}jump (X)**`, value: `Sari la melodia X din queue`, inline: true },
                { name: `**${prefix}v | ${prefix}volume (X)**`, value: `Volume boost`, inline: true },
                { name: `**${prefix}shuffle**`, value: "Efectiv shuffle la queue", inline: true },
                { name: `**${prefix}manea [optional: numar]**`, value: 'Adaugi in queue o manea random', inline: true },
                { name: `**${prefix}radio**`, value: `Radio cu cele mai ascultate posturi romanesti`, inline: true })
            .setFooter(`realizat de Cristinel#7969`, 'https://cdn.discordapp.com/attachments/1009798198325420153/1009802480332325014/119023392_767970660648080_1182354882399763344_n.jpg');
        let imp = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("IMPORTANT!")
            .setDescription("Daca bot-ul se opreste random din a reda audio, folositi-va de comenzile de mai jos:")
            .addFields(
                { name: "```-j 0```", value: "Dati play la melodia 0 (melodia curenta) din queue", inline: true },
                { name: "```-reset```", value: "Resetati disptacher-ul audio precum si queue-ul", inline: true }
            )
            .setFooter(`realizat de Cristinel#7969`, 'https://cdn.discordapp.com/attachments/1009798198325420153/1009802480332325014/119023392_767970660648080_1182354882399763344_n.jpg');

        message.author.send(msg, imp);
        message.author.send(fun, gaming);
        message.author.send(util); return;
    }

    if ((mesaj.includes("ms") || mesaj.includes("mersi") || mesaj.includes("multumesc") || mesaj.includes("multumim") || mesaj.includes("multu")) && message.author != Valeriu) {
        message.channel.send("cu placere frate"); return;
    }
    if (mesaj.startsWith("ping")) {
        message.channel.send("Am `" + `${Date.now() - message.createdTimestamp}` + "ms`" + ", nu am mai platit netul de " + Math.floor(Math.random() * 11 + 2) + " luni"); return;
    }

    if (mesaj.includes("cu ce te-ai dat?") || mesaj.includes("cu ce te ai dat?") || mesaj.includes("cu ce teai dat?")) {
        message.channel.send("cu bicicleta"); return;
    }
    if (mesaj.includes("ma pis pe tine")) {
        message.channel.send("si eu pe tine xd"); return;
    }
    if ((mesaj.includes("sa mananc") || mesaj.includes("mananc") || mesaj.includes("ma cac") || mesaj.includes("la buda")) && message.author != Valeriu) {
        message.react("🍽");
        message.channel.send("pofta buna"); return;
    }
    if (mesaj.includes("brb") || mesaj.includes("revin")) {
        message.channel.send("ok te astept"); return;
    }
    //if (mesaj.includes("nu sunt")) {
    //    message.channel.send("DAR"); return;
    //}

    ///Glume proaste
    if (mesaj.startsWith("fii zi o gluma") || mesaj.startsWith("fii spune o gluma") || mesaj.startsWith("fii spune un banc") || mesaj.startsWith("fii zi un banc")) {
        glume(message);
    }


    ///Vremea
    if (mesaj.startsWith("fii vremea") || mesaj.startsWith("fii meteo") || mesaj.startsWith("fii vreme")) {
        return meteo(message, mesaj);
    }
    ///PBINFO
    if (mesaj.startsWith("fii pbinfo")) {
        return pbinfo(message);
    }

    ///DUH
    if (mesaj.startsWith("fii ")) {
        var nr = Math.floor(Math.random() * 101) % 18 + 1;
        let args = mesaj.split(" ").slice(1);
        var nrcuv = WordCount(mesaj);
        if ((args[0] == "ce" && args[1] == "faci?") || args[0] == "cf?") {
            message.channel.send("bn, tu?"); return;
        }
        if (nrcuv > 1)
            if (args[nrcuv - 2][args[nrcuv - 2].length - 1] == '?') {
                message.reply(duh[nr]); return;
            }
        return;
    }



});


async function Gaming(message) {
    const args = message.content.split("!");
    const mesaj = args[1].toLowerCase();
    if (mesaj.startsWith("bataie -lb")) {
        return await Leaderboard(message, Client);
    }
    else if (mesaj.startsWith("bataie")) {
        await Fight({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: `Bularga 1v1`,
                color: '#7289da',
                footer: '©️ FII Gaming',
                timestamp: true
            },
            buttons: {
                hit: 'Pumn',
                heal: 'Vaccin',
                cancel: 'Gata nu mai da la operatie',
                accept: 'Accept',
                deny: 'Sunt fraier'
            },
            acceptMessage: '<@{{challenger}}> l-a provocat pe <@{{opponent}}> la o lupta 1v1 pe Bularga!',
            winMessage: 'Bravo, <@{{winner}}> a castigat!',
            endMessage: '<@{{opponent}}> nu a raspuns la timp!',
            cancelMessage: '<@{{opponent}}> e fraier si nu vrea sa se bata cu tine',
            fightMessage: '{{player}} tu dai primul',
            opponentsTurnMessage: 'Asteapta-ti randul nu fii bulangiu',
            highHealthMessage: 'Nu poti sa bagi vaccin daca ai mai mult de 80HP!',
            lowHealthMessage: 'Nu poti sa dai fugi din 1v1 daca ai HP-ul sub 50. Nu fi fraier',
            returnWinner: false,
            othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!'
        });
        return;
    }
    else if (mesaj.startsWith("rps")) {
        await RockPaperScissors({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: `Rock Paper Scissors`,
                description: 'Apasa sa alegi cu ce te joci',
                color: '#7289da',
                footer: '©️ FII Gaming',
                timestamp: true
            },
            buttons: {
                rock: 'Pietroi',
                paper: 'Foaie',
                scissors: 'Cutite',
                accept: 'Accept',
                deny: 'Sunt fraier',
            },
            time: 60000,
            acceptMessage:
                '<@{{challenger}}> l-o provocat pe <@{{opponent}}> la o partida de Piatra Hartie Foarfece!',
            winMessage: 'Bravo, <@{{winner}}> a castigat!',
            drawMessage: 'Egalitate!',
            endMessage: "<@{{opponent}}> nu o raspuns la timp!",
            timeEndMessage:
                "Time limited!",
            cancelMessage:
                '<@{{opponent}}> nu a vrut sa te infrunte!',
            choseMessage: 'Ai ales {{emoji}}',
            noChangeMessage: 'Nu mai poti sa schimbi, aye e',
            othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
            returnWinner: false
        });
        return;
    }
    else if (mesaj.startsWith("flip")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(flip(msj));
        return;
    }
    else if (mesaj.startsWith("mirror")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(mirror(msj));
        return;
    }
    else if (mesaj.startsWith("bent")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(bent(msj));
        return;
    }
    else if (mesaj.startsWith("reverse")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(reverseText(msj));
        return;
    }
    else if (mesaj.startsWith("tiny")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(tinyCaptial(msj));
        return;
    }
    else if (mesaj.startsWith("vapor")) {
        let cuv = message.content.split(" "), msj = "";
        for (var i = 1; i < cuv.length; i++)
            msj += ' ' + cuv[i];
        message.channel.send(vaporwave(msj));
        return;
    }
    else if (mesaj.startsWith("connect")) {
        let game = new ConnectFour();
        game.startGame(message);
    }
    else if (mesaj.startsWith("trivia")) {
        let sen = mesaj.split(' '), chap, dif;
        switch (sen[1]) {
            case 'general': chap = 9; break;
            case 'carti': chap = 10; break;
            case 'filme': chap = 11; break;
            case 'muzica': chap = 12; break;
            case 'teatru': chap = 13; break;
            case 'tv': chap = 14; break;
            case 'jocuri-video': chap = 15; break;
            case 'jocuri-de-masa': chap = 16; break;
            case 'stiinte': chap = 17; break;
            case 'calculatoare': chap = 18; break;
            case 'matematica': chap = 19; break;
            case 'mitologie': chap = 20; break;
            case 'sport': chap = 21; break;
            case 'geografie': chap = 22; break;
            case 'istorie': chap = 23; break;
            case 'politica': chap = 24; break;
            case 'arta': chap = 25; break;
            case 'celebritati': chap = 26; break;
            case 'animale': chap = 27; break;
            case 'masini': chap = 28; break;
            case 'comic': chap = 29; break;
            case 'gadgets': chap = 30; break;
            case 'anime': chap = 31; break;
            case 'cartoons': chap = 32; break;
            case 'help': chap = 0; break;
        }

        if (chap == 0) {
            let m = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Trivia Help')
                .setDescription('Scrie `!trivia`. Argumentele **optionale** sunt: **topicul** si **dificultatea**')
                .addFields(
                    { name: 'Topics:', value: 'general, carti, filme, muzica, teatru, tv, jocuri-video, jocuri-de-masa, stiinte, calculatoare, matematica, mitologie, sport, geografie, istorie, politica, arta, celebritati, animale, masini, comic, gadgets, anime, cartoons', inline: false },
                    { name: 'Dificultati:', value: 'usor, mediu, greu', inline: false },
                    { name: 'Exemplu:', value: '!trivia geografie', inline: false },
                    { name: 'Exemplu:', value: '!trivia geografie mediu', inline: false }
                )
                .setTimestamp()
                .setFooter('©️ FII Gaming')
            return message.channel.send(m);
        }

        if (sen[2]) {
            switch (sen[2]) {
                case 'usor': dif = 'easy'; break;
                case 'mediu': dif = 'medium'; break;
                case 'greu': dif = 'hard'; break;
            }
        }

        await Trivia({
            message: message,
            embed: {
                title: `Trivia`,
                description: 'Ai doar **{{time}}** sa ghicesti!',
                color: '#000000',
                footer: '©️ FII Gaming',
                timestamp: true
            },
            thinkMessage: 'Ma gandesc ce sa te intreb',
            winMessage:
                `${message.member.nickname || message.member.user.tag}, bravo, era **{{answer}}**. Ai ghicit raspunsul in **{{time}}**.`,
            loseMessage: `${message.member.nickname || message.member.user.tag} ce sa iti fac daca esti prost. Raspunsul corect era **{{answer}}**.`,
            emojis: {
                one: '1️⃣',
                two: '2️⃣',
                three: '3️⃣',
                four: '4️⃣',
            },
            othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
            returnWinner: false,
            topic: chap,
            difficulty: dif
        });

    }
    else if (mesaj.startsWith("am")) {
        let sen = mesaj.split(' '), chap, dif;
        switch (sen[1]) {
            case 'general': chap = 9; break;
            case 'carti': chap = 10; break;
            case 'filme': chap = 11; break;
            case 'muzica': chap = 12; break;
            case 'teatru': chap = 13; break;
            case 'tv': chap = 14; break;
            case 'jocuri-video': chap = 15; break;
            case 'jocuri-de-masa': chap = 16; break;
            case 'stiinte': chap = 17; break;
            case 'calculatoare': chap = 18; break;
            case 'matematica': chap = 19; break;
            case 'mitologie': chap = 20; break;
            case 'sport': chap = 21; break;
            case 'geografie': chap = 22; break;
            case 'istorie': chap = 23; break;
            case 'politica': chap = 24; break;
            case 'arta': chap = 25; break;
            case 'celebritati': chap = 26; break;
            case 'animale': chap = 27; break;
            case 'masini': chap = 28; break;
            case 'comic': chap = 29; break;
            case 'gadgets': chap = 30; break;
            case 'anime': chap = 31; break;
            case 'cartoons': chap = 32; break;
            case 'help': chap = 0; break;
        }
        if (chap == 0) {
            let m = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Adevar sau Minciuna Help')
                .setDescription('Scrie `!am topics`. Argumentele **optionale** sunt: **topicul**')
                .addFields(
                    { name: 'Topics:', value: 'general, carti, filme, muzica, teatru, tv, jocuri-video, jocuri-de-masa, stiinte, calculatoare, matematica, mitologie, sport, geografie, istorie, politica, arta, celebritati, animale, masini, comic, gadgets, anime, cartoons', inline: false },
                    { name: 'Exemplu:', value: '!am geografie', inline: false },
                )
                .setTimestamp()
                .setFooter('©️ FII Gaming')
            return message.channel.send(m);
        }

        await LieSwatter({
            message: message,
            embed: {
                title: `Adevar sau Minciuna`,
                color: '#7289da',
                footer: '©️ FII Gaming',
                timestamp: true
            },
            thinkMessage: 'Ma gandesc',
            winMessage:
                'Bravo, a fost un **{{answer}}**. Ai gasit raspunsul in **{{time}}**.',
            loseMessage: 'Poate data viitoare! Raspunsul a fost **{{answer}}**.',
            othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
            buttons: { true: 'Adevar', lie: 'Minciuna' },
            topic: chap
        });
    }
    switch (mesaj) {
        case 'calculator':
            await Calculator({
                message: message,
                embed: {
                    title: `Calculator`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                disabledQuery: 'Calculatorul e mort',
                invalidQuery: 'Nu merge ecuatia asta!',
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!'
            });
            break;
        case 'snake':
            await Snake({
                message: message,
                embed: {
                    title: `Snake`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                emojis: {
                    empty: '⬛',
                    snakeBody: '🟩',
                    food: '🍎',
                    up: '⬆️',
                    right: '⬅️',
                    down: '⬇️',
                    left: '➡️',
                },
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
                buttonText: 'Cancel'
            });
            break;
        case 'wyr':
            await WouldYouRather({
                message: message,
                embed: {
                    title: `Ai alege...`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                thinkMessage: 'Ma gandesc',
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
                buttons: { optionA: 'Optiunea A', optionB: 'Optiunea B' }
            }); break;
        case 'nhie':
            await NeverHaveIEver({
                message: message,
                embed: {
                    title: `Never Have I Ever`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                thinkMessage: 'Ma gandesc',
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
                buttons: { optionA: 'Da', optionB: 'Nu' }
            });
            break;
        case 'quick':
            await QuickClick({
                message: message,
                embed: {
                    title: `Quick Click`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                time: 60000,
                waitMessage: 'Butoanele pot aparea in orice moment!',
                startMessage:
                    'Prima persoana care apasa pe buton castiga. Aveti timp: **{{time}}**!',
                winMessage: 'Bravo, <@{{winner}}> a apasat butonul in **{{time}} secunde**.',
                loseMessage: 'Aveti intarziere mentala si nu ati apasat pe nici un buton in timp',
                emoji: '👆',
                ongoingMessage:
                    "Deja se joaca astia pe <#{{channel}}>. Nu pot fi in 15 locuri de odata"
            });
            break;
        case 'button':
            await WillYouPressTheButton({
                message: message,
                embed: {
                    title: `Ai apasa butonul? ${message.member.user.tag}`,
                    description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                button: { yes: 'Da', no: 'Nu' },
                thinkMessage: 'Hmm, ma gandesc',
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!'
            });
            break;
        case 'ft':
            await FastType({
                message: message,
                embed: {
                    title: `Fast Type`,
                    description: 'Ai **{{time}}** sa scrii fraza de mai jos. Intre cuvinte exista doar un spatiu!',
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                winMessage: 'Bravo, ai un wpm de **{{wpm}}** si ai terminat in **{{time}}**.',
                loseMessage: 'Aya e poate data viitoare',
                cancelMessage: 'Ai inchis jocul!',
                time: 60000,
                buttonText: 'Cancel',
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!'
            });
            break;

        case 'guess':
            await ShuffleGuess({
                message: message,
                embed: {
                    title: `Cuvinte amestecate`,
                    color: '#7289da',
                    footer: '©️ FII Gaming',
                    timestamp: true
                },
                button: { cancel: 'Cancel', reshuffle: 'Amesteca din nou' },
                startMessage:
                    'Am amestecat un cuvant si acum este **`{{word}}`**. Ai **{{time}}** sa il ghicesti!',
                winMessage:
                    `${message.member.nickname || message.member.user.tag}, bravo, era **{{word}}**! Ai ghicit in **{{time}}.**`,
                loseMessage: 'Aya e poate data viitoare. Raspunsul corect era **{{answer}}**.',
                incorrectMessage: "Nu {{author}}! Raspunsul nu e `{{answer}}`",
                othersMessage: 'Doar <@{{author}}> are voie sa-l foloseasca!',
                time: 60000
            });
            break;
        case 'akinator': akinator(message, Client); break;
        case 'logo':
            const game = new Logo({
                message: message,
                token: process.env.gameToken,
                stopCommand: "!stop",
                winFooter: "©️ FII Gaming",
                winColor: "GREEN",
                loseFooter: "©️ FII Gaming",
                loseColor: "RED",
                questionFooter: "©️ FII Gaming",
                questionColor: "BLUE"
            })
            game.start();
            break;
        case 'steag':
            const gam = new Flag({
                message: message,
                token: process.env.gameToken,
                stopCommand: "!stop",
                winFooter: "©️ FII Gaming",
                winColor: "GREEN",
                loseFooter: "©️ FII Gaming",
                loseColor: "RED",
                questionFooter: "©️ FII Gaming",
                questionColor: "BLUE"
            })
            gam.start();
            break;
        case 'stiri':
            const gem = new News({
                message: message,
                token: process.env.gameToken,
                stopCommand: "!stop",
                winFooter: "©️ FII Gaming",
                winColor: "GREEN",
                loseFooter: "©️ FII Gaming",
                loseColor: "RED",
                questionFooter: "©️ FII Gaming",
                questionColor: "BLUE"
            })
            gem.start();
            break;
    }

}

async function execute(message, serverQueue) {
    const output = execSync(`curl -H "Authorization: Basic ${process.env.exec_authbasic}" -d grant_type=refresh_token -d refresh_token=${process.env.spotify_refreshtoken} https://accounts.spotify.com/api/token`, { encoding: 'utf-8' });

    let c = output.split(`"`);
    let token = c[3];
    spotifyApi.setAccessToken(token);
    let song, ytlink = 0;

    let vok = 0, otd_track = 0, connection;
    const args = message.content.split(" ");
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    if (!serverQueue || connection == undefined) {
        try {
            connection = await voiceChannel.join();

        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        }
    }

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (connection.channel.id == b.voice.channel.id)
                curat = true;
    });

    if (!voiceChannel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    else if (curat == true) {

        let songInfo, result, list;
        var playlist = 0;


        if (message.content.includes("https://open.spotify.com") && message.content.includes("/album")) {
            list = await getTracks(args[1]);
            let adaug = await message.channel.send(`Adaug **${list.length}** melodii la lista de dedicatii...`);
            if (!queue.get(message.guild.id) || (queue.get(message.guild.id) && queue.get(message.guild.id).songs == 0)) {
                var haima = list[0];
                let titl = "";
                titl = haima.name + " " + haima.artist + " song";
                try {
                    result = await yts(titl);
                }
                catch (e) {
                    message.channel.send(`N am putut adauga melodia ${titl}, trec la urmatoarea`); vok = 1;
                }
                if (vok != 1) {
                    let muz = {
                        title: result.videos[0].title,
                        url: result.videos[0].url,
                        timestamp: result.videos[0].timestamp,
                        duration: result.videos[0].duration,
                        author: message.member.nickname || message.member.user.tag,
                        avatar: message.author.avatarURL(),
                        lyrics: null
                    };
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 1,
                        playing: true,
                        filters: [],
                        filter_name: [],
                        loop: 0,
                        queueEmbed: null
                    };
                    queue.set(message.guild.id, queueContruct);
                    queueContruct.songs.push(muz);
                    qsongs++;
                    try {
                        let connection = await voiceChannel.join();
                        queueContruct.connection = connection;
                        play(message.guild, queueContruct.songs[0]);
                    } catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
                    }

                }
                for (var i = 1; i < list.length; i++) {
                    var mel = await getData(list[i]);
                    let titlu = "";
                    titlu = mel.artists[0].name + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    }
                    catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }
                }
            }
            else {
                for (var i = 0; i < list.length; i++) {
                    var mel = await getPreview(list[i].external_urls.spotify);
                    let titlu = "";
                    titlu = mel.artist + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    }
                    catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }
                }
            }

            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setDescription(`Am adaugat **${list.length}** melodii la lista de dedicatii`)
                .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());

            Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            playlist = 1;

        }
        else if (message.content.includes("https://open.spotify.com") && message.content.includes("/playlist")) {
            list = new Array();
            var m = await getData(args[1]);
            let playlistID = m.id;

            var offset = 0;
            var pagesize = 100;
            var continueloop = true;

            var exe = await getplaylisttracks(playlistID, pagesize, offset);

            do {
                for (var i = 0; i < 100; i++)
                    if (exe.items[i] != undefined) {
                        list.push(exe.items[i]);
                        qsongs++;
                    }

                try {
                    if (exe.next != null) {
                        offset = offset + pagesize;
                        exe = await getplaylisttracks(playlistID, pagesize, offset);
                    }
                    else {
                        continueloop = false;
                    }
                }
                catch (e) {
                    continueloop = false;
                }
            }
            while (continueloop);
            let adaug = await message.channel.send(`Adaug **${list.length}** melodii la lista de dedicatii...`);
            if (!queue.get(message.guild.id) || (queue.get(message.guild.id) && queue.get(message.guild.id).songs == 0)) {
                var haima = await getPreview(list[0].track.external_urls.spotify);
                let titl = "";
                titl = haima.artist + " " + haima.title + " song";
                try {
                    result = await yts(titl);
                    console.log(haima);
                }
                catch (e) {
                    message.channel.send(`N am putut adauga melodia ${titl}, trec la urmatoarea`); vok = 1;
                }
                if (vok != 1) {
                    let muz = {
                        title: result.videos[0].title,
                        url: result.videos[0].url,
                        timestamp: result.videos[0].timestamp,
                        duration: result.videos[0].duration,
                        author: message.member.nickname || message.member.user.tag,
                        avatar: message.author.avatarURL(),
                        lyrics: null
                    };
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 1,
                        playing: true,
                        filters: [],
                        filter_name: [],
                        loop: 0,
                        queueEmbed: null
                    };
                    queue.set(message.guild.id, queueContruct);
                    queueContruct.songs.push(muz);
                    qsongs++;
                    try {
                        let connection = await voiceChannel.join();
                        queueContruct.connection = connection;
                        play(message.guild, queueContruct.songs[0]);
                    } catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });
                    }

                }
                for (var i = 1; i < list.length; i++) {
                    var mel = await getPreview(list[i].track.external_urls.spotify);
                    let titlu = "";
                    titlu = mel.artist + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    }
                    catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }
                }
            }
            else {
                for (var i = 0; i < list.length; i++) {
                    var mel = await getPreview(list[i].track.external_urls.spotify);
                    let titlu = "";
                    titlu = mel.artist + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    }
                    catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }
                }
            }

            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setDescription(`Am adaugat **${list.length}** melodii la lista de dedicatii`)
                .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());

            Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });;
            playlist = 1;

        }
        else if (message.content.includes("https://www.youtube.com/playlist")) {
            var i = 0;
            for (i = 1; i < args[1].length; i++)
                if (args[1][i] == '=' && args[1][i - 1] == 't' && args[1][i - 2] == 's' && args[1][i - 3] == 'i')
                    break;
            i++;
            let video = "";
            while (args[1][i] && args[1][i] != '&') {

                video += args[1][i];
                i++;
            }

            list = await yts({ listId: video });
            let adaug = await message.channel.send(`Adaug **${list.videos.length}** melodii la lista de dedicatii...`);
            if (!queue.get(message.guild.id) || (queue.get(message.guild.id) && queue.get(message.guild.id).songs == 0)) {
                result = yts({ videoId: list.videos[0].videoId });
                let muz = {
                    title: (await result).title,
                    url: (await result).url,
                    timestamp: (await result).timestamp,
                    duration: (await result).duration,
                    author: message.member.nickname || message.member.user.tag,
                    avatar: message.author.avatarURL(),
                    lyrics: null
                };
                const queueContruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 1,
                    playing: true,
                    filters: [],
                    filter_name: [],
                    loop: 0,
                    queueEmbed: null
                };
                queue.set(message.guild.id, queueContruct);
                queueContruct.songs.push(muz);
                qsongs++;
                try {
                    let connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });
                }
                for (var i = 1; i < list.videos.length; i++) {
                    result = yts({ videoId: list.videos[i].videoId });

                    let muz = {
                        title: (await result).title,
                        url: (await result).url,
                        timestamp: (await result).timestamp,
                        duration: (await result).duration,
                        author: message.member.nickname || message.member.user.tag,
                        avatar: message.author.avatarURL(),
                        lyrics: null
                    };
                    let svq = queue.get(message.guild.id);
                    svq.songs.push(muz);
                    qsongs++;
                    serverQueue = svq;
                }
            } else {
                for (var i = 0; i < list.videos.length; i++) {
                    result = yts({ videoId: list.videos[i].videoId });

                    let muz = {
                        title: (await result).title,
                        url: (await result).url,
                        timestamp: (await result).timestamp,
                        duration: (await result).duration,
                        author: message.member.nickname || message.member.user.tag,
                        avatar: message.author.avatarURL(),
                        lyrics: null
                    };
                    let svq = queue.get(message.guild.id);
                    svq.songs.push(muz);
                    qsongs++;
                    serverQueue = svq;
                }
            }

            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setDescription(`Am adaugat **${list.videos.length}** melodii la lista de dedicatii`)
                .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());

            Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            playlist = 1;

        }
        else if (message.content.includes("https://open.spotify.com/artist/")) {
            list = await getData(args[1]);
            ///!!!!!!
            let adaug = await message.channel.send(`Adaug **${list.trackList.length}** melodii la lista de dedicatii...`);
            if (!queue.get(message.guild.id) || (queue.get(message.guild.id) && queue.get(message.guild.id).songs == 0)) {
                var haima = list.trackList[0];
                let titlu = "";
                titlu = haima.title + " " + haima.subtitle;
                try {
                    result = await yts(titlu);
                } catch (e) {
                    message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                }
                if (vok != 1) {
                    let muz = {
                        title: result.videos[0].title,
                        url: result.videos[0].url,
                        timestamp: result.videos[0].timestamp,
                        duration: result.videos[0].duration,
                        author: message.member.nickname || message.member.user.tag,
                        avatar: message.author.avatarURL(),
                        lyrics: null
                    };
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 1,
                        playing: true,
                        filters: [],
                        filter_name: [],
                        loop: 0,
                        queueEmbed: null
                    };
                    queue.set(message.guild.id, queueContruct);
                    queueContruct.songs.push(muz);
                    qsongs++;
                    try {
                        let connection = await voiceChannel.join();
                        queueContruct.connection = connection;
                        play(message.guild, queueContruct.songs[0]);
                    } catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });
                    }
                }
                for (var i = 1; i < list.trackList.length; i++) {
                    var haima = list.trackList[i];
                    let titlu = "";
                    titlu = haima.title + " " + haima.subtitle;
                    try {
                        result = await yts(titlu);
                    } catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;

                    }
                }
            } else {
                for (var i = 0; i < list.tracks.length; i++) {
                    let titlu = "";
                    titlu = list.name + " " + list.tracks[i].name;
                    try {
                        result = await yts(titlu);
                    } catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;

                    }
                }
            }

            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setDescription(`Am adaugat **${list.trackList.length}** melodii la lista de dedicatii`)
                .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());
            Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            playlist = 1;


        }
        else if (message.content.includes("https://open.spotify.com/track/")) {
            spt = await getPreview(args[1]);
            let titlu = "";
            titlu = spt.artist + " " + spt.title;
            try {
                result = await yts(titlu);
            } catch (e) {
                message.channel.send(`N am putut adauga melodia ${titlu}`);
            }
            qsongs++;

        }
        else if (message.content.includes("https://www.youtube.com/watch")) {

            songInfo = await ytdl.getInfo(args[1]);
            var tm = "" + milli(songInfo.videoDetails.lengthSeconds * 1000);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                timestamp: tm,
                duration: { seconds: songInfo.videoDetails.lengthSeconds },
                author: message.member.nickname || message.member.user.tag,
                avatar: message.author.avatarURL(),
                lyrics: null
            };
            ytlink = 1;;
        }
        else {
            let mes = "";
            for (var i = 1; i < args.length; i++)
                mes += (args[i] + " ");
            result = await yts(mes);
        }

        if (playlist == 0 && ytlink == 0) {
            if (otd_track == 1) {
                song = {
                    title: result.videos[0].title,
                    url: result.videos[0].url,
                    timestamp: result.videos[0].timestamp,
                    duration: result.videos[0].duration,
                    author: aotd_author_username,
                    avatar: aotd_author_avatar,
                    lyrics: null
                };
            }
            else if (ytlink == 0) {
                song = {
                    title: result.videos[0].title,
                    url: result.videos[0].url,
                    timestamp: result.videos[0].timestamp,
                    duration: result.videos[0].duration,
                    author: message.member.nickname || message.member.user.tag,
                    avatar: message.author.avatarURL(),
                    lyrics: null
                };
            }
        }
        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 1,
                playing: true,
                filters: [],
                filter_name: [],
                loop: 0,
                queueEmbed: null
            };
            queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);
            qsongs++;
            try {
                let connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);

            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });
            }
        } else if (playlist == 0 || ytlink == 1) {
            serverQueue.songs.push(song);
            qsongs++;
            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setTitle(`Am adaugat la lista de dedicatii `)
                .setDescription(`[${song.title}](${song.url})`)
                .setFooter(`Dedicatie de la ${song.author}`, song.avatar);

            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) })
            return;
        }
    }
    if (curat == false) {
        message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        message.delete();
    }

    
}

async function skip(message, serverQueue, author, button) {
    if (button == true) Client.channels.cache.get(message.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
    else Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());

    if (button == false || button == undefined) {
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        if (!serverQueue)
            return message.channel.send("Da nu mai sunt dedicatii, n am la ce da skip").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach((b) => {
        if (b.user.id == author.id) {
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
        }
    });

    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (button) serverQueue.textChannel.send(`Skipped by ${author.user.tag}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 6000) });

    if (serverQueue.connection.dispatcher)
        if (serverQueue.connection.dispatcher.paused) serverQueue.connection.dispatcher.resume();

    if (serverQueue.connection.dispatcher) {
        serverQueue.connection.dispatcher.end();
        if (serverQueue.songs[0].timestamp == "∞") {
            play(message.guild, serverQueue.songs[1]);
            serverQueue.songs.shift();
        }
    }
    else {
        serverQueue.songs.shift();
        play(message.guild, serverQueue.songs[0]);
    }
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    if (!serverQueue)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    currentsong = qsongs = 0;
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    serverQueue.songs = [];
    if (serverQueue.connection && serverQueue.connection.dispatcher)
        serverQueue.connection.dispatcher.end();
    else {
        message.member.voice.channel.leave();
        Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
        return;
    }
    Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
}

async function play(guild, song, realseek) {

    const serverQ = queue.get(guild.id);
    serverQ.filters = [];
    serverQ.filter_name = [];
    if (!realseek) realseek = 0;
    if (!song) {
        Client.user.setActivity('Facultatea de Informatica', {
            type: "STREAMING",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        });
        setTimeout(function () { serverQ.voiceChannel.leave() }, 500000);
        queue.delete(guild.id);
        return;
    }
    Client.user.setActivity(`${song.title}`, {
        type: "LISTENING"
    });
    if (song.timestamp == "∞") {
        let dispatcher = await serverQ.connection.play(song.url)
            .on("error", error => console.error(error));

        let msg = new Discord.MessageEmbed()
            .setColor('#2ECC71')
            .setTitle(`A inceput sa cante nebunia de `)
            .setDescription(`[${song.title}](${song.site})`)
            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);

        ///Butoane
        const queu = new MessageButton()
            .setStyle("blurple")
            .setLabel("Queue")
            .setID("Queue")
        const pause = new MessageButton()
            .setStyle("red")
            .setLabel("Pause")
            .setID("Pause")
        const live = new MessageButton()
            .setStyle("grey")
            .setLabel("Live")
            .setID("Live")
            .setEmoji('🔴')
            .setDisabled()
        const next = new MessageButton()
            .setStyle("green")
            .setLabel("Next")
            .setID("Next")

        serverQ.queueEmbed = await serverQ.textChannel.send(msg, { buttons: [queu, pause, live, next] });

        const filter = (button) => {
            var curat = false;
            let sv = Client.guilds.cache.get(guild.id); ///verific daca author ul e in acelasi channel cu valeriu
            sv.members.cache.array().forEach(b => {
                if (b.user.id == button.clicker.id)
                    if (serverQ.connection.channel.id == b.voice.channel.id)
                        curat = true;
            });
            return curat == true;
        };
        const collector = serverQ.queueEmbed.createButtonCollector(filter);
        let t;

        collector.on('collect', async (button) => {
            var nick = button.clicker.member.nickname || button.clicker.user.username
            await button.reply.defer();
            if (button.id === 'Pause') {
                await Pause(serverQ.textChannel, serverQ, button.clicker, true);
                t = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`Paused - by ${nick}`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                let aux2 = new MessageButton()
                    .setStyle("red")
                    .setLabel("Resume")
                    .setID("Resume")
                let aux3 = new MessageButton()
                    .setStyle("grey")
                    .setLabel("Live")
                    .setID("Live")
                    .setEmoji('🔴')
                serverQ.queueEmbed.edit(t, { buttons: [queu, aux2, aux3, next] });
            }
            else if (button.id === 'Resume') {
                await Resume(serverQ.textChannel, serverQ, button.clicker, true);
                t = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                let aux = new MessageButton()
                    .setStyle("red")
                    .setLabel("Pause")
                    .setID("Pause")
                let aux2 = new MessageButton()
                    .setStyle("grey")
                    .setLabel("Live")
                    .setID("Live")
                    .setEmoji('🔴')
                serverQ.queueEmbed.edit(t, { buttons: [queu, aux, aux2, next] });
            }
            else if (button.id === 'Next')
                if (!serverQ.songs[1] && serverQ.loop == 0) {
                    let h = new MessageEmbed()
                        .setColor("#FF0000")
                        .setDescription("❗ Ultima melodie din lista de dedicatii ❗")
                    serverQ.textChannel.send(h).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 1500) })
                }
                else skip(serverQ.textChannel, serverQ, button.clicker, true);
            else if (button.id === 'Queue') {
                await Queue(serverQ.textChannel, serverQ, button.clicker, true)
            }
            else if (button.id === 'Live') {
                serverQ.connection.dispatcher.end();
                await serverQ.connection.play(song.url)
                    .on("error", error => console.error(error));
                t = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                let aux2 = new MessageButton()
                    .setStyle("grey")
                    .setLabel("Live")
                    .setID("Live")
                    .setEmoji('🔴')
                    .setDisabled()
                serverQ.queueEmbed.edit(t, { buttons: [queu, pause, aux2, next] });
            }
        })
        return;
    }
    var ok = 0;
    ms = 0;
    try {
        const info = await ytdl.getInfo(song.url);
        stream = await ytdl.downloadFromInfo(info, { filter: 'audioonly' })
            .on("error", e => {
                console.error(e);
            })
    } catch (error) {
        if (error.statusCode == 410) {
            let fmsg = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor('FII Music', 'https://cdn.discordapp.com/attachments/924601603841990690/1017038507753078814/download_2.png')
                .setTitle("❌ Age restricted ❌")
                .setDescription(`[${song.title}](${song.url}) is **Age Restricted**`)
            serverQ.textChannel.send(fmsg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            play(guild, serverQ.songs[1]);
            serverQ.songs.shift();
            return;
        }
    }
    dispatcher = await serverQ.connection.play(stream, { seek: realseek })
        .on("finish", () => {
            Client.channels.cache.get(serverQ.textChannel.id).messages.fetch(serverQ.queueEmbed.id).then(msg => msg.delete());
            if (serverQ.songs[0] && serverQ.songs[0].lyrics != undefined) Client.channels.cache.get(serverQ.textChannel.id).messages.fetch(serverQ.songs[0].lyrics.id).then(msg => { if (msg) msg.delete() });
            if (msgrow) Client.channels.cache.get(serverQ.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() });
            ms = 0;
            if (serverQ.loop == 1) {
                play(guild, serverQ.songs[0]);
                ok = 1;
            }
            else if (serverQ.loop == 2) {
                serverQ.songs.push(serverQ.songs[0]);
                serverQ.songs.shift();
            } else {
                serverQ.songs.shift();
            }
            if (!ok) play(guild, serverQ.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQ.volume);
    let msg;
    switch (serverQ.loop) {
        case 2:
            msg = new Discord.MessageEmbed()
                .setColor('#2ECC71')
                .setTitle(`A inceput sa cante nebunia de`)
                .setDescription(`[${song.title}](${song.url})`)
                .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
            break;
        case 1:
            msg = new Discord.MessageEmbed()
                .setColor('#2ECC71')
                .setTitle(`A inceput sa cante nebunia de`)
                .setDescription(`[${song.title}](${song.url})`)
                .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
            break;
        default:
            msg = new Discord.MessageEmbed()
                .setColor('#2ECC71')
                .setTitle(`A inceput sa cante nebunia de`)
                .setDescription(`[${song.title}](${song.url})`)
                .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
            break;
    }

    ///Butoane
    const queu = new MessageButton()
        .setStyle("blurple")
        .setLabel("Queue")
        .setID("Queue")
    const pause = new MessageButton()
        .setStyle("red")
        .setLabel("Pause")
        .setID("Pause")
    const help = new MessageButton()
        .setStyle("grey")
        .setLabel("More")
        .setID("more")
    const next = new MessageButton()
        .setStyle("green")
        .setLabel("Next")
        .setID("Next")

    row = new MessageActionRow()
        .addComponents(queu, pause, help, next);

    serverQ.queueEmbed = await serverQ.textChannel.send(msg, { buttons: [queu, pause, help, next] });

    const filter = (button) => {
        var curat = false;
        let sv = Client.guilds.cache.get(guild.id); ///verific daca author ul e in acelasi channel cu valeriu
        sv.members.cache.array().forEach(b => {
            if (b.user.id == button.clicker.id)
                if (serverQ.connection.channel.id == b.voice.channel.id)
                    curat = true;
        });
        return curat == true;
    };
    const collector = serverQ.queueEmbed.createButtonCollector(filter);

    collector.on('collect', async (button) => {
        var nick = button.clicker.member.nickname || button.clicker.user.username
        await button.reply.defer();
        if (button.id === 'Pause') {
            await Pause(serverQ.textChannel, serverQ, button.clicker, true);
            let t;
            if (serverQ.filters[0])
                switch (serverQ.loop) {
                    case 2:
                        t = new Discord.MessageEmbed()
                            .setColor('#7F00FF')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                        break;
                    case 1:
                        t = new Discord.MessageEmbed()
                        setColor('#7F00FF')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                        break;
                    default:
                        t = new Discord.MessageEmbed()
                            .setColor('#7F00FF')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                        break;
                }
            else {
                switch (serverQ.loop) {
                    case 2:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                        break;
                    case 1:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                        break;
                    default:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`Paused - by ${nick}`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                        break;
                }
            }
            let aux2 = new MessageButton()
                .setStyle("red")
                .setLabel("Resume")
                .setID("Resume")

            serverQ.queueEmbed.edit(t, { buttons: [queu, aux2, help, next] });
        }
        else if (button.id === 'Resume') {
            await Resume(serverQ.textChannel, serverQ, button.clicker, true);
            if (serverQ.filters[0]) {
                switch (serverQ.loop) {
                    case 2:
                        t = new Discord.MessageEmbed()
                            .setColor('#7F00FF')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                        break;
                    case 1:
                        t = new Discord.MessageEmbed()
                            .setColor('#7F00FF')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                        break;
                    default:
                        t = new Discord.MessageEmbed()
                            .setColor('#7F00FF')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .addField('Filtre: ', serverQ.filter_name)
                            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                        break;
                }
            }
            else {
                switch (serverQ.loop) {
                    case 2:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                        break;
                    case 1:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                        break;
                    default:
                        t = new Discord.MessageEmbed()
                            .setColor('#2ECC71')
                            .setTitle(`A inceput sa cante nebunia de`)
                            .setDescription(`[${song.title}](${song.url})`)
                            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                        break;
                }
            }

            let aux = new MessageButton()
                .setStyle("red")
                .setLabel("Pause")
                .setID("Pause")
            serverQ.queueEmbed.edit(t, { buttons: [queu, aux, help, next] });
        }
        else if (button.id === 'Next') {
            if (!serverQ.songs[1] && serverQ.loop == 0) {
                let h = new MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❗ Ultima melodie din lista de dedicatii ❗")
                serverQ.textChannel.send(h).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 1500) })
            }
            else
                skip(serverQ.textChannel, serverQ, button.clicker, true);
        }
        else if (button.id === 'Queue') {
            await Queue(serverQ.textChannel, serverQ, button.clicker, true);
        }
        else if (button.id === 'more') {
            await more_row(serverQ.textChannel, serverQ, button.clicker);
        }
    })
}

function Loop(message, serverQueue, author, row, song, button) {
    if (button == false || button == undefined) {
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

        if (!serverQueue)
            return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    switch (serverQueue.loop) {
        case 0: serverQueue.loop = 1; break;
        case 1: serverQueue.loop = 2; break;
        case 2: serverQueue.loop = 0; break;
    }
    let msg;
    if (serverQueue.filters[0]) {
        switch (serverQueue.loop) {
            case 2:
                msg = new Discord.MessageEmbed()
                    .setColor('#7F00FF')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .addField('Filtre: ', serverQueue.filter_name)
                    .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
            case 1:
                msg = new Discord.MessageEmbed()
                    .setColor('#7F00FF')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .addField('Filtre: ', serverQueue.filter_name)
                    .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
            default:
                msg = new Discord.MessageEmbed()
                    .setColor('#7F00FF')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .addField('Filtre: ', serverQueue.filter_name)
                    .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
        }
    }
    else {
        switch (serverQueue.loop) {
            case 2:
                msg = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}\nToata lista de dedicatii e pe loop`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
            case 1:
                msg = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}\nMelodia asta e banger si e pe loop`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
            default:
                msg = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`A inceput sa cante nebunia de`)
                    .setDescription(`[${song.title}](${song.url})`)
                    .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
                serverQueue.queueEmbed.edit(msg, row);
                break;
        }
    }


}

async function Queue(message, serverQueue, author, button) {
    if (button == false || button == undefined) {
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

        if (!serverQueue || !serverQueue.connection || !serverQueue.songs[0])
            return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }

    let currentPage = 0;
    const next = new MessageButton()
        .setStyle("grey")
        .setLabel("Urmator")
        .setID("next")
    const back = new MessageButton()
        .setStyle("grey")
        .setLabel("Anterior")
        .setID("back")
    const first = new MessageButton()
        .setStyle("grey")
        .setLabel("Prima")
        .setID("first")
    const last = new MessageButton()
        .setStyle("grey")
        .setLabel("Ultima")
        .setID("last")
    const update = new MessageButton()
        .setStyle("blurple")
        .setLabel("Update")
        .setID("update")
    const shuffle1 = new MessageButton()
        .setStyle("green")
        .setLabel("Shuffle")
        .setID("shuffle")
        .setDisabled()
    const shuffle2 = new MessageButton()
        .setStyle("green")
        .setLabel("Shuffle")
        .setID("shuffle");

    let buton = (serverQueue.songs.length < 4) ? shuffle1 : shuffle2
    let embeds = embedGenerator(message, serverQueue, author);
    let embd = embeds[currentPage];
    let queueEmbed;

    if (button == false || button == undefined)
        queueEmbed = await message.channel.send(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embd });
    else queueEmbed = await message.send(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embd });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });

    const filter = (button) => curat == true;

    const collector = queueEmbed.createButtonCollector(filter);

    collector.on('collect', async (button) => {
        embeds = embedGenerator(message, serverQueue, author);
        await button.reply.defer();
        if (button.id === 'next' && currentPage + 1 < embeds.length) {
            currentPage++;
            if (currentPage != embeds.length - 1)
                queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, last, buton], embed: embeds[currentPage]});
            else queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, update, buton], embed: embeds[currentPage] });
        }
        else if (button.id === 'back') {
            if (currentPage != 0) {
                currentPage--;
                if(currentPage != 0)
                    queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, last, buton], embed: embeds[currentPage] });
                else queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embeds[currentPage] });
            }
        }
        else if (button.id === 'first') {
            if (currentPage != 0) {
                currentPage = 0;
                queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embeds[currentPage] });
            }
        } else if (button.id === 'last') {
            if (currentPage != embeds.length) {
                currentPage = embeds.length - 1;
                if(currentPage !=0 )
                    queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, update, buton], embed: embeds[currentPage] });
                else queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embeds[currentPage] });
            }
        }
        else if (button.id === 'shuffle') {
            if (serverQueue.songs.length > 3) {
                for (let i = serverQueue.songs.length - 1; i > 0; i--) {
                    let j = Math.round(Math.random() * (i + 1));
                    while (j == 0) j = Math.round(Math.random() * (i + 1));
                    const aux = serverQueue.songs[i];
                    serverQueue.songs[i] = serverQueue.songs[j];
                    serverQueue.songs[j] = aux;
                }
            }
            const embeds = embedGenerator(message, serverQueue, author);
            let embd = embeds[currentPage];
            buton = (serverQueue.songs.length < 4) ? shuffle1 : shuffle2
            if (currentPage == 0)
                queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embd });
            else if (currentPage == embeds.length - 1)
                queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, update, buton], embed: embd });
            else queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, last, buton], embed: embd });
        } else if (button.id === 'update') {
            if (currentPage != 0)
                queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [first, back, next, update, buton], embed: embeds[currentPage] });
            else queueEmbed.edit(`Lista de dedicatii : ${currentPage + 1}/${embeds.length}`, { buttons: [update, back, next, last, buton], embed: embeds[currentPage] });
        }
    })
    Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(queueEmbed.id).then(msg => { setTimeout(() => { msg.delete() }, 35000) });
}

function embedGenerator(message, serverQueue, author) {
    const embeds = [];
    let songs = 11;
    if (serverQueue.songs.length == 1) {
        const msg = new Discord.MessageEmbed()
            .setColor('#71368A')
            .setTitle(`Acum canta: `)
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) ${serverQueue.songs[0].timestamp} \n\n `)

        embeds.push(msg);
    }
    for (let i = 1; i < serverQueue.songs.length; i += 10) {
        let total = 0;
        for (var h = 0; h < serverQueue.songs.length; h++) {
            total += serverQueue.songs[h].duration.seconds;
        }

        const current = serverQueue.songs.slice(i, songs);
        songs += 10;
        let j = i - 1;
        const info = current.map(song => `${++j}. [${song.title}](${song.url}) ${song.timestamp}`).join('\n');
        let sv = Client.guilds.cache.get(serverQueue.textChannel.guild.id);
        let avatar;
        sv.members.cache.array().forEach(b => {
            if (b.user.id == author.id)
                avatar = b.user.avatarURL();
        });
        let tt = "";
        tt = new Date(total * 1000).toISOString().substr(11, 8);
        if (tt == "") tt = "Error";
        const msg = new Discord.MessageEmbed()
            .setColor('#71368A')
            .setTitle(`Acum canta: `)
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) ${serverQueue.songs[0].timestamp}\n\n ${info} `)
            .setFooter(`Total: ${tt}`, avatar);

        embeds.push(msg);
    }
    return embeds;
}

function Pause(message, serverQueue, author, button) {
    if (button == false || button == undefined) {
        if (!serverQueue.connection)
            return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    if (serverQueue.connection.dispatcher.paused)
        return message.channel.send("Da ii deja pe pauza ai handicap").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    serverQueue.connection.dispatcher.pause();
    if (button == false || button == undefined) {
        let msg = new Discord.MessageEmbed()
            .setColor('#11806A')
            .setDescription(`Hai ca ti-am pus-o pe pauza sa nu zici ca-s rau`)
        return message.channel.send(msg);
    }
}

function Resume(message, serverQueue, author, button) {
    if (button == false || button == undefined) {
        if (!serverQueue.connection)
            return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    if (serverQueue.connection.dispatcher.resumed)
        return message.channel.send("Da ii deja pe pauza ai handicap").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    serverQueue.connection.dispatcher.resume();
    serverQueue.connection.dispatcher.pause();
    serverQueue.connection.dispatcher.resume();
    if (button == false || button == undefined) {
        let msg = new Discord.MessageEmbed()
            .setColor('#11806A')
            .setDescription(`Am repornit boxa. Sa cante muzica`)
        return message.channel.send(msg);
    }
}

function Clear(message, serverQueue) {

    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    let nowPlaying = serverQueue.songs[0];
    qsongs = 1;
    currentsong = 0;
    serverQueue.songs = [];
    serverQueue.songs = [nowPlaying];
    let msg = new Discord.MessageEmbed()
        .setColor('#E74C3C')
        .setDescription(`Lista de dedicatii stearsa`)
    message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });;
    return;
}

function RemoveMultiple(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var nr = parseInt(args[1]);
    var nrs = parseInt(args[2]);
    if (nr > nrs) {
        let aux = nr;
        nr = nrs;
        nrs = aux;
    }
    if (nr != NaN && nrs != NaN && args[1] != null && args[2] != null) {
        if (serverQueue.songs[nr] && serverQueue.songs[nrs]) {
            let msg = new Discord.MessageEmbed()
                .setColor('#E74C3C')
                .setTitle(`Am sters din lista de dedicatii`)
                .setDescription(`${(nrs - nr) + 1} melodii`)
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            for (var i = nr; i < serverQueue.songs.length; i++)
                if (serverQueue.songs[i + (nrs - nr) + 1])
                    serverQueue.songs[i] = serverQueue.songs[i + (nrs - nr) + 1];
            serverQueue.songs.length -= ((nrs - nr) + 1);
            qsongs -= ((nrs - nr) + 1);
        }
        else message.channel.send("Zi un numar existent in queue").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    else {
        message.channel.send("Zi un numar calumea").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
}

async function Seek(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    let info = args[1].split(":");
    ms = 0;
    if (info[2]) {
        if (info[1] > 59 || info[2] > 59) return message.channel.send("Zi un moment al videoului calumea. xx:yy").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        ms = info[0] * 3600000 + info[1] * 60000 + info[2] * 1000;
    }
    else {
        if (info[0] > 59 || info[1] > 59) return message.channel.send("Zi un moment al videoului calumea. xx:yy").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        ms = info[0] * 60000 + info[1] * 1000;
    }
    if (ms > serverQueue.songs[0].duration.seconds * 1000)
        return message.channel.send("Zi un numar calumea nu ma beli. Nu exista momentul asta in video").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    const inf = await ytdl.getInfo(serverQueue.songs[0].url);
    stream = await ytdl.downloadFromInfo(inf, { filter: 'audioonly' })
    ok = 0;
    dispatcher = await serverQueue.connection.play(stream, { seek: ms / 1000 })
        .on("finish", () => {
            Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
            if (serverQueue.songs[0].lyrics) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.songs[0].lyrics.id).then(msg => { if (msg) msg.delete() });
            if (msgrow) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() });
            ms = 0;
            if (serverQueue.loop == 1) {
                play(message.guild, serverQueue.songs[0]);
                ok = 1;
            }
            else if (serverQueue.loop == 2) {
                serverQueue.songs.push(serverQueue.songs[0]);
                serverQueue.songs.shift();
            } else {
                serverQueue.songs.shift();
            }
            if (!ok) play(message.guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume);
    NowPlaying(ms, message, serverQueue);
}

function Remove(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var nr = parseInt(args[1]);
    if (nr != NaN && args[1] != null) {
        if (serverQueue.songs[nr]) {
            let msg = new Discord.MessageEmbed()
                .setColor('#E74C3C')
                .setTitle(`Am sters din lista de dedicatii`)
                .setDescription(`[${serverQueue.songs[nr].title}](${serverQueue.songs[nr].url})`)
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            for (var i = nr; i < serverQueue.songs.length - 1; i++)
                serverQueue.songs[i] = serverQueue.songs[i + 1];
            serverQueue.songs.length -= 1;
            qsongs--;
        }
        else message.channel.send("Zi un numar existent in queue").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    else {
        message.channel.send("Zi un numar calumea").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
}

function Move(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var nr = parseInt(args[1]);
    var nrs = parseInt(args[2]);
    if (nr != NaN && nrs != NaN && args[1] != null && args[2] != null) {
        if (serverQueue.songs[nr] && serverQueue.songs[nrs]) {
            let msg = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setTitle(`Am mutat`)
                .setDescription(`[${serverQueue.songs[nr].title}](${serverQueue.songs[nr].url}) pe pozitia ** ${nrs} ** `)
            message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            if (nrs < nr) {
                let aux = serverQueue.songs[nr];
                for (var i = serverQueue.songs.length; i > nrs; i--)
                    serverQueue.songs[i] = serverQueue.songs[i - 1];
                serverQueue.songs[nrs] = aux;

                if (serverQueue.songs[nr + 1]) {
                    for (var i = nr + 1; i < serverQueue.songs.length - 1; i++)
                        serverQueue.songs[i] = serverQueue.songs[i + 1];
                    serverQueue.songs.length -= 1;
                }
            }
            else if (nrs > nr) {
                let aux = serverQueue.songs[nr];
                for (var i = nr; i < nrs; i++)
                    serverQueue.songs[i] = serverQueue.songs[i + 1];
                serverQueue.songs[nrs] = aux;
            }
        }
        else message.channel.send("Zi doua numere calumea existente in queue. Ce sa mut si unde sa mut").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
    }
    else {
        message.channel.send("Zi doua numere calumea. Ce sa mut si unde sa mut").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
    }
}

async function Jump(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
    let nr = parseInt(args[1]);
    if (nr != NaN && args[1] != null) {
        if (serverQueue.songs[nr]) {
            serverQueue.connection = await message.member.voice.channel.join();
            if (nr == 0) message.delete();
            play(message.guild, serverQueue.songs[nr]);
            serverQueue.songs[0] = serverQueue.songs[nr];
        }
        else message.channel.send("Zi un numar existent in queue").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    else {
        message.channel.send("Zi un numar calumea").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
}

function Volume(args, message, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var nr = parseInt(args[1]);
    if (nr != NaN && args[1] != null && nr > 0) {

        serverQueue.connection.dispatcher.setVolume(nr);
        let msg = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setTitle(`Boxa: **${nr}**%`);
        message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 15000) });
    }
    else message.channel.send("Zi un numar calumea").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
}

function Shuffle(message, squeue, serverQueue) {
    if (!serverQueue.connection)
        return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    if (!message.member.voice.channel)
        return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    if (squeue.length < 4)
        return message.channel.send(`Ai ${squeue.length} melodii cum plm vrei sa faci shuffle ai handicap`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    for (let i = squeue.length - 1; i > 0; i--) {
        let j = Math.round(Math.random() * (i + 1));
        while (j == 0) j = Math.round(Math.random() * (i + 1));
        const aux = squeue[i];
        squeue[i] = squeue[j];
        squeue[j] = aux;
    }
    let msg = new Discord.MessageEmbed()
        .setColor('#E67E22')
        .setDescription(`Am amestecat lista de dedicatii`);
    message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    return squeue;
}

function NowPlaying(streamTime, message, serverQueue, button) {
    if (button == false || button == undefined) {
        if (!serverQueue.connection) {
            message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            message.delete(); return;
        }
        if (!message.member.voice.channel) {
            message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            message.delete(); return;
        }
        if (!serverQueue.songs[0] || serverQueue.songs[0] == null) {
            message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            message.delete(); return;
        }
    }
    if (button == false || button == undefined) {
        var curat = false;
        let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
        sv.members.cache.array().forEach(b => {
            if (b.user.id == message.author.id)
                if (serverQueue.connection.channel.id == b.voice.channel.id)
                    curat = true;
        });
        if (curat == false) {
            message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
            message.delete(); return;
        }
    }

    const song = serverQueue.songs[0];
    const seek = streamTime / 1000;
    const left = song.duration.seconds - seek;

    if (!serverQueue.connection.dispatcher.paused) {
        let nowPlaying = new Discord.MessageEmbed()
            .setColor('#71368A')
            .setTitle(`Acum canta: `)
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) \n\n `)
            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
        if (song.duration.seconds > 0) {
            nowPlaying.addField(new Date(seek * 1000).toISOString().substr(11, 8), "[" + createBar(song.duration.seconds == 0 ? seek : song.duration.seconds, seek, 15)[0] + "]");
            nowPlaying.addFields(
                { name: 'Au ramas:', value: `${new Date(left * 1000).toISOString().substr(11, 8)}`, inline: true },
                { name: `Timp total:`, value: `${song.timestamp}`, inline: true });
        }
        if (button == false || button == undefined) message.channel.send(nowPlaying).then(msg => { setTimeout(() => { msg.delete() }, 15000) });
        else message.send(nowPlaying).then(msg => { setTimeout(() => { msg.delete() }, 15000) });

    }
    else {
        let nowPlaying = new Discord.MessageEmbed()
            .setColor('#71368A')
            .setTitle(`Boxa e pe pauza: `)
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) \n\n `)
            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
        if (song.duration.seconds > 0) {
            nowPlaying.addField(new Date(seek * 1000).toISOString().substr(11, 8), "[" + createBar(song.duration.seconds == 0 ? seek : song.duration.seconds, seek, 15)[0] + "]");
            nowPlaying.addFields(
                { name: 'Au ramas:', value: `${new Date(left * 1000).toISOString().substr(11, 8)}`, inline: true },
                { name: `Timp total:`, value: `${song.timestamp}`, inline: true });
        }
        if (button == false || button == undefined) message.channel.send(nowPlaying).then(msg => { setTimeout(() => { msg.delete() }, 15000) });
        else message.send(nowPlaying).then(msg => { setTimeout(() => { msg.delete() }, 15000) });
    }
    if (button == false || button == undefined) message.delete();
}

async function Lyrics(message, serverQueue, button) {
    if (button == false || button == undefined) {
        if (!serverQueue.connection)
            return message.channel.send("Nu canta nimic acum").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    if (button == false || button == undefined) message.channel.send("Asteapta putin..").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
    else message.send("Asteapta putin..").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    let lyrics = null;
    let title = "";
    let args = serverQueue.songs[0].title.toLowerCase().split(" ");

    for (var i = 0; i < args.length; i++) {

        if (!args[i].includes("official") && !args[i].includes("video") && !args[i].includes("audio") && !args[i].includes("oficial") && !args[i].includes("hq") && !args[i].includes("live") && !args[i].includes("session") && !args[i].includes("hit") && !args[i].includes("manele") && !args[i].includes("[") && !args[i].includes("]") && !args[i].includes("(") && !args[i].includes(")"))
            title += args[i] + " ";
    }
    let cuv = title.split(" ");
    title = "";
    for (var i = 0; i < cuv.length; i++)
        if (cuv[i].includes("feat") || cuv[i].includes("ft.") || cuv[i].includes("&"))
            while (!(cuv[i].includes("-")) && i < cuv.length - 1)
                i++;
        else
            title += cuv[i] + " ";
    delete cuv;
    cuv = title.split(" ");
    title = "";
    for (var i = 0; i < cuv.length; i++)
        if (cuv[i].includes("x") && cuv[i].length < 3)
            while (!(cuv[i].includes("-")) && i < cuv.length - 1)
                i++;
        else
            title += cuv[i] + " ";

    let pages = [];
    let currentPage = 0;



    let haha = await l_finder(title, serverQueue, pages, message, button);
    if (haha != false) {
        const urm = new MessageButton()
            .setStyle("grey")
            .setLabel("Urmatoarea Pagina")
            .setID("urmator")
        const ant = new MessageButton()
            .setStyle("grey")
            .setLabel("Pagina Anterioara")
            .setID("anterior")

        if (button == false || button == undefined) serverQueue.songs[0].lyrics = await message.channel.send(`Pagina: ${currentPage + 1}/${pages.length}`, { buttons: [ant, urm], embed: pages[currentPage] });
        else serverQueue.songs[0].lyrics = await message.send(`Pagina: ${currentPage + 1}/${pages.length}`, { buttons: [ant, urm], embed: pages[currentPage] });

        const reactionFilter = (button) => {
            return 1 == 1;
        }
        const collector = serverQueue.songs[0].lyrics.createButtonCollector(reactionFilter);

        collector.on('collect', async (button) => {
            await button.reply.defer();
            if (button.id == 'urmator') {
                if (currentPage < pages.length - 1) {
                    currentPage += 1;
                    serverQueue.songs[0].lyrics.edit(`Pagina: ${currentPage + 1}/${pages.length}`, { buttons: [ant, urm], embed: pages[currentPage] });
                }
            } else if (button.id == 'anterior') {
                if (currentPage !== 0) {
                    currentPage -= 1;
                    serverQueue.songs[0].lyrics.edit(`Pagina: ${currentPage + 1}/${pages.length}`, { buttons: [ant, urm], embed: pages[currentPage] });
                }
            }
        })
    }
}

async function l_finder(title, serverQueue, pages, message, button) {
    var gen = 0, mux = 0;
    var j = 0;
    let lyrics = null, titlul;
    while (!lyrics && j < 5) {
        try {
            const searches = await ly.songs.search(title);
            const first = searches[0];
            titlul = first.fullTitle;
            lyrics = await first.lyrics();
        }
        catch (e) {
            lyrics = null;
        }
        j++;
    }

    if (lyrics)
        if (lyrics.length > 0) gen = 1;

        else {
            try {
                lyrics = await Musixmatch.find(title);
            }
            catch (e) {
                lyrics = null;
            }
            if (lyrics)
                if (lyrics.lyrics.length > 0) mux = 1;

        }
    if (gen == 1) {
        for (let i = 0; i < lyrics.length; i += 2048) {
            const lyric = lyrics.substring(i, Math.min(lyrics.length, i + 2048));
            const msg = new Discord.MessageEmbed()
                .setColor("#3498DB")
                .setTitle(titlul)
                .setDescription(lyric)
                .setTimestamp()
                .setFooter("Genius", "https://upload.wikimedia.org/wikipedia/commons/5/51/Genius-logo.png");
            pages.push(msg);
        }
        return;
    }
    else if (mux == 1) {
        for (let i = 0; i < lyrics.lyrics.length; i += 2048) {
            const lyric = lyrics.lyrics.substring(i, Math.min(lyrics.lyrics.length, i + 2048));
            const msg = new Discord.MessageEmbed()
                .setColor("#3498DB")
                .setTitle(serverQueue.songs[0].title)
                .setDescription(lyric)
                .setTimestamp()
                .setFooter("Musixmatch", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Musixmatch_logo_icon_only.svg/1200px-Musixmatch_logo_icon_only.svg.png");
            pages.push(msg);
        }
        return;
    }
    else {
        let msg = new Discord.MessageEmbed()
            .setColor("#992D22")
            .setDescription("N-am gasit versuri la melodia asta :(")
        if (button == false || button == undefined) message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        else message.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        return false;
    }
}

async function Leave(message, serverQueue) {
    Client.user.setActivity('Facultatea de Informatica', {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    });
    serverQueue = queue.get(message.guild.id);
    if (serverQueue == undefined) {
        message.react("👍");
        queue.delete(message.guild.id);
        message.member.voice.channel.leave();
        return;
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == true) {

        if (serverQueue.connection) {
            message.react("👍");
            Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
            queue.delete(message.guild.id);
            message.member.voice.channel.leave();
            //await stream.destroy();
        }
        else {
            message.delete();
            message.channel.send("Nu sunt in nici un channel momentan lol").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        }
        return;
    }
    else {
        message.delete();
        return message.channel.send("Trebuie sa fiu in channel cu tine").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
}

async function Reset(message, serverQueue) {
    serverQueue = queue.get(message.guild.id);
    if (serverQueue == undefined) {
        message.channel.send("stai asa").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        queue.delete(message.guild.id);
        message.member.voice.channel.leave();
        message.channel.send("gata").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        return;
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == true) {
        message.channel.send("stai asa").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        queue.delete(message.guild.id);
        Client.channels.cache.get(message.channel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
        message.member.voice.channel.leave();
        //await stream.destroy();
        message.channel.send("gata").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        return;
    }
    else {
        message.delete();
        return message.channel.send("Trebuie sa fiu in channel cu tine").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
}

function vali(message, serverQueue) {
    serverQueue.connection = message.member.voice.channel.join();
    return;
}

function milli(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

async function Manea(message, serverQueue, button) {
    let connection, adaug;
    var sabin_manea = "https://open.spotify.com/playlist/1WPPop7Eul1wQLlHteHKDV?si=76de36995c894927";

    if (button == false || button == undefined)
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    
    let list = new Array();

    let voiceChannel = message.member.voice.channel;
    if (!serverQueue || connection == undefined) {
        try {
            connection = await voiceChannel.join();
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        }
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach(b => {
        if (b.user.id == message.author.id)
            if (connection.channel.id == b.voice.channel.id)
                curat = true;
    });
    if (curat == false)
        if (button == false || button == undefined)
            return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        else return message.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    const output = execSync(`curl -H "Authorization: Basic ${process.env.exec_authbasic}" -d grant_type=refresh_token -d refresh_token=${process.env.spotify_refreshtoken} https://accounts.spotify.com/api/token`, { encoding: 'utf-8' });

    let c = output.split(`"`);
    let token = c[3];
    spotifyApi.setAccessToken(token);

    qsongs++;
    var m = await getData(sabin_manea);
    let playlistID = m.id;

    var offset = 0;
    var pagesize = 100;
    var continueloop = true;

    var result = await getplaylisttracks(playlistID, pagesize, offset);

    do {
        for (var i = 0; i < 100; i++)
            if (result.items[i] != undefined) {
                list.push(result.items[i]);
            }
        try {
            if (result.next != null) {
                offset = offset + pagesize;
                result = await getplaylisttracks(playlistID, pagesize, offset);
            }
            else {
                continueloop = false;
            }
        }
        catch (e) {
            continueloop = false;
        }
    }
    while (continueloop);
    let number = message.content.replace(/^\D+/g, '');
    if (number) {
        if (number > list.length) {
            message.delete();
            return message.channel.send(`**Playlistul lui FII Music are doar ${list.length} de manele!**`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        }
        if (number == 1) number = undefined;
    }
    if (number) adaug = await message.channel.send(`Adaug **${number}** manele la lista de dedicatii...`);

    var random = Math.floor(Math.random() * list.length);
    var vok = 0;
    var haima = await getPreview(list[random].track.external_urls.spotify);
    let titl = "";
    titl = haima.artist + " " + haima.title + " song";
    try {
        result = await yts(titl);
    }
    catch (e) {
        message.channel.send(`N am putut adauga melodia ${titl}, trec la urmatoarea`); vok = 1;
    }
    if (vok != 1) {
        if (!queue.get(message.guild.id) || (queue.get(message.guild.id) && queue.get(message.guild.id).songs == 0)) {
            let muz = {
                title: result.videos[0].title,
                url: result.videos[0].url,
                timestamp: result.videos[0].timestamp,
                duration: result.videos[0].duration,
                author: message.member.nickname || message.member.user.tag,
                avatar: message.author.avatarURL(),
                lyrics: null
            };
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 1,
                playing: true,
                filters: [],
                filter_name: [],
                loop: 0,
                queueEmbed: null
            };
            let svq = queue.get(message.guild.id);
            if (!svq) {
                queue.set(message.guild.id, queueContruct);
                queueContruct.songs.push(muz);
                try {
                    let connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    play(message.guild, queueContruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
                }
            }
            if (number != undefined) {
                for (var i = 1; i < number; i++) {
                    var rand = Math.floor(Math.random() * list.length);
                    var mel = await getPreview(list[rand].track.external_urls.spotify);
                    let titlu = "";
                    titlu = mel.artist + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    } catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }
                }
            }
            if (number) {
                Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
                let msg = new Discord.MessageEmbed()
                    .setColor('#95A5A6')
                    .setDescription(`Am adaugat **${number}** manele la lista de dedicatii`)
                    .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());
                return message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            }
        }
        else {
            if (number != undefined) {
                for (var i = 0; i < number; i++) {
                    var rand = Math.floor(Math.random() * list.length);
                    var mel = await getPreview(list[rand].track.external_urls.spotify);
                    let titlu = "";
                    titlu = mel.artist + " " + mel.title + " song";
                    try {
                        result = await yts(titlu);
                    }
                    catch (e) {
                        message.channel.send(`N am putut adauga melodia ${titlu}, trec la urmatoarea`); vok = 1;
                    }
                    if (vok != 1) {
                        let muz = {
                            title: result.videos[0].title,
                            url: result.videos[0].url,
                            timestamp: result.videos[0].timestamp,
                            duration: result.videos[0].duration,
                            author: message.member.nickname || message.member.user.tag,
                            avatar: message.author.avatarURL(),
                            lyrics: null
                        };
                        let svq = queue.get(message.guild.id);
                        svq.songs.push(muz);
                        qsongs++;
                        serverQueue = svq;
                    }

                    //if (button == false || button == undefined) return message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
                    //else return message.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
                }
                if (number) {
                    Client.channels.cache.get(message.channel.id).messages.fetch(adaug.id).then(msg => msg.delete());
                    let msg = new Discord.MessageEmbed()
                        .setColor('#95A5A6')
                        .setDescription(`Am adaugat **${number}** manele la lista de dedicatii`)
                        .setFooter(`Dedicatie de la ${message.member.nickname || message.member.user.tag}`, message.author.avatarURL());
                    return message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
                }
            }
            let muz = {
                title: result.videos[0].title,
                url: result.videos[0].url,
                timestamp: result.videos[0].timestamp,
                duration: result.videos[0].duration,
                author: message.member.nickname || message.member.user.tag,
                avatar: message.author.avatarURL(),
                lyrics: null
            };
            svq = queue.get(message.guild.id);
            svq.songs.push(muz);
            serverQueue = svq;

            let msg = new Discord.MessageEmbed()
                .setColor('#95A5A6')
                .setTitle(`Am adaugat la lista de dedicatii `)
                .setDescription(`[${muz.title}](${muz.url})`)
                .setFooter(`Dedicatie de la ${muz.author}`, muz.avatar);

            if (button == false || button == undefined) return message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
            else return message.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        }
    }

}

async function getplaylisttracks(playlistid, pagesize, offset) {
    let data = await spotifyApi.getPlaylistTracks(playlistid, { limit: pagesize, offset: offset })
    return data.body;
}

function Radio(message, button) {
    //if (button == false || button == undefined) message.delete();
    let lista = new Array(
        o1 = new MessageMenuOption()
            .setLabel('Antena Satelor')
            .setEmoji('🎵')
            .setValue('antenasatelor'),
        o106 = new MessageMenuOption()
            .setLabel('Cluj FM')
            .setEmoji('🎵')
            .setValue('cluj'),
        o2 = new MessageMenuOption()
            .setLabel('Dance FM')
            .setEmoji('🎵')
            .setValue('dancefm'),
        o3 = new MessageMenuOption()
            .setLabel('Deep House')
            .setEmoji('🎵')
            .setValue('deephouse'),
        o4 = new MessageMenuOption()
            .setLabel('Digi FM')
            .setEmoji('🎵')
            .setValue('digifm'),
        o5 = new MessageMenuOption()
            .setLabel('Europa FM')
            .setEmoji('🎵')
            .setValue('europafm'),
        o103 = new MessageMenuOption()
            .setLabel('Itsy Bitsy')
            .setEmoji('🎵')
            .setValue('itsy'),
        o98 = new MessageMenuOption()
            .setLabel('Jazz FM')
            .setEmoji('🎵')
            .setValue('jazzfm'),
        o6 = new MessageMenuOption()
            .setLabel('Kiss FM')
            .setEmoji('🎵')
            .setValue('kissfm'),
        o17 = new MessageMenuOption()
            .setLabel('Lautaru Popular')
            .setEmoji('🎵')
            .setValue('lautaru-popular'),
        o7 = new MessageMenuOption()
            .setLabel('Magic FM')
            .setEmoji('🎵')
            .setValue('magicfm'),
        o8 = new MessageMenuOption()
            .setLabel('Manele Premium')
            .setEmoji('🎵')
            .setValue('manele-premium'),
        o9 = new MessageMenuOption()
            .setLabel('Manele Unu')
            .setEmoji('🎵')
            .setValue('manele-unu'),
        //o10 = new MessageMenuOption()
        //    .setLabel('Manele Vechi')
        //    .setEmoji('🎵')
        //    .setValue('manele-vechi'),

        o11 = new MessageMenuOption()
            .setLabel('Ortodox Radio')
            .setEmoji('🎵')
            .setValue('ortodox'),
        o99 = new MessageMenuOption()
            .setLabel('Penny FM')
            .setEmoji('🎵')
            .setValue('penny'),
        o12 = new MessageMenuOption()
            .setLabel('Pro FM')
            .setEmoji('🎵')
            .setValue('profm'),
        o13 = new MessageMenuOption()
            .setLabel('Rock FM')
            .setEmoji('🎵')
            .setValue('rockfm'),
        o14 = new MessageMenuOption()
            .setLabel('Romania Actualitati')
            .setEmoji('🎵')
            .setValue('romania-actualitati'),
        o15 = new MessageMenuOption()
            .setLabel('Romantic FM')
            .setEmoji('🎵')
            .setValue('romanticfm'),
        o16 = new MessageMenuOption()
            .setLabel('Taraf')
            .setEmoji('🎵')
            .setValue('taraf'),
        
        o18 = new MessageMenuOption()
            .setLabel('Virgin Radio')
            .setEmoji('🎵')
            .setValue('virgin'),
        o19 = new MessageMenuOption()
            .setLabel('Viva FM')
            .setEmoji('🎵')
            .setValue('vivafm'),
        o20 = new MessageMenuOption()
            .setLabel('Vocea Evangheliei')
            .setEmoji('🎵')
            .setValue('evanghelia'),
        //o21 = new MessageMenuOption()
        //    .setLabel('Vocea Sperantei')
        //    .setEmoji('🎵')
        //    .setValue('speranta')
        o8 = new MessageMenuOption()
            .setLabel('Qanon Romania')
            .setEmoji('🎵')
            .setValue('qanon')
    )

    let select = new MessageMenu()
        .setID('radio')
        .setPlaceholder('FII Radio')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(lista)

    if (button == false || button == undefined) message.channel.send('Alege postul Radio:', select).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 30000) });
    else message.send('Alege postul Radio:', select).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 30000) });

    //let msg = new Discord.MessageEmbed()
    //    .setColor('#34495E')
    //    .setTitle('Valeriu Arustei Radio')
    //    .setDescription('Posturi de radio disponibile:')
    //    .addFields(
    //        { name: '**+antenasatelor**', value: 'Antena Satelor', inline: true },
    //        { name: '**+dancefm**', value: 'Dance FM', inline: true },
    //        { name: '**+deephouse**', value: 'Deep House Romania', inline: true },
    //        { name: '**+digifm**', value: 'Digi FM', inline: true },
    //        { name: '**+europafm**', value: 'Europa FM', inline: true },
    //        { name: '**+kissfm**', value: 'Kiss FM', inline: true },
    //        { name: '**+magicfm**', value: 'Magic FM', inline: true },
    //        { name: '**+manele-premium**', value: 'Manele Premium', inline: true },
    //        { name: '**+manele-unu**', value: 'Manele Unu', inline: true },
    //        { name: '**+manele-vechi**', value: 'Manele Vechi Romania', inline: true },
    //        { name: '**+ortodox**', value: 'Ortodox FM', inline: true },
    //        { name: '**+profm**', value: 'Pro FM', inline: true },
    //        { name: '**+rockfm**', value: 'Rock FM', inline: true },
    //        { name: '**+romania-actualitati**', value: 'Radio Romania Actualitati', inline: true },
    //        { name: '**+romanticfm**', value: 'Romantic FM', inline: true },
    //        { name: '**+taraf**', value: 'Taraf FM', inline: true },
    //        { name: '**+taraf-petrecere**', value: 'Taraf Petrecere', inline: true },
    //        { name: '**+vivafm**', value: 'Viva FM', inline: true })
    //    .setFooter('realizat de Cristinel#3588', 'https://media.discordapp.net/attachments/668058294883188776/786886503158644746/unknown.png?width=263&height=158 ');
    //return message.channel.send(msg);
}

async function radio_q(message, serverQueue, post, author, button) {
    let voiceChannel;
    if (button == false || button == undefined) {
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

        voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    let mem;
    if (button == false || button == undefined) mem = message.guild.members.cache.get(author.id);
    else mem = Client.guilds.cache.get(serverQueue.textChannel.guild.id).members.cache.get(author.id);

    let muz = {
        title: post.name,
        url: post.url,
        timestamp: "∞",
        duration: { seconds: 0 },
        author: mem.nickname || mem.user.tag,
        avatar: mem.user.avatarURL({ dynamic: true }),
        site: post.site
    };
    serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
        try {
            connection = await voiceChannel.join();

        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        }
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 1,
            playing: true,
            filters: [],
            filter_name: [],
            loop: 0,
            queueEmbed: null
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(muz);
        try {
            let connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            throw message.channel.send(`N-am putut sa intru pe voice channel ${err}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
        }
        return;
    }
    let svq = queue.get(message.guild.id);
    svq.songs.push(muz);
    serverQueue = svq;
    let msg = new Discord.MessageEmbed()
        .setColor('#95A5A6')
        .setTitle(`Am adaugat la lista de dedicatii `)
        .setDescription(`[${muz.title}](${muz.site})`)
        .setFooter(`Dedicatie de la ${muz.author}`, muz.avatar);

    if (button == false || button == undefined) message.channel.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
    else message.send(msg).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 10000) });
    return;
}

async function filter_q(message, serverQueue, author, button, row) {

    if (button == false || button == undefined) {
        if (!message.member.voice.channel)
            return message.channel.send("Trebuie sa fiu cu tine in channel ca nu fac silence party").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        if (!serverQueue)
            return message.channel.send("Da nu mai sunt dedicatii, n am la ce da skip").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
    }
    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach((b) => {
        if (b.user.id == author.id) {
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
        }
    });
    if (curat == false)
        if (button == true) return message.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });
        else return message.channel.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    const filtre = ['Bassboost +10', '8D', 'Vaporwave', 'Nightcore', 'Phaser', 'Tremolo', 'Vibrato', 'Surrounding', 'Pulsator', 'Subboost', 'Karaoke']
    const filters = [
        'bass=g=10,dynaudnorm=f=200',//bassboost
        'apulsator=hz=0.1', //8D
        'aresample=48000,asetrate=48000*0.8',//vaporwave
        'aresample=48000,asetrate=48000*1.25',//nightcore
        'aphaser=in_gain=1',//phaser
        'tremolo',//tremolo
        'vibrato=f=9',//vibrato
        'surround',//surrounding
        'apulsator=hz=1.5',//pulsator
        'asubboost',//subboost
        'stereotools=mlev=0.03',//karaoke
        "remove",

    ];
    let lista = new Array(
        o11 = new MessageMenuOption()
            .setLabel('Remove All')
            .setEmoji('❌')
            .setValue('remove_all'),
        o10 = new MessageMenuOption()
            .setLabel('Remove Last')
            .setEmoji('❌')
            .setValue('remove'),
        o1 = new MessageMenuOption()
            .setLabel('Bassboost +10')
            .setEmoji('📢')
            .setValue('bassboost'),
        o2 = new MessageMenuOption()
            .setLabel('8D')
            .setEmoji('💫')
            .setValue('8D'),
        o4 = new MessageMenuOption()
            .setLabel('Nightcore')
            .setEmoji('🌚')
            .setValue('nightcore'),
        o3 = new MessageMenuOption()
            .setLabel('Vaporwave')
            .setEmoji('🌊')
            .setValue('vaporwave'),
        o12 = new MessageMenuOption()
            .setLabel('Karaoke')
            .setEmoji('🎙')
            .setValue('karaoke'),
        o7 = new MessageMenuOption()
            .setLabel('Vibrato')
            .setEmoji('📳')
            .setValue('vibrato'),
        o9 = new MessageMenuOption()
            .setLabel('Pulsator')
            .setEmoji('〽')
            .setValue('pulsator'),
        o5 = new MessageMenuOption()
            .setLabel('Phaser')
            .setEmoji('➿')
            .setValue('phaser'),
        o6 = new MessageMenuOption()
            .setLabel('Tremolo')
            .setEmoji('🎶')
            .setValue('tremolo'),
        o8 = new MessageMenuOption()
            .setLabel('Surrounding')
            .setEmoji('🎧')
            .setValue('surrounding'),
        o10 = new MessageMenuOption()
            .setLabel('Subboost')
            .setEmoji('🔈')
            .setValue('subboost')
    )

    let select = new MessageMenu()
        .setID('filter')
        .setPlaceholder('Filtre')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(lista)

    message.send('Alege un efect: ', select).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 30000) });

    let effect, choice, name;

    Client.once('clickMenu', async (menu) => {
        switch (menu.values[0]) {
            case 'bassboost': effect = 0; break;
            case '8D': effect = 1; break;
            case 'vaporwave': effect = 2; break;
            case 'nightcore': effect = 3; break;
            case 'phaser': effect = 4; break;
            case 'tremolo': effect = 5; break;
            case 'vibrato': effect = 6; break;
            case 'surrounding': effect = 7; break;
            case 'pulsator': effect = 8; break;
            case 'subboost': effect = 9; break;
            case 'karaoke': effect = 10; break;
            case 'remove': effect = 69; break;
            case 'remove_all': effect = 420; break;
        }
        serverQueue.textChannel.send(`Filtru editat de catre ${menu.clicker.user.tag}`).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });;
        menu.reply.defer(); await menu.message.delete();
        choice = filters[effect];
        name = filtre[effect];
        if (effect == 420) {
            serverQueue.filters = [];
            serverQueue.filter_name = [];
            Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
            return play(message.guild, serverQueue.songs[0], (serverQueue.connection.dispatcher.streamTime + ms) / 1000);
        }
        if (effect == 69) {
            if (!serverQueue.filters[0]) {
                let h = new MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription("❗ Niciun efect ❗")
                return serverQueue.textChannel.send(h).then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 1500) })
            }
            serverQueue.filters.pop();
            serverQueue.filter_name.pop();
            if (!serverQueue.filters[0]) {
                Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
                return play(message.guild, serverQueue.songs[0], (serverQueue.connection.dispatcher.streamTime + ms) / 1000);
            }
            let msg, song = serverQueue.songs[0];
            msg = new Discord.MessageEmbed()
                .setColor('#7F00FF')
                .setTitle(`A inceput sa cante nebunia de`)
                .setDescription(`[${song.title}](${song.url})`)
                .addField('Filtre: ', serverQueue.filter_name)
                .setFooter(`Dedicatie de la ${song.author}`, song.avatar);
            if (msg) serverQueue.queueEmbed.edit(msg, row);
            let encoderArgstoset = ['-af', serverQueue.filters], ok = 0;
            stream = await ytdl(serverQueue.songs[0].url, {
                filter: "audioonly",
                opusEncoded: true,
                encoderArgs: encoderArgstoset,
                seek: (serverQueue.connection.dispatcher.streamTime + ms) / 1000,
            });
            dispatcher = await serverQueue.connection.play(stream, { type: "opus" })
                .on("finish", () => {
                    Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
                    if (serverQueue.songs[0].lyrics) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.songs[0].lyrics.id).then(msg => { if (msg) msg.delete() });
                    if (msgrow) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() });
                    ms = 0;
                    if (serverQueue.loop == 1) {
                        play(message.guild, serverQueue.songs[0]);
                        ok = 1;
                    }
                    else if (serverQueue.loop == 2) {
                        serverQueue.songs.push(serverQueue.songs[0]);
                        serverQueue.songs.shift();
                    } else {
                        serverQueue.songs.shift();
                    }
                    if (!ok) play(message.guild, serverQueue.songs[0]);
                })
                .on("error", error => { if (error.status == 403) console.log("da"); console.error(error) });
            dispatcher.setVolumeLogarithmic(serverQueue.volume);
            return;
            //Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
            //return play(message.guild, serverQueue.songs[0], (serverQueue.connection.dispatcher.streamTime + ms) / 1000);
        }
        else {
            serverQueue.filters.push(choice);
            serverQueue.filter_name.push(name);
        }

        let msg, song = serverQueue.songs[0];
        msg = new Discord.MessageEmbed()
            .setColor('#7F00FF')
            .setTitle(`A inceput sa cante nebunia de`)
            .setDescription(`[${song.title}](${song.url})`)
            .addField('Filtre: ', serverQueue.filter_name)
            .setFooter(`Dedicatie de la ${song.author}`, song.avatar);

        if (msg) serverQueue.queueEmbed.edit(msg, row);


        let encoderArgstoset = ['-af', serverQueue.filters], ok = 0;
        stream = await ytdl(serverQueue.songs[0].url, {
            filter: "audioonly",
            opusEncoded: true,
            encoderArgs: encoderArgstoset,
            seek: (serverQueue.connection.dispatcher.streamTime + ms) / 1000,
        });

        dispatcher = await serverQueue.connection.play(stream, { type: "opus" })
            .on("finish", () => {
                Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.queueEmbed.id).then(msg => msg.delete());
                if (serverQueue.songs[0].lyrics) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(serverQueue.songs[0].lyrics.id).then(msg => { if (msg) msg.delete() });
                if (msgrow) Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() });
                ms = 0;
                if (serverQueue.loop == 1) {
                    play(message.guild, serverQueue.songs[0]);
                    ok = 1;
                }
                else if (serverQueue.loop == 2) {
                    serverQueue.songs.push(serverQueue.songs[0]);
                    serverQueue.songs.shift();
                } else {
                    serverQueue.songs.shift();
                }
                if (!ok) play(message.guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume);
        return;
    })
}

async function more_row(message, serverQueue, author) {

    var curat = false;
    let sv = Client.guilds.cache.get(message.guild.id); ///verific daca author ul e in acelasi channel cu valeriu
    sv.members.cache.array().forEach((b) => {
        if (b.user.id == author.id) {
            if (serverQueue.connection.channel.id == b.voice.channel.id)
                curat = true;
        }
    });
    if (curat == false)
        return message.send("Trebuie sa fiu cu tine in Voice Channel").then(msg => { setTimeout(() => { if (msg) msg.delete(); }, 5000) });

    const b1 = new MessageButton()
        .setStyle("grey")
        .setLabel("Now Playing")
        .setID("nowplaying")
    const b2 = new MessageButton()
        .setStyle("grey")
        .setLabel("Loop")
        .setID("loop")
    const b3 = new MessageButton()
        .setStyle("grey")
        .setLabel("Lyrics")
        .setID("lyrics")

    const b6 = new MessageButton()
        .setStyle("grey")
        .setLabel("Radio")
        .setID("radio")

    const b8 = new MessageButton()
        .setStyle("grey")
        .setLabel("Filters")
        .setID("filters")
    const row1 = new MessageActionRow()
        .addComponents(b1, b2, b3, b8, b6)

    msgrow = await message.send('More:', row1);

    const filter = (button) => {
        var curat = false;
        let sv = Client.guilds.cache.get(message.guild.id);
        sv.members.cache.array().forEach((b) => {
            if (b.user.id == author.id) {
                if (serverQueue.connection.channel.id == b.voice.channel.id)
                    curat = true;
            }
        });
        return curat == true;
    };

    const collector = msgrow.createButtonCollector(filter);

    collector.on('collect', async (button) => {
        await button.reply.defer();
        if (button.id == 'nowplaying') {
            await NowPlaying(ms + serverQueue.connection.dispatcher.streamTime, message, serverQueue, true);
        }
        else if (button.id == 'loop') {
            await Loop(message, serverQueue, button.clicker, row, serverQueue.songs[0], true);
        }
        else if (button.id == 'lyrics') {
            await Lyrics(message, serverQueue, true);
        }
        else if (button.id == 'filters') {
            await filter_q(message, serverQueue, button.clicker, true, row);
        }
        else if (button.id == 'radio') {
            Radio(message, true);
            let post = {
                name: "", url: "", site: ""
            };
            Client.once('clickMenu', async menu => {
                switch (menu.values[0]) {
                    case 'antenasatelor': post.name = 'Antena Satelor'; post.url = "http://89.238.227.6:8040/litsne.pls"; post.site = "https://www.antenasatelor.ro/"; break;
                    case 'dancefm': post.name = 'Dance FM'; post.url = "https://edge126.rcs-rds.ro/profm/dancefm.mp3"; post.site = "https://www.dancefm.ro/"; break;
                    case 'deephouse': post.name = 'Deep House Romania'; post.url = "http://live.dancemusic.ro:7000/stream"; post.site = "https://www.dancemusic.ro/"; break;
                    case 'digifm': post.name = 'Digi FM'; post.url = "http://edge76.rdsnet.ro:84/digifm/digifm.mp3"; post.site = "https://www.digifm.ro/"; break;
                    case 'europafm': post.name = 'Europa FM'; post.url = "http://astreaming.europafm.ro:8000/EuropaFM_aac"; post.site = "https://www.europafm.ro/"; break;
                    case 'kissfm': post.name = 'Kiss FM'; post.url = "https://live.kissfm.ro/kissfm.aacp"; post.site = "https://www.kissfm.ro/"; break;
                    case 'magicfm': post.name = 'Magic FM'; post.url = "https://live.magicfm.ro/magicfm.aacp"; post.site = "https://www.magicfm.ro/"; break;
                    case 'manele-premium': post.name = 'Manele Premium Romania'; post.url = "http://stream.adradio.ro/mp128"; post.site = "http://manelepremium.com/"; break;
                    case 'manele-unu': post.name = 'Manele UNU Romania'; post.url = "http://radio1manele.no-ip.org:8000/listne.pls"; post.site = "https://radiounumanele.ro/"; break;
                    //case 'manele-vechi': post.name = 'Manele Vechi Romania'; post.url = "http://ssl.ascultatare.ro:8122/stream"; post.site = "https://myradioonline.ro/radio-manele-vechi"; break;
                    case 'ortodox': post.name = 'Ortodox Radio Romania'; post.url = "http://www.ortodoxradio.ro:8000/stream48"; post.site = "https://www.ortodoxradio.ro/"; break;
                    case 'profm': post.name = 'Pro FM'; post.url = "http://edge126.rdsnet.ro:84/profm/profm.mp3"; post.site = "https://www.profm.ro/"; break;
                    case 'rockfm': post.name = 'Rock FM'; post.url = "https://live.rockfm.ro/rockfm.aacp"; post.site = "https://www.rockfm.ro/"; break;
                    case 'romania-actualitati': post.name = 'Radio Romania Actualitati'; post.url = "http://89.238.227.6:8008/listne.pls"; post.site = "http://www.romania-actualitati.ro/"; break;
                    case 'romanticfm': post.name = 'Romantic FM'; post.url = "http://zuicast.digitalag.ro:9420/romanticfm"; post.site = "https://romanticfm.ro/live"; break;
                    case 'taraf': post.name = 'Taraf FM'; post.url = "http://asculta.radiotaraf.ro:7100/listne.pls"; post.site = "https://radiotaraf.ro/"; break;
                    case 'lautaru-popular': post.name = 'Lautaru Popular'; post.url = "http://162.19.18.212:9000/stream"; post.site = "https://radiotaraf.ro/radio-taraf-petrecere-popular-etno/"; break;
                    case 'vivafm': post.name = 'Viva FM Iasi'; post.url = "https://sonicpanel.hostclean.ro/8004/stream"; post.site = "https://vivafm.ro/"; break;
                }
                menu.reply.defer();
                if (post.url != "") {
                    radio_q(message, serverQueue, post, menu.clicker, true); menu.message.delete();
                }
            })
        }
        if (button.id != null) {
            Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() });
        }

    });
    setTimeout(() => { Client.channels.cache.get(serverQueue.textChannel.id).messages.fetch(msgrow.id).then(msg => { if (msg) msg.delete() }); }, 15000);
}


async function herok(message) {
    message.author.send("Restarting...");
    message.delete();
    await heroku.restart();
}

Client.login(process.env.login);