import Navigo from 'navigo';
import Home from './components/Home';
import store from './store';

const router = new Navigo();

function changePage(Page) {
	store.set({ Page });
}

router.on({
	'/': {
		as: 'Home',
		uses: () => changePage(Home)
	},
})
	.resolve();

export default router;
