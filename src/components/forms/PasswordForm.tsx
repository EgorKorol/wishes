import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useForm, FieldError } from "react-hook-form";
import { DeepMap } from 'react-hook-form/dist/types/utils';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CircularProgress from '@material-ui/core/CircularProgress';
import { REQUIRED_FIELD, MIN_PASSWORD_LENGTH } from 'constants/index';

interface PasswordFormProps {
	buttonText: string;
	isLoading?: boolean;
	onSubmit: (payload: PasswordFormData) => void;
}

export interface PasswordFormData {
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
	name: keyof PasswordFormData,
	errors: DeepMap<Record<string, any>, FieldError>
): string => {
	return errors && errors[name] && errors[name].message;
};

const PasswordForm: FC<PasswordFormProps> = ({ buttonText, isLoading, onSubmit }) => {
	const classes = useStyles();
	const { register, handleSubmit, errors } = useForm<PasswordFormData>();

	const emitFormData = (data: PasswordFormData) => {
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
				name="password"
				label="Password"
				type="password"
				autoComplete="current-password"
				disabled={isLoading}
				inputRef={register({ ...REQUIRED_FIELD, ...MIN_PASSWORD_LENGTH })}
				helperText={getHelperText('password', errors)}
				error={!!errors['password']}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<VpnKeyIcon />
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

export default PasswordForm
