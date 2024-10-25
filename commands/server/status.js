const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const query = require("source-server-query");
const ip = process.env.SERVER_IP, port = parseInt(process.env.SERVER_PORT)

module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			group: 'server',
			memberName: 'status',
			description: 'Replies with server status',
		});
	}
 
    run(message) {
        query
            .info(ip, port, 2000)
            .then(data => {
                var embed = {
                    color: 0x2ecc71,
                    title: ":bee: SERVER STATUS",
                    fields: [
                        {
                            name: "Server Name",
                            value: data.name,
                            inline: false,
                        },
                        {
                            name: "Player Count",
                            value: `${data.playersnum}/${data.maxplayers}`,
                            inline: true,
                        },
                        {
                            name: "Server Map",
                            value: data.map,
                            inline: true,
                        },
                        {
                            name: "Connect Link",
                            value: `steam://connect/${ip}:${port}/`,
                            inline: false,
                        },
                    ],
                    footer: {
                        text: message.author.tag
                    },
                    timestamp: new Date(),
                }

                if (data.playersmum == data.maxplayers) {
                    embed.color = 0xf39c12;
                }

                if (data.name == "Error") {
                    embed.color = 0xe74c3c
                    embed.fields = []
                    embed.description = "Server offline - connection timed out!";
                }

                return message.embed(embed)
            })
            .catch(console.error)
            .then(query.close)
	}
};