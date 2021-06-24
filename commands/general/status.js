const {Command} = require('discord.js-commando');
const query = require("source-server-query");

function serverStatus(){
    return query.info("208.103.169.207", 27015, 2000)
    .then(console.log)
    .catch(console.log)
    .then(query.close);
}

module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'status',
			group: 'general',
			memberName: 'status',
			description: 'Replies with server status.',
		});
	}

	run(message) {
        var status = await serverStatus()
		return message.say(status)
	}
};