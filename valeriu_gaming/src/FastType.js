const data = new Set();
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	randomHexColor,
	getRandomString,
	getRandomSentence,
} = require('../functions/function');

module.exports = async (options) => {

	if (!options.sentence) {
		options.sentence = getRandomSentence(Math.floor(Math.random() * 10) + 3)
			.toString()
			.split(',')
			.join(' ');
	}
	if (typeof options.sentence !== 'string') {
		throw new TypeError('sentence must be a string');
	}

	if (!options.time) options.time = 60000;

	if (!options.buttonText) options.buttonText = 'Cancel';

	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

	const id =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const sentence = options.sentence
		.toLowerCase()
		.split('  ')
		.map((msg) => `\`${msg.split('').join(' ')}\``)
		.join(' ');
	const gameCreatedAt = Date.now();
	let btn1 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.buttonText)
		.setID(id);
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setDescription(
			`${options.embed.description.replace(
				'{{time}}',
				convertTime(options.time),
			)}`,
		)
		.addField('Sentence:', `${sentence}`)
		.setFooter(options.embed.footer)
		.setColor(options.embed.color);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	const think = await options.message.reply(embed);
	await think.edit({
		embed,
		components: [{ type: 1, components: [btn1] }],
	});
	const collector = new Discord.MessageCollector(
		options.message.channel,
		(m) => !m.author.bot,
		{ time: options.time },
	);
	collector.on('collect', async (msg) => {
		if (msg.author.id !== options.message.author.id) return;
		if (msg.content.toLowerCase().trim() === options.sentence.toLowerCase()) {
			const time = Date.now() - gameCreatedAt;
			const minute = (time / 1000 / 60) % 60;
			const wpm = msg.content.toLowerCase().trim().length / 5 / minute;
			const _embed = new Discord.MessageEmbed()
				.setDescription(
					options.winMessage
						.replace('{{time}}', convertTime(time))
						.replace('{{wpm}}', wpm.toFixed(2)),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply(_embed);
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			await think.edit({
				embed,
				components: [{ type: 1, components: [btn1] }],
			});
			collector.stop(msg.author.username);
			setTimeout(() => { msg.delete(); }, 10000);
			data.delete(options.message.author.id);
		} else {
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(`${options.loseMessage}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply(_embed);
			collector.stop(msg.author.username);
			data.delete(options.message.author.id);
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			await think.edit({
				embed,
				components: [{ type: 1, components: [btn1] }],
			});
			setTimeout(() => { msg.delete(); }, 10000);
		}
	});
	collector.on('end', async (_collected, reason) => {
		if (reason === 'time') {
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(`${options.loseMessage}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color)
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply(_embed).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			await think.edit({
				embed,
				components: [{ type: 1, components: [btn1] }],
			});
			data.delete(options.message.author.id);
			setTimeout(() => { think.delete(); }, 10000);
		}
	});

	const gameCollector = think.createButtonCollector((fn) => fn);
	gameCollector.on('collect', (button) => {
		if (button.clicker.user.id !== options.message.author.id) {
			return button.reply.send(
				options.othersMessage.replace('{{author}}', options.message.author.id),
				true,
			);
		}
		btn1 = new disbut.MessageButton()
			.setStyle('red')
			.setLabel(options.buttonText)
			.setDisabled()
			.setID(id);
		think.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1] }],
		});
		button.reply.send(options.cancelMessage, true);
		gameCollector.stop();
		setTimeout(() => { button.message.delete(); }, 10000);
		data.delete(options.message.author.id);
		return collector.stop();
	});
};
