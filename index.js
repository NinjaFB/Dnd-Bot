const dotenv = require('dotenv');
dotenv.config();

const prefix = '!';

const ytdl = require('ytdl-core');

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on('message', async message => {

	const member = message.member;
	console.log(member.id);
	console.log(message.member.user.username);
	console.log(message.member.user.tag);
	console.log(message.member.user.id);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	// ...
	// Using the new `command` variable, this makes it easier to manage!
	// You can switch your other commands to this format as well
	if (command === 'ping') {
		message.channel.send('Pong.');
	}
	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'play') {
		if (message.member.user.id === '339289155198648320' || message.member.user.id === '552013354575724545' || message.member.user.id === '500866581543387176') {
			if (!args.length) {
				return message.channel.send('You didn\'t tell me what to play,');
			}
			else if (message.member.voice.channel) {
				message.channel.send(`Playing ${args}`);
				const connection = await message.member.voice.channel.join();
				connection.play(ytdl(`${args}`, { filter: 'audioonly' }));
			}
		}
		else {
			return message.channel.send('U not allowed to play songs');
		}
	}
});
