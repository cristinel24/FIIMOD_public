const data = new Set();
const db = require('quick.db');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const {
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

	if (data.has(options.message.author.id) || data.has(options.opponent.id)) {
		return;
	}
	data.add(options.message.author.id);
	data.add(options.opponent.id);

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

	const id3 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	if (
		options.opponent.bot ||
		options.opponent.id === options.message.author.id
	) {
		return;
	}
	let acceptbutton = new MessageButton()
		.setStyle('green')
		.setLabel(options.buttons.accept)
		.setID('accept');
	let denybutton = new MessageButton()
		.setStyle('red')
		.setLabel(options.buttons.deny)
		.setID('deny');
	let component = new MessageActionRow().addComponent([
		acceptbutton,
		denybutton,
	]);
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			options.acceptMessage
				.replace('{{challenger}}', options.message.author.id)
				.replace('{{opponent}}', options.opponent.id),
		)
		.setFooter(options.embed.footer)
		.setColor(options.embed.color);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	const question = await options.message.reply({
		embed,
	});
	question.edit({
		embed,
		component,
	});
	const Collector = await question.createButtonCollector((fn) => fn, {
		time: options.time,
	});
	Collector.on('collect', async (_btn) => {
		if (_btn.clicker.member.id !== options.opponent.id) {
			return _btn.reply.send(
				options.othersMessage.replace(
					'<@{{author}}>',
					`<@${options.opponent.id}>`,
				),
				true,
			);
		}
		_btn.reply.defer();
		if (_btn.id === 'deny') {
			acceptbutton = new MessageButton()
				.setDisabled()
				.setStyle('green')
				.setLabel(options.buttons.accept)
				.setID('accept');
			denybutton = new MessageButton()
				.setDisabled()
				.setStyle('red')
				.setLabel(options.buttons.deny)
				.setID('deny');
			component = new MessageActionRow().addComponent([
				acceptbutton,
				denybutton,
			]);
			const emd = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.cancelMessage.replace('{{opponent}}', options.opponent.id),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				emd.setTimestamp();
			}
			Collector.stop();
			data.delete(options.opponent.id);
			data.delete(options.message.author.id);
			return question.edit({
				embed: emd,
				component,
			});
		} else if (_btn.id === 'accept') {
			Collector.stop();
			let scissorsbtn = new MessageButton()
				.setID(id1)
				.setLabel(options.buttons.scissors)
				.setStyle('blurple')
				.setEmoji('✌️');
			let rockbtn = new MessageButton()
				.setID(id2)
				.setLabel(options.buttons.rock)
				.setStyle('blurple')
				.setEmoji('✊');
			let paperbtn = new MessageButton()
				.setID(id3)
				.setLabel(options.buttons.paper)
				.setStyle('blurple')
				.setEmoji('✋');
			let row = new MessageActionRow()
				.addComponent(rockbtn)
				.addComponent(paperbtn)
				.addComponent(scissorsbtn);
			const emd = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(options.embed.description)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				emd.setTimestamp();
			}
			question.edit({
				embed: emd,
				component: row,
			});
			let opponentChose;
			let opponentChoice;
			let challengerChose;
			let challengerChoice;
			const collector = question.createButtonCollector((fn) => fn, {
				time: options.time,
			});
			collector.on('collect', async (button) => {
				if (
					button.clicker.member.id !== options.opponent.id &&
					button.clicker.member.id !== options.message.author.id
				) {
					return button.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							`<@${options.message.author.id}> and <@${options.opponent.id}>`,
						),
						true,
					);
				}
				if (button.clicker.user.id === options.message.author.id) {
					challengerChose = true;
					if (typeof challengerChoice !== 'undefined') {
						return button.reply.send(options.noChangeMessage, true);
					}
					if (button.id === id2) {
						challengerChoice = '✊';
						button.reply.defer();
						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					} else if (button.id === id3) {
						challengerChoice = '✋';
						button.reply.defer();

						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					} else if (button.id === id1) {
						challengerChoice = '✌️';
						button.reply.defer();

						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					}
				} else if (button.clicker.user.id === options.opponent.id) {
					opponentChose = true;
					if (typeof opponentChoice !== 'undefined') {
						return button.reply.send(options.noChangeMessage, true);
					}
					if (button.id === id2) {
						opponentChoice = '✊';
						button.reply.defer();

						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					} else if (button.id === id3) {
						opponentChoice = '✋';
						button.reply.defer();

						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					} else if (button.id === id1) {
						opponentChoice = '✌️';
						button.reply.defer();

						if (challengerChose && opponentChose === true) {
							let result;
							if (challengerChoice === opponentChoice) {
								result = options.drawMessage;
							} else if (
								(opponentChoice === '✌️' && challengerChoice === '✋') ||
								(opponentChoice === '✊' && challengerChoice === '✌️') ||
								(opponentChoice === '✋' && challengerChoice === '✊')
							) {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.opponent.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.opponent.id,
								);
							} else {
								if (options.returnWinner) {
									if (!options.gameID) {
										throw new Error(
											'Weky Error: gameID argument was not specified.',
										);
									}
									if (typeof options.gameID !== 'string') {
										throw new TypeError('Weky Error: gameID must be a string.');
									}
									db.set(
										`RockPaperScissors_${options.message.guild.id}_${options.gameID}`,
										options.message.author.id,
									);
								}
								result = options.winMessage.replace(
									'{{winner}}',
									options.message.author.id,
								);
							}
							scissorsbtn = new MessageButton()
								.setDisabled()
								.setID(id1)
								.setLabel(options.buttons.scissors)
								.setStyle('blurple')
								.setEmoji('✌️');
							rockbtn = new MessageButton()
								.setDisabled()
								.setID(id2)
								.setLabel(options.buttons.rock)
								.setStyle('blurple')
								.setEmoji('✊');
							paperbtn = new MessageButton()
								.setDisabled()
								.setID(id3)
								.setLabel(options.buttons.paper)
								.setStyle('blurple')
								.setEmoji('✋');
							row = new MessageActionRow()
								.addComponent(rockbtn)
								.addComponent(paperbtn)
								.addComponent(scissorsbtn);
							const _embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setColor(options.embed.color)
								.setDescription(result)
								.addFields(
									{
										name: options.message.author.username,
										value: challengerChoice,
										inline: true,
									},
									{
										name: options.opponent.username,
										value: opponentChoice,
										inline: true,
									},
								)
								.setFooter(options.embed.footer);
							if (options.embed.timestamp) {
								_embed.setTimestamp();
							}
							collector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							return question.edit({
								embed: _embed,
								component: row,
							});
						}
					}
				}
			});
			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					scissorsbtn = new MessageButton()
						.setDisabled()
						.setID(id1)
						.setLabel(options.buttons.scissors)
						.setStyle('blurple')
						.setEmoji('✌️');
					rockbtn = new MessageButton()
						.setDisabled()
						.setID(id2)
						.setLabel(options.buttons.rock)
						.setStyle('blurple')
						.setEmoji('✊');
					paperbtn = new MessageButton()
						.setDisabled()
						.setID(id3)
						.setLabel(options.buttons.paper)
						.setStyle('blurple')
						.setEmoji('✋');
					row = new MessageActionRow()
						.addComponent(rockbtn)
						.addComponent(paperbtn)
						.addComponent(scissorsbtn);
					const _embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setDescription(options.timeEndMessage)
						.setFooter(options.embed.footer)
						.setColor(options.embed.color);
					if (options.embed.timestamp) {
						_embed.setTimestamp();
					}
					data.delete(options.opponent.id);
					data.delete(options.message.author.id);
					return question.edit({
						embed: _embed,
						component: row,
					});
				}
			});
		}
	});

	Collector.on('end', async (msg, reason) => {
		if (reason === 'time') {
			acceptbutton = new MessageButton()
				.setDisabled()
				.setStyle('green')
				.setLabel(options.buttons.accept)
				.setID('accept');
			denybutton = new MessageButton()
				.setDisabled()
				.setStyle('red')
				.setLabel(options.buttons.deny)
				.setID('deny');
			component = new MessageActionRow().addComponent([
				acceptbutton,
				denybutton,
			]);
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.endMessage.replace('{{opponent}}', options.opponent.id),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			data.delete(options.opponent.id);
			data.delete(options.message.author.id);
			return question.edit({
				embed: _embed,
				component,
			});
		}
	});
};