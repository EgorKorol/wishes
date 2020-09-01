import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useForm, FieldError } from "react-hook-form";
import { DeepMap } from 'react-hook-form/dist/types/utils';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';
import { REQUIRED_FIELD, MIN_PASSWORD_LENGTH, EMAIL_VALIDATION } from 'constants/index';

interface EmailPasswordFormProps {
	buttonText: string;
	isLoading?: boolean;
	hasAutocomplete?: boolean;
	onSubmit: (payload: EmailPasswordFormData) => void;
}

export interface EmailPasswordFormData {
  email: string;
  password: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
  }),
);

const getHelperText = (
	name: keyof EmailPasswordFormData,
	errors: DeepMap<Record<string, any>, FieldError>
): string => {
	return errors && errors[name] && errors[name].message;
};

const EmailPasswordForm: FC<EmailPasswordFormProps> = ({ buttonText, isLoading, onSubmit, hasAutocomplete }) => {
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm<EmailPasswordFormData>();

	const emitFormData = (data: EmailPasswordFormData) => {
		onSubmit(data);
	};

	return (
		<form
			className={classes.form}
			noValidate
			onSubmit={handleSubmit(emitFormData)}
		>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Email Address"
				name="email"
				autoComplete={hasAutocomplete ? "email" : 'none'}
				autoFocus
				disabled={isLoading}
				inputRef={register({ ...REQUIRED_FIELD, ...EMAIL_VALIDATION })}
				helperText={getHelperText('email', errors)}
				error={!!errors['email']}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountIcon />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				autoComplete={hasAutocomplete ? "current-password" : 'none'}
				disabled={isLoading}
				inputRef={register({ ...REQUIRED_FIELD, ...MIN_PASSWORD_LENGTH })}
				helperText={getHelperText('password', errors)}
				error={!!errors['password']}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<LockIcon />
						</InputAdornment>
					),
				}}
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				{isLoading && <CircularProgress size={24} color="inherit" />}
				{!isLoading && buttonText}
			</Button>
		</form>
	)
}

export default EmailPasswordForm;
