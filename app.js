const fs = require("fs");
var path = require('path');

const { token, clientId } = require('./config.json');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let allTheMups = require(__dirname + '/MupsData/mup_counter.json');

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const { REST } = require('@discordjs/rest'	);
const { Routes } = require('discord.js');
const rest = new REST({ version: '10'}).setToken(token);

const commands = [];
const slashCommands = require(__dirname +'\\Commands\\shaunCommands.js');

commands.push(slashCommand.data.toJSON());
client.commands.set(slashCommand.data.name, slashCommand);


(async () => {
	try {
			await rest.put(
				Routes.applicationCommands(clientId), {
					body: commands
				},
			);
			console.log('Successfully registered application commands globally');
		 
	} catch (error) {
		if (error) console.error(error);
	}
})();

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
