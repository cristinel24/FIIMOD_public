const fetch = require('node-fetch');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { decode } = require('html-entities');
const {
	convertTime,
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
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	let question = {};
	if (options.topic != undefined) {
		await fetch(
			`https://opentdb.com/api.php?amount=1&category=${options.topic}&type=boolean`,
		)
			.then((res) => res.json())
			.then((res) => {
			question.question = res.results[0].question;
			question.correct_answer = res.results[0].correct_answer;
		});
	} else {
		await fetch(
			'https://opentdb.com/api.php?amount=1&type=boolean',
		)
			.then((res) => res.json())
			.then((res) => {
			question.question = res.results[0].question;
			question.correct_answer = res.results[0].correct_answer;
		});
	}

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});
	let answer;
	let winningID;
	if (question.correct_answer === 'True') {
		winningID = id1;
		answer = options.buttons.true;
	} else {
		winningID = id2;
		answer = options.buttons.lie;
	}
	let btn1 = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(options.buttons.true)
		.setID(id1);
	let btn2 = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(options.buttons.lie)
		.setID(id2);

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setDescription(decode(question.question))
		.setColor(options.embed.color)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think
		.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1, btn2] }],
		})
		.then(async (m) => {
			const gameCreatedAt = Date.now();
			const gameCollector = m.createButtonCollector((fn) => fn);
			gameCollector.on('collect', (button) => {
				if (button.clicker.user.id !== options.message.author.id) {
					return button.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				button.reply.defer();
				if (button.id === winningID) {
					btn1 = new disbut.MessageButton()
						.setLabel(options.buttons.true)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setLabel(options.buttons.lie)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					if (winningID === id1) {
						btn1.setStyle('green');
						btn2.setStyle('red');
					} else {
						btn1.setStyle('red');
						btn2.setStyle('green');
					}
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn1, btn2] }],
					});
					setTimeout(() => { button.message.delete(); }, 10000);
					const time = convertTime(Date.now() - gameCreatedAt);
					const winEmbed = new Discord.MessageEmbed()
						.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
						.setDescription(
							`${options.winMessage
								.replace('{{answer}}', decode(answer))
								.replace('{{time}}', time)}`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						winEmbed.setTimestamp();
					}
					options.message.reply(winEmbed).then(msg => { setTimeout(() => { msg.delete(); }, 10000)});

				} else {
					btn1 = new disbut.MessageButton()
						.setLabel(options.buttons.true)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setLabel(options.buttons.lie)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					if (winningID === id1) {
						btn1.setStyle('green');
						btn2.setStyle('red');
					} else {
						btn1.setStyle('red');
						btn2.setStyle('green');
					}
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn1, btn2] }],
					});
					setTimeout(() => { button.message.delete(); }, 10000);
					const lostEmbed = new Discord.MessageEmbed()
						.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
						.setDescription(
							`${options.loseMessage.replace('{{answer}}', decode(answer))}`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						lostEmbed.setTimestamp();
					}
					options.message.reply(lostEmbed).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
				}
			});
		});
};
