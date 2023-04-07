const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { decode } = require('html-entities');
const {
	randomHexColor,
	getRandomString,
	WillYouPressTheButton,
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

	const fetchedData = await WillYouPressTheButton();
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	const res = {
		questions: [fetchedData.txt1, fetchedData.txt2],
		percentage: {
			1: fetchedData.yes,
			2: fetchedData.no,
		},
	};
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});

	let btn = new disbut.MessageButton()
		.setStyle('green')
		.setLabel(options.button.yes)
		.setID(id1);
	let btn2 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.button.no)
		.setID(id2);

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			`${options.embed.description
				.replace(
					'{{statement1}}',
					decode(
						res.questions[0].charAt(0).toUpperCase() +
							res.questions[0].slice(1),
					),
				)
				.replace(
					'{{statement2}}',
					decode(
						res.questions[1].charAt(0).toUpperCase() +
							res.questions[1].slice(1),
					),
				)}`,
		)
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
			gameCollector.on('collect', (wyptb) => {
				if (wyptb.clicker.user.id !== options.message.author.id) {
					return wyptb.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				wyptb.reply.defer();
				if (wyptb.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('green')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('red')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { wyptb.message.delete(); }, 10000);
				} else if (wyptb.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('red')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('green')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { wyptb.message.delete(); }, 10000);
				}
			});
		});
};
