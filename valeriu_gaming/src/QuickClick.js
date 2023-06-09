const currentGames = new Object();
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	shuffleArray,
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

	if (currentGames[options.message.guild.id]) {
		const embed = new Discord.MessageEmbed()
			.setTitle(options.embed.title)
			.setColor(options.embed.color)
			.setFooter(options.embed.footer)
			.setDescription(
				options.ongoingMessage.replace(
					'{{channel}}',
					currentGames[`${options.message.guild.id}_channel`],
				),
			);
		if (options.embed.timestamp) {
			embed.setTimestamp();
		}
		return options.message.channel.send(embed);
	}
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setColor(options.embed.color)
		.setFooter(options.embed.footer)
		.setDescription(options.waitMessage);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	options.message.reply(embed).then((msg) => {
		currentGames[options.message.guild.id] = true;
		currentGames[`${options.message.guild.id}_channel`] =
			options.message.channel.id;
		setTimeout(async function() {
			const gameCreatedAt = Date.now();
			const buttons = [];
			const rows = [];
			for (let i = 0; i < 24; i++) {
				buttons.push(
					new disbut.MessageButton()
						.setDisabled()
						.setLabel('\u200b')
						.setStyle('blurple')
						.setID(
							getRandomString(20) +
								'-' +
								getRandomString(20) +
								'-' +
								getRandomString(20) +
								'-' +
								getRandomString(20),
						),
				);
			}
			buttons.push(
				new disbut.MessageButton()
					.setStyle('blurple')
					.setEmoji(options.emoji)
					.setID('CORRECT'),
			);
			shuffleArray(buttons);
			for (let i = 0; i < 5; i++) {
				rows.push(new disbut.MessageActionRow());
			}
			rows.forEach((row, i) => {
				row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setColor(options.embed.color)
				.setFooter(options.embed.footer)
				.setDescription(
					options.startMessage.replace('{{time}}', convertTime(options.time)),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			await msg.edit({
				embed: _embed,
				components: rows,
			});
			const Collector = await msg.createButtonCollector((fn) => fn, {
				time: options.time,
			});
			Collector.on('collect', async (button) => {
				if (button.id === 'CORRECT') {
					button.reply.defer();
					Collector.stop();
					setTimeout(() => { button.message.delete(); }, 15000);
					buttons.forEach((element) => {
						element.setDisabled();
					});
					rows.length = 0;
					for (let i = 0; i < 5; i++) {
						rows.push(new disbut.MessageActionRow());
					}
					rows.forEach((row, i) => {
						row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
					});
					const __embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setDescription(
							options.winMessage
								.replace('{{winner}}', button.clicker.user.id)
								.replace('{{time}}', (Date.now() - gameCreatedAt) / 1000),
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						__embed.setTimestamp();
					}
					await msg.edit({
						embed: __embed,
						components: rows,
					});
				}
				return delete currentGames[options.message.guild.id];
			});
			Collector.on('end', async (_msg, reason) => {
				if (reason === 'time') {
					buttons.forEach((element) => {
						element.setDisabled();
					});
					rows.length = 0;
					for (let i = 0; i < 5; i++) {
						rows.push(new disbut.MessageActionRow());
					}
					rows.forEach((row, i) => {
						row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
					});
					const __embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setColor(options.embed.color)
						.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
						.setFooter(options.embed.footer)
						.setDescription(options.loseMessage);
					if (options.embed.timestamp) {
						__embed.setTimestamp();
					}
					await msg.edit({
						embed: __embed,
						components: rows,
					});
					setTimeout(() => { msg.delete(); }, 15000);

					return delete currentGames[options.message.guild.id];
				}
			});
		}, Math.floor(Math.random() * 5000) + 1000);
	});
};
