const {CommandoClient} = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	commandPrefix: process.env.PREFIX,
	owner: process.env.OWNERS
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'Essential and basic commands.']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('error', console.error);

client.login(process.env.TOKEN);