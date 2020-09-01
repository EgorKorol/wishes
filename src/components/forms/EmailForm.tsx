import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useForm, FieldError } from "react-hook-form";
import { DeepMap } from 'react-hook-form/dist/types/utils';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';
import { REQUIRED_FIELD, EMAIL_VALIDATION } from 'constants/index';

interface EmailFormProps {
	buttonText: string;
	isLoading?: boolean;
	onSubmit: (payload: EmailFormData) => void;
}

export interface EmailFormData {
  email: string;
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
	name: keyof EmailFormData,
	errors: DeepMap<Record<string, any>, FieldError>
): string => {
	return errors && errors[name] && errors[name].message;
};

const EmailForm: FC<EmailFormProps> = ({ buttonText, isLoading, onSubmit }) => {
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm<EmailFormData>();

	const emitFormData = (data: EmailFormData) => {
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
				autoComplete="email"
				autoFocus
				disabled={isLoading}
				inputRef={register({ ...REQUIRED_FIELD, ...EMAIL_VALIDATION })}
				helperText={getHelperText('email', errors)}
				error={!!errors['email']}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<EmailIcon />
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

export default EmailForm
