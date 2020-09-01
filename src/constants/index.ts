export enum ROUTES {
	root = '/',
	signIn = '/sign-in',
	signUp = '/sign-up',
	dashboard = '/dashboard',
	resetPassword = '/reset-password',
	updatePassword = '/update-password',
}

/**
 * FORM FIELDS VALIDATION
 */
export const MIN_PASSWORD_LENGTH = {
	minLength: {
		value: 6,
		message: 'Min length 6 characters'
	}
}
export const REQUIRED_FIELD = {
	required: {
		value: true,
		message: 'This field is required'
	}
}
export const EMAIL_VALIDATION = {
	pattern: {
		value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
		message: 'Please enter valid email'
	}
}
