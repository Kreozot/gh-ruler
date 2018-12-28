import URI from 'urijs';
import uniqBy from 'lodash.uniqby';
import { Store } from 'svelte/store';
import Home from './components/Home';
import { get } from './api';

function getReposFromUrl() {
	const url = new URI(window.location);
	let { repos } = url.search(true);
	if (repos) {
		if (typeof repos === 'string') {
			repos = [repos];
		}
		getReposInfo(repos);
		return uniqBy(repos.map((slug) => {
			const [owner, name] = slug.trim().split('/');
			return {
				slug,
				owner,
				name,
				url: `https://github.com/${ owner }/${ name }`
			};
		}), 'slug');
	}
}

function getReposFromLocalStorage() {
	try {
		return JSON.parse(localStorage.getItem('repos')) || [];
	} catch (error) {
		console.warn('Unable to load data from local storage');
	}
}

const repos = getReposFromUrl() || getReposFromLocalStorage() || [];

const storeData = {
	Page: Home,
	repos,
};

const store = new Store(storeData);

async function getReposInfo(repos) {
	const result = await get('/api/repos', {
		params: {
			repos
		}
	});
	store.set({ repos: result });
}

store.on('state', ({ current }) => {
	if (typeof current.repos !== 'undefined') {
		localStorage.setItem('repos', JSON.stringify(current.repos));
	}
});

export function addRepo(newRepo) {
	const { repos } = store.get();
	store.set({
		repos: uniqBy([
			...repos,
			newRepo,
		], 'slug')
	});
}

export function replaceRepo(slug, newRepo) {
	const { repos } = store.get();
	const index = repos.findIndex((repo) => (repo.slug === slug));
	if (index >= 0) {
		store.set({
			repos: [
				...repos.slice(0, index),
				newRepo,
				...repos.slice(index + 1),
			]
		});
	}
}

export function removeRepo(slug) {
	const { repos } = store.get();
	const index = repos.findIndex((repo) => (repo.slug === slug));
	if (index >= 0) {
		store.set({
			repos: [
				...repos.slice(0, index),
				...repos.slice(index + 1),
			]
		});
	}
}

export function clearRepos() {
	store.set({
		repos: []
	});
}

export default store;
