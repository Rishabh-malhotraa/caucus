// configuration for pm2
// pm2 start ~/env/ecosystem.config.js --env production

module.exports = {
	apps: [
		{
			name: 'caucus-server',
			script: '/root/caucus/server/dist/index.js',
			watch: true,
			env: {
				PROD: '',
				CLIENT_URL: '',
				SERVER_URL: '',
				DATABASE_URL: '',
				GOOGLE_KEY_CLIENTID: '',
				GOOGLE_KEY_CLIENTSECRET: '',
				GITHUB_KEY_CLIENTID: '',
				GITHUB_KEY_CLIENTSECRET: '',
				COOKIE_KEYS: '',
				JDOODLE_CLIENTID: '',
				JDOOLDE_CLIENTSECRET: '',
				PORT: '',
			},
		},
		{
			name: 'caucus-crdt-server',
			script: 'npx y-websocket',
			watch: true,
		}
	],
};