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

	let tries = 0;
	const array = [];
	let remaining = 0;
	const guessed = [];
	if (options.words.join('').length > options.charGenerated) {
		options.charGenerated = options.words.join('').length - 1;
	}
	for (let i = 0; i < options.charGenerated; i++) {
		array.push(
			'abcdefghijklmnopqrstuvwxyz'.charAt(
				Math.floor(Math.random() * 'abcdefghijklmnopqrstuvwxyz'.length),
			),
		);
	}
	options.words.forEach((e) => {
		array.splice(Math.floor(Math.random() * array.length), 0, e);
	});
	const arr = array.join('');
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			options.embed.description.replace('{{time}}', convertTime(options.time)),
		)
		.addField(options.embed.field1, array.join(''))
		.addField(options.embed.field2, `0/${options.words.length}`)
		.setFooter(options.embed.footer)
		.setColor(options.embed.color);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	let btn1 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.buttonText)
		.setID(id);
	const mes = await options.message.inlineReply(embed);
	await mes.edit({
		embed,
		components: [{ type: 1, components: [btn1] }],
	});
	const gameCreatedAt = Date.now();
	const filter = (m) => m.author.id === options.message.author.id;
	const game = await options.message.channel.createMessageCollector(filter, {
		time: options.time,
	});
	game.on('collect', async (msg) => {
		const condition =
			options.words.includes(msg.content.toLowerCase()) &&
			!guessed.includes(msg.content.toLowerCase());
		if (condition) {
			remaining++;
			const pos = array.indexOf(msg.content.toLowerCase());
			array.splice(pos, 1);
			guessed.push(msg.content.toLowerCase());
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.embed.description.replace(
						'{{time}}',
						convertTime(options.time),
					),
				)
				.addField(options.embed.field1, array.join(''))
				.addField(options.embed.field3, `${guessed.join(', ')}`)
				.addField(options.embed.field2, `${remaining}/${options.words.length}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setID(id);
			mes.edit({
				embed: _embed,
				components: [{ type: 1, components: [btn1] }],
			});
			if (remaining === options.words.length) {
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				mes.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				const time = convertTime(Date.now() - gameCreatedAt);
				const __embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.addField(options.embed.field1, arr)
					.setDescription(options.winMessage.replace('{{time}}', time))
					.addField(options.embed.field4, `${options.words.join(', ')}`)
					.setFooter(options.embed.footer)
					.setColor(options.embed.color);
				if (options.embed.timestamp) {
					__embed.setTimestamp();
				}
				options.message.inlineReply({
					embed: __embed,
				});
				data.delete(options.message.author.id);
				return game.stop();
			}
			const __embed = new Discord.MessageEmbed()
				.setFooter(options.embed.footer)
				.setDescription(
					`${options.correctWordMessage
						.replace('{{word}}', msg.content.toLowerCase())
						.replace('{{remaining}}', options.words.length - remaining)}`,
				)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				__embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: __embed,
			});
		} else {
			tries++;
			if (tries === options.maxTries) {
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(options.loseMessage)
					.addField(options.embed.field1, arr)
					.addField(options.embed.field4, `${options.words.join(', ')}`)
					.setFooter(options.embed.footer)
					.setColor(options.embed.color);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				mes.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				options.message.inlineReply({
					embed: _embed,
				});
				data.delete(options.message.author.id);
				return game.stop();
			}
			const _embed = new Discord.MessageEmbed()
				.setFooter(options.embed.footer)
				.setDescription(
					`${options.wrongWordMessage.replace(
						'{{remaining_tries}}',
						`${options.maxTries - tries}`,
					)}`,
				)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: _embed,
			});
		}
	});
	game.on('end', (msg, reason) => {
		if (reason === 'time') {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(options.loseMessage)
				.addField(options.embed.field1, arr)
				.addField(options.embed.field4, `${options.words.join(', ')}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			mes.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			data.delete(options.message.author.id);
			options.message.inlineReply(_embed);
		}
	});

	const gameCollector = mes.createButtonCollector((fn) => fn);
	gameCollector.on('collect', (button) => {
		if (button.clicker.user.id !== options.message.author.id) {
			return button.reply.send(
				options.othersMessage.replace('{{author}}', options.message.author.id),
				true,
			);
		}
		button.reply.defer();
		btn1 = new disbut.MessageButton()
			.setStyle('red')
			.setLabel(options.buttonText)
			.setDisabled()
			.setID(id);
		mes.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1] }],
		});
		const _embed = new Discord.MessageEmbed()
			.setTitle(options.embed.title)
			.setDescription(options.loseMessage)
			.addField(options.embed.field1, arr)
			.addField(options.embed.field4, `${options.words.join(', ')}`)
			.setFooter(options.embed.footer)
			.setColor(options.embed.color);
		if (options.embed.timestamp) {
			_embed.setTimestamp();
		}
		options.message.inlineReply(_embed);
		data.delete(options.message.author.id);
		gameCollector.stop();
		return game.stop();
	});
};
