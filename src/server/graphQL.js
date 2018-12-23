const axios = require('axios');

const TOKEN = process.env.GITHUB_API_TOKEN;
if (!TOKEN) {
	throw new Error('Missing GITHUB_API_TOKEN environment variable');
}
const URL = 'https://api.github.com/graphql';

const instance = axios.create({
	baseURL: URL
});

instance.defaults.headers.common['Authorization'] = `Bearer ${ TOKEN }`;

async function query(queryData) {
	const result = await instance({
		method: 'post',
		data: {
			query: queryData
		}
	});
	return result.data;
}

module.exports = {
	axios: instance,
	query,
};
