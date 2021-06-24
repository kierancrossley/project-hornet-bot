const {CommandoClient} = require('discord.js-commando');
const path = require('path');
const query = require("source-server-query");
const ip = process.env.SERVER_IP, port = parseInt(process.env.SERVER_PORT)

const client = new CommandoClient({
	commandPrefix: process.env.PREFIX,
	owner: process.env.OWNERS
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['general', 'Essential and basic commands.'],
		['server', 'Server information commands.']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('on Hornet DarkRP');
});

client.on('error', console.error);

let players = null;
setInterval(() => {
    query.info(ip, "1", 2000)
        .then(data => {
			if (data.name == "Error") {
				client.user.setStatus("dnd", "Server offline!");
			} else {
				if (data.playersmum == data.maxplayers) {
					client.user.setStatus("idle");
				} else {
					client.user.setStatus("online");
				}
				client.user.setActivity(`with ${data.playersnum} players`);
			}

			players = data.playersnum;
			console.log(players)
        })
		.catch(console.error)
}, 5000);

client.login(process.env.TOKEN);