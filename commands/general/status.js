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
        query.info("208.103.169.207", 27015, 2000)
            .then(async function(response){
                await response
                console.log(response)
                query.close
                return message.say(response)
            })
            .catch(console.log)
	}
};