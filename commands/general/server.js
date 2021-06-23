const query = require("source-server-query");
const {Command} = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'meow',
			group: 'general',
			memberName: 'meow',
			description: 'Replies with a meow, kitty cat.',
		});
	}

	run(message) {
		return message.say('Meow!');
	}
};

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
			.then(console.log)
			.catch(console.log)
			.then(query.close)
			.then(message.say('Meow!'));
	}
};