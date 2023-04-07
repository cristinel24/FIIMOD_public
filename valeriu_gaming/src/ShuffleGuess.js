const data = new Set();
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const {
	convertTime,
	shuffleString,
	randomHexColor,
	getRandomString,
	getRandomSentence,
} = require('../functions/function');

module.exports = async (options) => {
	options.word = getRandomSentence(1);
	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

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

	const word = shuffleString(options.word.toString());
	let disbut = new MessageButton()
		.setLabel(options.button.reshuffle)
		.setID(id1)
		.setStyle('green');
	let cancel = new MessageButton()
		.setLabel(options.button.cancel)
		.setID(id2)
		.setStyle('red');
	let row = new MessageActionRow().addComponent(disbut).addComponent(cancel);
	const emd = new Discord.MessageEmbed()
		.setColor(options.embed.color)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setTitle(options.embed.title)
		.setFooter(options.embed.footer)
		.setDescription(
			options.startMessage
				.replace('{{word}}', word)
				.replace('{{time}}', convertTime(options.time)),
		);
	if (options.embed.timestamp) {
		emd.setTimestamp();
	}
	const embed = await options.message.reply({
		embed: emd,
	});
	const gameCreatedAt = Date.now();
	embed.edit({
		embed: emd,
		component: row,
	});
	const filter = (m) => m.author.id === options.message.author.id;
	const gameCollector = options.message.channel.createMessageCollector(filter, {
		time: options.time,
		errors: ['time'],
	});
	gameCollector.on('collect', async (msg) => {
		if (msg.content.toLowerCase() === options.word.toString()) {
			gameCollector.stop();
			embed.delete();
			data.delete(options.message.author.id);
			disbut = new MessageButton()
				.setLabel(options.button.reshuffle)
				.setID(id1)
				.setStyle('green')
				.setDisabled();
			cancel = new MessageButton()
				.setLabel(options.button.cancel)
				.setID(id2)
				.setStyle('red')
				.setDisabled();
			row = new MessageActionRow().addComponent(disbut).addComponent(cancel);
			const time = convertTime(Date.now() - gameCreatedAt);
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setColor(options.embed.color)
				.setFooter(options.embed.footer)
				.setDescription(
					options.winMessage
						.replace('{{word}}', options.word.toString())
						.replace('{{time}}', time),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply(_embed).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });;
			embed.edit({
				embed: emd,
				component: row,
			});
		} else {
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(
					options.incorrectMessage
						.replace('{{author}}', msg.author.toString())
						.replace('{{answer}}', msg.content.toLowerCase()),
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply(_embed).then((m) => m.delete({ timeout: 2000 }));
		}
	});
	const GameCollector = embed.createButtonCollector((fn) => fn);
	GameCollector.on('collect', (btn) => {
		if (btn.clicker.user.id !== options.message.author.id) {
			return btn.reply.send(
				options.othersMessage.replace('{{author}}', options.message.author.id),
				true,
			);
		}
		btn.reply.defer();
		if (btn.id === id1) {
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setColor(options.embed.color)
				.setTitle(options.embed.title)
				.setFooter(options.embed.footer)
				.setDescription(
					options.startMessage
						.replace('{{word}}', shuffleString(options.word.toString()))
						.replace('{{time}}', convertTime(options.time)),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			return embed.edit({
				embed: _embed,
				component: row,
			});
		} else if (btn.id === id2) {
			gameCollector.stop();
			data.delete(options.message.author.id);
			disbut = new MessageButton()
				.setLabel(options.button.reshuffle)
				.setID(id1)
				.setStyle('green')
				.setDisabled();
			cancel = new MessageButton()
				.setLabel(options.button.cancel)
				.setID(id2)
				.setStyle('red')
				.setDisabled();
			row = new MessageActionRow().addComponent(disbut).addComponent(cancel);
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setColor(options.embed.color)
				.setTitle(options.embed.title)
				.setFooter(options.embed.footer)
				.setDescription(
					options.loseMessage.replace('{{answer}}', options.word.toString()),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			return embed.edit({
				embed: _embed,
				component: row,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
		}
	});
	gameCollector.on('end', async (_collected, reason) => {
		if (reason === 'time') {
			disbut = new MessageButton()
				.setLabel(options.button.reshuffle)
				.setID(id1)
				.setStyle('green')
				.setDisabled();
			cancel = new MessageButton()
				.setLabel(options.button.cancel)
				.setID(id2)
				.setStyle('red')
				.setDisabled();
			row = new MessageActionRow().addComponent(disbut).addComponent(cancel);
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setColor(options.embed.color)
				.setFooter(options.embed.footer)
				.setDescription(
					options.loseMessage.replace('{{answer}}', options.word.toString()),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply(_embed);
			data.delete(options.message.author.id);
			return embed.edit({
				embed: emd,
				component: row,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
		}
	});
};
