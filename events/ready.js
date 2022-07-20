module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Mup bot is on!\nLogged in as ${client.user.tag}`);
	},
};