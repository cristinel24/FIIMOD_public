const data = new Set();
const db = require('quick.db');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const {
	randomHexColor,
	getRandomString,
} = require('../functions/function');

const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../config/firm-circlet-331310-cead49aeb9dd");
const doc = new GoogleSpreadsheet('1F1b2fm3z0TyaovB8WElFpuh1oeu3Jt5HBL9vo7y3GdU')
async function login(doc) {
	await doc.useServiceAccountAuth(creds);
}
login(doc);

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

	const oppenent = options.opponent;
	const challenger = options.message.author;
	if (oppenent.bot || oppenent.id === challenger.id) return;
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
				.replace('{{challenger}}', challenger.id)
				.replace('{{opponent}}', oppenent.id),
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
		time: 60000,
	});
	Collector.on('collect', async (_btn) => {
		if (_btn.clicker.member.id !== oppenent.id) {
			return _btn.reply.send(
				options.othersMessage.replace('<@{{author}}>', `<@${oppenent.id}>`),
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
					options.cancelMessage.replace('{{opponent}}', oppenent.id),
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
			const challengerHealth = 100;
			const oppenentHealth = 100;
			const challengerLastAttack = 'heal';
			const oppenentLastAttack = 'heal';
			const gameData = [
				{
					member: challenger,
					health: challengerHealth,
					lastAttack: challengerLastAttack,
				},
				{
					member: oppenent,
					health: oppenentHealth,
					lastAttack: oppenentLastAttack,
				},
			];
			let player = Math.floor(Math.random() * gameData.length);
			gameData[player].health = 90;
			let btn1 = new MessageButton()
				.setLabel(options.buttons.hit)
				.setID(id1)
				.setStyle('red');
			let btn2 = new MessageButton()
				.setLabel(options.buttons.heal)
				.setID(id2)
				.setStyle('green');
			let btn3 = new MessageButton()
				.setLabel(options.buttons.cancel)
				.setID(id3)
				.setStyle('grey');
			let row = new MessageActionRow()
				.addComponent(btn1)
				.addComponent(btn2)
				.addComponent(btn3);
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.fightMessage.replace('{{player}}', gameData[player].member),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			question.edit({
				embed: _embed,
				components: row,
			});
			const checkHealth = (member) => {
				if (gameData[member].health <= 0) return true;
				else return false;
			};
			const gameCollector = question.createButtonCollector((fn) => fn);
			gameCollector.on('collect', async (msg) => {
				if (gameData.some((x) => x.member.id === msg.clicker.member.id)) {
					if (!checkHealth(player)) {
						const btn = msg.clicker.member;
						if (msg.id === id1) {
							if (btn.id !== gameData[player].member.id) {
								return msg.reply.send(options.opponentsTurnMessage, true);
							}
							msg.reply.defer();
							let randNumb =
								Math.floor(Math.random() * parseInt(options.dmgMax)) +
									parseInt(options.dmgMin) ||
								(Math.floor(Math.random() * 16) + 8);
							const tempPlayer = (player + 1) % 2;

							//if (gameData[tempPlayer].lastAttack === 'heal') {
							//	randNumb = Math.floor(randNumb / 2);
							//}
							gameData[tempPlayer].health -= randNumb;
							gameData[player].lastAttack = 'attack';
							if (gameData[player].member.id == options.message.author.id) {
								const __embed = new Discord.MessageEmbed()
									.setTitle(options.embed.title)
									.setDescription(
										`(:punch:) ${gameData[player].member.username} — ${gameData[player].health} HP - **versus** - **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP`,
									)
									.setFooter(options.embed.footer)
									.setColor(options.embed.color);
								if (options.embed.timestamp) {
									__embed.setTimestamp();
								}
								question.edit({
									embed: __embed,
									components: row,
								});
							} else if (gameData[player].member.id == options.opponent.id) {
								const __embed = new Discord.MessageEmbed()
									.setTitle(options.embed.title)
									.setDescription(
										`**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP - **versus** - ${gameData[player].member.username} — ${gameData[player].health} HP (:punch:)`,
									)
									.setFooter(options.embed.footer)
									.setColor(options.embed.color);
								if (options.embed.timestamp) {
									__embed.setTimestamp();
								}
								question.edit({
									embed: __embed,
									components: row,
								});
							}
							player = (player + 1) % 2;
						} else if (msg.id === id2) {
							if (btn.id !== gameData[player].member.id) {
								return msg.reply.send(options.opponentsTurnMessage, true);
							}
							if (gameData[player].health > 80) {
								return msg.reply.send(options.highHealthMessage, true);
							} else {
								msg.reply.defer();
								let randNumb =
									Math.floor(Math.random() * parseInt(options.healMax)) +
										parseInt(options.healMin) ||
									Math.floor(Math.random() * 10) + 8;
								const tempPlayer = (player + 1) % 2;
								//if (gameData[tempPlayer].lastAttack === 'heal') {
								//	randNumb = Math.floor(randNumb / 2);
								//}
								gameData[player].health += randNumb;
								gameData[player].lastAttack = 'heal';
								if (gameData[player].member.id == options.message.author.id) {
									const __embed = new Discord.MessageEmbed()
										.setTitle(options.embed.title)
										.setDescription(
											`(:hearts:) ${gameData[player].member.username} — ${gameData[player].health} HP - **versus** - **${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP`,
										)
										.setFooter(options.embed.footer)
										.setColor(options.embed.color);
									if (options.embed.timestamp) {
										__embed.setTimestamp();
									}
									question.edit({
										embed: __embed,
										components: row,
									});
								} else if (gameData[player].member.id == options.opponent.id) {
									const __embed = new Discord.MessageEmbed()
										.setTitle(options.embed.title)
										.setDescription(
											`**${gameData[tempPlayer].member.username}** — ${gameData[tempPlayer].health} HP - **versus** - ${gameData[player].member.username} — ${gameData[player].health} HP (:hearts:)`,
										)
										.setFooter(options.embed.footer)
										.setColor(options.embed.color);
									if (options.embed.timestamp) {
										__embed.setTimestamp();
									}
									question.edit({
										embed: __embed,
										components: row,
									});
								}
								player = (player + 1) % 2;
							}
						} else if (msg.id === id3) {
							if (btn.id !== gameData[player].member.id) {
								return msg.reply.send(options.opponentsTurnMessage, true);
							}
							if (gameData[player].health < 50) {
								return msg.reply.send(options.lowHealthMessage, true);
							} else {
								msg.reply.defer();
								btn1 = new MessageButton()
									.setLabel(options.buttons.hit)
									.setID(id1)
									.setStyle('red')
									.setDisabled();
								btn2 = new MessageButton()
									.setLabel(options.buttons.heal)
									.setID(id2)
									.setStyle('green')
									.setDisabled();
								btn3 = new MessageButton()
									.setLabel(options.buttons.cancel)
									.setID(id3)
									.setStyle('grey')
									.setDisabled();
								row = new MessageActionRow()
									.addComponent(btn1)
									.addComponent(btn2)
									.addComponent(btn3);
								gameCollector.stop();
								data.delete(options.opponent.id);
								data.delete(options.message.author.id);
								const __embed = new Discord.MessageEmbed()
									.setTitle(options.embed.title)
									.setDescription(
										options.cancelMessage.replace(
											'{{opponent}}',
											gameData[player].member.id,
										),
									)
									.setFooter(options.embed.footer)
									.setColor(options.embed.color);
								try {
									await doc.loadInfo();
									const sheet = doc.sheetsByIndex[1];
									const rows = await sheet.getRows();
									var okp1 = 0;
									var okp2 = 0;
									let winhaha = (player + 1) % 2;
									rows.forEach((row) => {
										if (row.id == gameData[winhaha].member.id) {
											row.win++; row.tag = gameData[winhaha].member.tag; okp1 = 1;
										}
										if (row.id == gameData[player].member.id) {
											row.lose++; row.tag = gameData[player].member.tag; okp2 = 1;
										}
										row.save();
									})
									if (!okp1) {
										await doc._rawSheets[117219461].addRows([{ id: gameData[winhaha].member.id, tag: gameData[winhaha].member.tag, win: 1, lose: 0 }]);
									}
									if (!okp2) {
										await doc._rawSheets[117219461].addRows([{ id: gameData[player].member.id, tag: gameData[player].member.tag, win: 0, lose: 1 }]);
									}
								} catch (e) {
									console.log(e);
								}
								if (options.embed.timestamp) {
									__embed.setTimestamp();
								}
								question.edit({
									embed: __embed,
									components: row,
								});
							}
						}
						if (checkHealth(player)) {
							btn1 = new MessageButton()
								.setLabel(options.buttons.hit)
								.setID(id1)
								.setStyle('red')
								.setDisabled();
							btn2 = new MessageButton()
								.setLabel(options.buttons.heal)
								.setID(id2)
								.setStyle('green')
								.setDisabled();
							btn3 = new MessageButton()
								.setLabel(options.buttons.cancel)
								.setID(id3)
								.setStyle('grey')
								.setDisabled();
							row = new MessageActionRow()
								.addComponent(btn1)
								.addComponent(btn2)
								.addComponent(btn3);
							gameCollector.stop();
							data.delete(options.opponent.id);
							data.delete(options.message.author.id);
							const tempPlayer = (player + 1) % 2;
							const __embed = new Discord.MessageEmbed()
								.setTitle(options.embed.title)
								.setDescription(
									options.winMessage.replace(
										'{{winner}}',
										gameData[tempPlayer].member.id,
									),
								)
								.setFooter(options.embed.footer)
								.setColor(options.embed.color);

							try {
								await doc.loadInfo();
								const sheet = doc.sheetsByIndex[1];
								const rows = await sheet.getRows();
								var okp1 = 0;
								var okp2 = 0;
								let losehaha = player % 2;
								rows.forEach((row) => {
									if (row.id == gameData[tempPlayer].member.id) {
										row.win++; row.tag = gameData[tempPlayer].member.tag; okp1 = 1;
									}
									if (row.id == gameData[losehaha].member.id) {
										row.lose++; row.tag = gameData[losehaha].member.tag; okp2 = 1;
									}
									row.save();
								})
								if (!okp1) {
									await doc._rawSheets[117219461].addRows([{ id: gameData[tempPlayer].member.id, tag: gameData[tempPlayer].member.tag, win: 1, lose: 0 }]);
								}
								if (!okp2) {
									await doc._rawSheets[117219461].addRows([{ id: gameData[losehaha].member.id, tag: gameData[losehaha].member.tag, win: 0, lose: 1 }]);
								}
							} catch (e) {
								console.log(e);
                            }

							if (options.embed.timestamp) {
								__embed.setTimestamp();
							}
							if (options.returnWinner) {
								if (!options.gameID) {
									throw new Error(
										'Error: gameID argument was not specified.',
									);
								}
								if (
									typeof options.gameID !== 'string'
								) {
									throw new TypeError(
										'Error: gameID must be a string.',
									);
								}
								db.set(
									`Fight_${options.message.guild.id}_${options.gameID}`,
									gameData[tempPlayer].member.id,
								);
							}
							question.edit({
								embed: __embed,
								components: row,
							});
						}
					} else {
						btn1 = new MessageButton()
							.setLabel(options.buttons.hit)
							.setID(id1)
							.setStyle('red')
							.setDisabled();
						btn2 = new MessageButton()
							.setLabel(options.buttons.heal)
							.setID(id2)
							.setStyle('green')
							.setDisabled();
						btn3 = new MessageButton()
							.setLabel(options.buttons.cancel)
							.setID(id3)
							.setStyle('grey')
							.setDisabled();
						gameCollector.stop();
						data.delete(options.opponent.id);
						data.delete(options.message.author.id);
						const tempPlayer = (player + 1) % 2;
						const __embed = new Discord.MessageEmbed()
							.setTitle(options.embed.title)
							.setDescription(
								options.winMessage.replace(
									'{{winner}}',
									gameData[tempPlayer].member.id,
								),
							)
							.setFooter(options.embed.footer)
							.setColor(options.embed.color);
						if (options.embed.timestamp) {
							__embed.setTimestamp();
						}
						if (options.returnWinner) {
							if (!options.gameID) {
								throw new Error(
									'Error: gameID argument was not specified.',
								);
							}
							if (typeof options.gameID !== 'string') {
								throw new TypeError('Error: gameID must be a string.');
							}
							db.set(
								`Fight_${options.message.guild.id}_${options.gameID}`,
								gameData[tempPlayer].member.id,
							);
						}
						question.edit({
							embed: __embed,
							components: row,
						});
					}
				} else {
					return msg.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							`<@${challenger.id}> and <@${oppenent.id}>`,
						),
						true,
					);
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
				.setDescription(options.endMessage.replace('{{opponent}}', oppenent.id))
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
			setTimeout(() => { g.delete(); }, 15000);

		}
	});
};
