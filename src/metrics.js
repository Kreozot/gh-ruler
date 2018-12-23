const YANDEX_COUNTER_ID = 51643955;

export const GOAL_REPO_ADD = 'repo-add';
export const GOAL_REPO_REMOVE = 'repo-remove';
export const GOAL_REPO_CLEAR = 'repo-clear';
export const GOAL_REPO_GET_URL = 'get-url';

export function addMetric(metricId, params) {
	try {
		ym(YANDEX_COUNTER_ID, 'reachGoal', metricId, params);
	} catch(err) {
		console.error(err);
	}
}
