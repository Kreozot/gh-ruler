import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/relax.css';

const NOTY_DEFAULTS = {
	theme: 'relax',
	timeout: 3000,
};

export function showSuccess(text) {
	new Noty({
		...NOTY_DEFAULTS,
		type: 'success',
		text,
	}).show();
}

export function showError(text) {
	new Noty({
		...NOTY_DEFAULTS,
		type: 'error',
		text,
	}).show();
}
