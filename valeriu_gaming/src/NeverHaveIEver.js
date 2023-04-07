const Discord = require('discord.js');
const fetch = require('node-fetch');
const disbut = require('discord-buttons');
const {
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

	const id1 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id2 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const think = await options.message.reply({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});
	let { statement } = await fetch(
		'https://api.nhie.io/v1/statements/random?category[]=harmless',
	).then((res) => res.json());
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	statement = statement.trim();
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});

	let btn = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(`${options.buttons.optionA}`)
		.setID(id1);
	let btn2 = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(`${options.buttons.optionB}`)
		.setID(id2);

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setDescription(statement)
		.setColor(options.embed.color)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think
		.edit({
			embed: embed,
			components: [{ type: 1, components: [btn, btn2] }],
		})
		.then(async (m) => {
			const gameCollector = m.createButtonCollector((fn) => fn);
			gameCollector.on('collect', (nhie) => {
				if (nhie.clicker.user.id !== options.message.author.id) {
					return nhie.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				nhie.reply.defer();
				if (nhie.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(`${options.buttons.optionA}`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(`${options.buttons.optionB}`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { m.delete(); }, 10000);
				} else if (nhie.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(`${options.buttons.optionA}`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(`${options.buttons.optionB}`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { m.delete(); }, 10000);
				}
			});
		});
};
