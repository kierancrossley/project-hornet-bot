const {Command} = require('discord.js-commando');
const query = require("source-server-query");

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
        var status = "Offline"
		query.info("208.103.169.207", 27015, 2000)
			.then(function(response){
                status = response
                console.log(response);
            })
			.catch(console.log)
			.then(query.close);
        return message.say(status)
	}
};