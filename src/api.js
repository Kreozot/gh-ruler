const axios = require('axios');

const instance = axios.create({});

async function get(...query) {
	const result = await instance.get(...query);
	return result.data;
}

async function post(...query) {
	const result = await instance.post(...query);
	return result.data;
}

module.exports = {
	axios: instance,
	get,
	post,
};
