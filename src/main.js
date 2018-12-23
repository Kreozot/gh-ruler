import 'babel-polyfill';
import './assets/global.css';
import App from './App.html';
import store from './store';
import './router';

const app = new App({
	target: document.body,
	store
});

window.app = app;

export default app;
