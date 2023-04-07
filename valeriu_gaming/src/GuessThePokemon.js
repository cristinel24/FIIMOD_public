const gameData = new Set();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

	if (gameData.has(options.message.author.id)) return;
	gameData.add(options.message.author.id);

	const id =
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
	const { data } = await fetch(
		'https://fun-api.sujalgoel.engineer/pokemon',
	).then((res) => res.json());
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	let btn1 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.buttonText)
		.setID(id);
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
		.setDescription(
			options.embed.description
				.replace('{{type}}', data.types.join(', '))
				.replace('{{abilities}}', data.abilities.join(', '))
				.replace('{{time}}', convertTime(options.time)),
		)
		.setColor(options.embed.color)
		.setImage(data.HiddenImage)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think.edit({
		embed: embed,
		components: [{ type: 1, components: [btn1] }],
	});
	const gameCreatedAt = Date.now();
	const collector = new Discord.MessageCollector(
		options.message.channel,
		(m) => !m.author.bot,
		{ time: options.time },
	);
	collector.on('collect', async (msg) => {
		if (msg.author.id !== options.message.author.id) return;
		if (msg.content.toLowerCase() === data.name) {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(
					options.winMessage
						.replace(
							'{{answer}}',
							data.name.charAt(0).toUpperCase() + data.name.slice(1),
						)
						.replace('{{time}}', convertTime(Date.now() - gameCreatedAt)),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({
				embed: _embed,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });;
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			await think.edit({
				embed,
				components: [{ type: 1, components: [btn1] }],
			});
			collector.stop();
			think.delete();
			setTimeout(() => { msg.delete(); }, 10000);
			gameData.delete(options.message.author.id);
		} else {
			const _embed = new Discord.MessageEmbed()
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(
					options.incorrectMessage
						.replace('{{answer}}', msg.content.toLowerCase())
						.replace('{{author}}', msg.author.toString()),
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({
				embed: _embed,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
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
		button.reply.defer();
		if (button.id === id) {
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			gameCollector.stop();
			collector.stop();
			think.delete();
			setTimeout(() => { button.message.delete(); }, 10000);
			gameData.delete(options.message.author.id);
			think.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({
				embed: _embed,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
		}
	});
	collector.on('end', async (_msg, reason) => {
		if (reason === 'time') {
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			gameCollector.stop();
			collector.stop();
			think.delete();
			setTimeout(() => { _msg.delete(); }, 10000);
			gameData.delete(options.message.author.id);
			think.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({
				embed: _embed,
			}).then(msg => { setTimeout(() => { msg.delete(); }, 10000) });
		}
	});
};
