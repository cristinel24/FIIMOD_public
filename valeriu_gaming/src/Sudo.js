const Discord = require('discord.js');

module.exports = async (options) => {

	const webhooks = await options.message.channel.fetchWebhooks();
	const webhook = webhooks.first();
	if (!webhook) {
		options.message.channel
			.createWebhook(options.member.nickname || options.member.user.username, {
				avatar: options.member.user.displayAvatarURL(),
			})
			.then(async (_webhook) => {
				await _webhook.send(Discord.Util.removeMentions(options.text));
				if (options.deleteMessage) {
					options.message.delete();
				}
			});
	} else {
		await webhook.send(Discord.Util.removeMentions(options.text), {
			username: options.member.nickname || options.member.user.username,
			avatarURL: options.member.user.displayAvatarURL(),
		});
		if (options.deleteMessage) {
			options.message.delete();
		}
	}
};
