const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { decode } = require('html-entities');
const {
	fetchhtml,
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
	const $ = await fetchhtml('http://either.io');
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	const blue = $('div.result.result-1').children();
	const red = $('div.result.result-2').children();
	const res = {
		questions: [blue.eq(3).text(), red.eq(3).text()],
		percentage: {
			1: blue.eq(1).text(),
			2: red.eq(1).text(),
		},
		author: $('span[id="question-author"] a').text(),
	};
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
		.setDescription(
			`**A)** ${decode(res.questions[0])} \n**B)** ${decode(res.questions[1])}`,
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
			gameCollector.on('collect', (wyr) => {
				if (wyr.clicker.user.id !== options.message.author.id) {
					return wyr.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				wyr.reply.defer();
				if (wyr.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(
							`${options.buttons.optionA}` + ` (${res.percentage['1']})`,
						)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(
							`${options.buttons.optionB}` + ` (${res.percentage['2']})`,
						)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					const _embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
						.setDescription(
							`**A) ${decode(res.questions[0])} (${
								res.percentage['1']
							})** \nB) ${decode(res.questions[1])} (${res.percentage['2']})`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						_embed.setTimestamp();
					}
					think.edit({
						embed: _embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { m.delete(); }, 10000);
				} else if (wyr.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(
							`${options.buttons.optionA}` + ` (${res.percentage['1']})`,
						)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(
							`${options.buttons.optionB}` + ` (${res.percentage['2']})`,
						)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					const _embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
						.setDescription(
							`A) ${decode(res.questions[0])} (${
								res.percentage['1']
							}) \n**B) ${decode(res.questions[1])} (${res.percentage['2']})**`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						_embed.setTimestamp();
					}
					think.edit({
						embed: _embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
					setTimeout(() => { m.delete(); }, 10000);
				}
			});
		});
};
