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
    client.user.setActivity('the waiting game...');
});

client.on('error', console.error);

let players = null, status = "online"
setInterval(() => {
    query.info(ip, 27015, 2000)
        .then(data => {
			if ((data.name == "Error") && (status !== "dnd")) {
				client.user.setStatus("dnd");
				client.user.setActivity("on offline mode")
				status = "dnd";
			} else {
				if ((data.playersnum == data.maxplayers) && (status !== "idle")) {
					client.user.setStatus("idle")
					status = "idle";
				} else if (status !== "online") {
					client.user.setStatus("online")
					status = "online";
				}
				if (players !== data.playersnum) {
					client.user.setActivity(`with ${data.playersnum} players`)
					players = data.playersnum;
				}
			}
        })
		.catch(console.error)
}, 15000);

client.login(process.env.TOKEN);