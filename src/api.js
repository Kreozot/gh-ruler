const axios = require('axios');

const instance = axios.create({});

async function get(...query) {
	try {
		const result = await instance.get(...query);
		return result.data;
	} catch (err) {
		throw new Error(err.message);
	}
}

async function post(...query) {
	try {
		const result = await instance.post(...query);
		return result.data;
	} catch (err) {
		throw new Error(err.message);
	}
}

module.exports = {
	axios: instance,
	get,
	post,
};
