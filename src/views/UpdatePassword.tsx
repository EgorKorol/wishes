import React, { useContext } from "react";
import { FirebaseContext } from 'firebaseApi';
import { useLocation, useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/index';
import qs from 'qs';
import SignFormWrapper from 'components/SignFormWrapper';
import PasswordForm, { PasswordFormData } from 'components/forms/PasswordForm';

const UpdatePassword = () => {
	const auth = useContext(FirebaseContext);
	const location = useLocation();
	const history = useHistory();

	const updatePassword = async ({ password }: PasswordFormData) => {
    try {
      await auth.confirmPasswordReset(qs.parse(location.search).oobCode, password);
			history.push(ROUTES.signIn);
    } catch (error) {
      console.log(error.message);
    }
  };

	return (
		<SignFormWrapper title="New password">
			<PasswordForm
				onSubmit={updatePassword}
				buttonText="Create new password"
			/>
		</SignFormWrapper>
	)
}

export default UpdatePassword
