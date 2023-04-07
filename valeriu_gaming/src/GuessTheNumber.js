const data = new Set();
const db = require('quick.db');
const currentGames = new Object();
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

	const id =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	if (options.publicGame) {
		if (!options.ongoingMessage) {
			options.ongoingMessage =
				'A game is already runnning in <#{{channel}}>. You can\'t start a new one!';
		}
		if (typeof options.ongoingMessage !== 'string') {
			throw new TypeError('Weky Error: ongoingMessage must be a string.');
		}

		if (!options.returnWinner) options.returnWinner = false;
		if (typeof options.returnWinner !== 'boolean') {
			throw new TypeError('Weky Error: buttonText must be a boolean.');
		}
		const participants = [];
		if (currentGames[options.message.guild.id]) {
			const embed = new Discord.MessageEmbed()
				.setDescription(
					options.ongoingMessage.replace(
						/{{channel}}/g,
						currentGames[`${options.message.guild.id}_channel`],
					),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				embed.setTimestamp();
			}
			return options.message.reply(embed);
		}
		const embed = new Discord.MessageEmbed()
			.setDescription(
				`${options.embed.description.replace(
					/{{time}}/g,
					convertTime(options.time),
				)}`,
			)
			.setTitle(options.embed.title)
			.setFooter(options.embed.footer)
			.setColor(options.embed.color);
		if (options.embed.timestamp) {
			embed.setTimestamp();
		}
		let btn1 = new disbut.MessageButton()
			.setStyle('red')
			.setLabel(options.buttonText)
			.setID(id);
		const msg = await options.message.reply(embed);
		await msg.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1] }],
		});
		const gameCreatedAt = Date.now();
		const collector = new Discord.MessageCollector(
			options.message.channel,
			(m) => !m.author.bot,
			{ time: options.time },
		);
		const gameCollector = msg.createButtonCollector((fn) => fn);
		currentGames[options.message.guild.id] = true;
		currentGames[`${options.message.guild.id}_channel`] =
			options.message.channel.id;
		collector.on('collect', async (_msg) => {
			if (!participants.includes(_msg.author.id)) {
				participants.push(_msg.author.id);
			}
			if (isNaN(_msg.content)) {
				return;
			}
			const parsedNumber = parseInt(_msg.content, 10);
			if (parsedNumber === options.number) {
				const time = convertTime(Date.now() - gameCreatedAt);
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						`${options.winMessage.publicGame
							.replace(/{{number}}/g, options.number)
							.replace(/{{winner}}/g, _msg.author.id)
							.replace(/{{time}}/g, time)
							.replace(/{{totalparticipants}}/g, participants.length)
							.replace(
								/{{participants}}/g,
								participants.map((p) => '<@' + p + '>').join(', '),
							)}`,
					)
					.setTitle(options.embed.title)
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
				await msg.edit({
					embed,
					components: [{ type: 1, components: [btn1] }],
				});
				_msg.reply(_embed);
				gameCollector.stop();
				collector.stop();
				if (options.returnWinner) {
					if (!options.gameID) {
						throw new Error('Weky Error: gameID argument was not specified.');
					}
					if (typeof options.gameID !== 'string') {
						throw new TypeError('Weky Error: gameID must be a string.');
					}
					db.set(
						`GuessTheNumber_${options.message.guild.id}_${options.gameID}`,
						_msg.author.id,
					);
				}
			}
			if (parseInt(_msg.content) < options.number) {
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						options.bigNumberMessage
							.replace(/{{author}}/g, _msg.author.toString())
							.replace(/{{number}}/g, parsedNumber),
					)
					.setColor(options.embed.color);
				_msg.reply(_embed);
			}
			if (parseInt(_msg.content) > options.number) {
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						options.smallNumberMessage
							.replace(/{{author}}/g, _msg.author.toString())
							.replace(/{{number}}/g, parsedNumber),
					)
					.setColor(options.embed.color);
				_msg.reply(_embed);
			}
		});

		gameCollector.on('collect', (button) => {
			if (button.clicker.user.id !== options.message.author.id) {
				return button.reply.send(
					options.othersMessage.replace(
						/{{author}}/g,
						options.message.author.id,
					),
					true,
				);
			}
			button.reply.defer();
			if (button.id === id) {
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				gameCollector.stop();
				collector.stop();
				msg.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(
						options.loseMessage.replace(/{{number}}/g, options.number),
					)
					.setColor(options.embed.color)
					.setFooter(options.embed.footer);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				options.message.reply({
					embed: _embed,
				});
			}
		});
		collector.on('end', async (_collected, reason) => {
			delete currentGames[options.message.guild.id];
			if (reason === 'time') {
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(
						options.loseMessage.replace(/{{number}}/g, options.number),
					)
					.setColor(options.embed.color)
					.setFooter(options.embed.footer);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				await msg.edit({
					embed,
					components: [{ type: 1, components: [btn1] }],
				});
				return options.message.reply(_embed);
			}
		});
	} else {
		if (data.has(options.message.author.id)) return;
		data.add(options.message.author.id);
		const embed = new Discord.MessageEmbed()
			.setDescription(
				`${options.embed.description.replace(
					/{{time}}/g,
					convertTime(options.time),
				)}`,
			)
			.setTitle(options.embed.title)
			.setFooter(options.embed.footer)
			.setColor(options.embed.color);
		if (options.embed.timestamp) {
			embed.setTimestamp();
		}
		let btn1 = new disbut.MessageButton()
			.setStyle('red')
			.setLabel(options.buttonText)
			.setID(id);
		const msg = await options.message.reply(embed);
		await msg.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1] }],
		});
		const gameCreatedAt = Date.now();
		const collector = new Discord.MessageCollector(
			options.message.channel,
			(m) => !m.author.bot,
			{ time: options.time },
		);
		const gameCollector = msg.createButtonCollector((fn) => fn);
		collector.on('collect', async (_msg) => {
			if (_msg.author.id !== options.message.author.id) return;
			if (isNaN(_msg.content)) {
				return;
			}
			const parsedNumber = parseInt(_msg.content, 10);
			if (parsedNumber === options.number) {
				const time = convertTime(Date.now() - gameCreatedAt);
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						`${options.winMessage.privateGame
							.replace(/{{time}}/g, time)
							.replace(/{{number}}/g, options.number)}`,
					)
					.setTitle(options.embed.title)
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
				await msg.edit({
					embed,
					components: [{ type: 1, components: [btn1] }],
				});
				_msg.reply(_embed);
				gameCollector.stop();
				collector.stop();
				data.delete(options.message.author.id);
			}
			if (parseInt(_msg.content) < options.number) {
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						options.bigNumberMessage
							.replace(/{{author}}/g, _msg.author.toString())
							.replace(/{{number}}/g, parsedNumber),
					)
					.setColor(options.embed.color);
				_msg.reply(_embed);
			}
			if (parseInt(_msg.content) > options.number) {
				const _embed = new Discord.MessageEmbed()
					.setDescription(
						options.smallNumberMessage
							.replace(/{{author}}/g, _msg.author.toString())
							.replace(/{{number}}/g, parsedNumber),
					)
					.setColor(options.embed.color);
				_msg.reply(_embed);
			}
		});

		gameCollector.on('collect', (button) => {
			if (button.clicker.user.id !== options.message.author.id) {
				return button.reply.send(
					options.othersMessage.replace(
						/{{author}}/g,
						options.message.author.id,
					),
					true,
				);
			}
			button.reply.defer();
			if (button.id === id) {
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				gameCollector.stop();
				collector.stop();
				data.delete(options.message.author.id);
				msg.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(
						options.loseMessage.replace(/{{number}}/g, options.number),
					)
					.setColor(options.embed.color)
					.setFooter(options.embed.footer);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				options.message.reply({
					embed: _embed,
				});
			}
		});
		collector.on('end', async (_collected, reason) => {
			if (reason === 'time') {
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(
						options.loseMessage.replace(/{{number}}/g, options.number),
					)
					.setColor(options.embed.color)
					.setFooter(options.embed.footer);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				await msg.edit({
					embed,
					components: [{ type: 1, components: [btn1] }],
				});
				data.delete(options.message.author.id);
				return options.message.reply(_embed);
			}
		});
	}
};
