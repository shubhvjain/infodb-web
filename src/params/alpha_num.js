/** @type {import('@sveltejs/kit').ParamMatcher} */
// import { LDBS_check_DB_exists } from '$lib';
export function match(param) {
	return /^[a-zA-Z0-9_-]+$/.test(param) // alphanumeric with dash and underscore

}

