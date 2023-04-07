const data = new Set();
const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const {
	randomHexColor,
	getRandomString,
} = require('../functions/function');

module.exports = async (options) => {

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

	const id3 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id4 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id5 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id6 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id7 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	let score = 0;
	const width = 15;
	const height = 10;
	const gameBoard = [];
	let inGame = false;
	let snakeLength = 1;
	const apple = { x: 0, y: 0 };
	let snake = [{ x: 0, y: 0 }];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			gameBoard[y * width + x] = options.emojis.empty;
		}
	}

	function gameBoardToString() {
		let str = '';
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (x == apple.x && y == apple.y) {
					str += options.emojis.food;
					continue;
				}
				let flag = true;
				for (let s = 0; s < snake.length; s++) {
					if (x == snake[s].x && y == snake[s].y) {
						str += options.emojis.snakeBody;
						flag = false;
					}
				}
				if (flag) {
					str += gameBoard[y * width + x];
				}
			}
			str += '\n';
		}
		return str;
	}

	function isLocInSnake(pos) {
		return snake.find((sPos) => sPos.x == pos.x && sPos.y == pos.y);
	}

	function newappleLoc() {
		let newapplePos = {
			x: 0,
			y: 0,
		};
		do {
			newapplePos = {
				x: parseInt(Math.random() * width),
				y: parseInt(Math.random() * height),
			};
		} while (isLocInSnake(newapplePos));
		apple.x = newapplePos.x;
		apple.y = newapplePos.y;
	}

	function step(msg) {
		if (apple.x == snake[0].x && apple.y == snake[0].y) {
			score += 1;
			snakeLength++;
			newappleLoc();
		}

		const editEmbed = new Discord.MessageEmbed()
			.setColor(options.embed.color)
			.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
			.setTitle(options.embed.title)
			.setFooter(options.embed.footer)
			.setDescription(gameBoardToString());
		if (options.embed.timestamp) {
			editEmbed.setTimestamp();
		}
		lock1 = new MessageButton()
			.setLabel('\u200b')
			.setStyle('gray')
			.setID(id1)
			.setDisabled();
		w = new MessageButton()
			.setEmoji(options.emojis.up)
			.setStyle('blurple')
			.setID(id2);
		lock2 = new MessageButton()
			.setLabel('\u200b')
			.setStyle('gray')
			.setID(id7)
			.setDisabled();
		a = new MessageButton()
			.setEmoji(options.emojis.right)
			.setStyle('blurple')
			.setID(id3);
		s = new MessageButton()
			.setEmoji(options.emojis.down)
			.setStyle('blurple')
			.setID(id4);
		d = new MessageButton()
			.setEmoji(options.emojis.left)
			.setStyle('blurple')
			.setID(id5);
		stopy = new MessageButton()
			.setLabel(options.buttonText)
			.setStyle('red')
			.setID(id6);

		msg.edit({
			embed: editEmbed,
			components: [
				{
					type: 1,
					components: [lock1, w, lock2, stopy],
				},
				{
					type: 1,
					components: [a, s, d],
				},
			],
		});
	}

	function gameOver(m) {
		lock1 = new MessageButton()
			.setLabel('\u200b')
			.setStyle('gray')
			.setID(id1)
			.setDisabled();

		lock2 = new MessageButton()
			.setLabel('\u200b')
			.setStyle('gray')
			.setID(id7)
			.setDisabled();
		w = new MessageButton()
			.setEmoji(options.emojis.up)
			.setStyle('blurple')
			.setID(id2)
			.setDisabled();
		a = new MessageButton()
			.setEmoji(options.emojis.right)
			.setStyle('blurple')
			.setID(id3)
			.setDisabled();
		s = new MessageButton()
			.setEmoji(options.emojis.down)
			.setStyle('blurple')
			.setID(id4)
			.setDisabled();
		d = new MessageButton()
			.setEmoji(options.emojis.left)
			.setStyle('blurple')
			.setID(id5)
			.setDisabled();
		stopy = new MessageButton()
			.setLabel(options.buttonText)
			.setStyle('red')
			.setID(id6)
			.setDisabled();
		inGame = false;

		const editEmbed = new Discord.MessageEmbed()
			.setColor(options.embed.color)
			.setAuthor(options.message.member.user.tag, options.message.member.user.avatarURL())
			.setTitle(options.embed.title)
			.setFooter(options.embed.footer)
			.setDescription(options.embed.description.replace('{{score}}', score));
		if (options.embed.timestamp) {
			editEmbed.setTimestamp();
		}

		m.edit({
			embed: editEmbed,
			components: [
				{
					type: 1,
					components: [lock1, w, lock2, stopy],
				},
				{
					type: 1,
					components: [a, s, d],
				},
			],
		});
	}

	if (inGame) return;
	inGame = true;
	score = 0;
	snakeLength = 1;
	snake = [{ x: 5, y: 5 }];
	newappleLoc();
	const embed = new Discord.MessageEmbed()
		.setColor(options.embed.color)
		.setTitle(options.embed.title)
		.setFooter(options.embed.footer)
		.setDescription(gameBoardToString());
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}

	let lock1 = new MessageButton()
		.setLabel('\u200b')
		.setStyle('gray')
		.setID(id1)
		.setDisabled();
	let w = new MessageButton()
		.setEmoji(options.emojis.up)
		.setStyle('blurple')
		.setID(id2);
	let lock2 = new MessageButton()
		.setLabel('\u200b')
		.setStyle('gray')
		.setID(id7)
		.setDisabled();
	let a = new MessageButton()
		.setEmoji(options.emojis.right)
		.setStyle('blurple')
		.setID(id3);
	let s = new MessageButton()
		.setEmoji(options.emojis.down)
		.setStyle('blurple')
		.setID(id4);
	let d = new MessageButton()
		.setEmoji(options.emojis.left)
		.setStyle('blurple')
		.setID(id5);
	let stopy = new MessageButton()
		.setLabel(options.buttonText)
		.setStyle('red')
		.setID(id6);
	options.message.reply(embed).then(async (m) => {
		m.edit({
			embed: embed,
			components: [
				{
					type: 1,
					components: [lock1, w, lock2, stopy],
				},
				{
					type: 1,
					components: [a, s, d],
				},
			],
		});
		const collector = m.createButtonCollector((fn) => fn);
		collector.on('collect', async (btn) => {
			if (btn.clicker.user.id !== options.message.author.id) {
				return btn.reply.send(
					options.othersMessage.replace(
						'{{author}}',
						options.message.author.id,
					),
					true,
				);
			}
			btn.reply.defer();
			const snakeHead = snake[0];
			const nextPos = {
				x: snakeHead.x,
				y: snakeHead.y,
			};
			if (btn.id === id3) {
				let nextX = snakeHead.x - 1;
				if (nextX < 0) {
					nextX = width - 1;
				}
				nextPos.x = nextX;
			} else if (btn.id === id2) {
				let nextY = snakeHead.y - 1;
				if (nextY < 0) {
					nextY = height - 1;
				}
				nextPos.y = nextY;
			} else if (btn.id === id4) {
				let nextY = snakeHead.y + 1;
				if (nextY >= height) {
					nextY = 0;
				}
				nextPos.y = nextY;
			} else if (btn.id === id5) {
				let nextX = snakeHead.x + 1;
				if (nextX >= width) {
					nextX = 0;
				}
				nextPos.x = nextX;
			} else if (btn.id === id6) {
				gameOver(m);
				collector.stop();
				setTimeout(() => { m.delete(); }, 10000);
				options.message.delete();
				data.delete(options.message.author.id);
			}

			if (isLocInSnake(nextPos)) {
				gameOver(m);
				collector.stop();
				setTimeout(() => { m.delete(); }, 10000);
				data.delete(options.message.author.id);
			} else {
				snake.unshift(nextPos);
				if (snake.length > snakeLength) {
					snake.pop();
				}
				step(m);
			}
		});
	});
};
