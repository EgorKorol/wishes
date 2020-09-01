import React, { useContext } from "react";
import { FirebaseContext } from 'firebaseApi';
import EmailForm, { EmailFormData } from 'components/forms/EmailForm';
import SignFormWrapper from 'components/SignFormWrapper';

const SendResetLink = () => {
	const auth = useContext(FirebaseContext);

	const sendLink = async ({ email }: EmailFormData) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error.message);
    }
  };

	return (
		<SignFormWrapper title="Reset password">
			<EmailForm
				onSubmit={sendLink}
				buttonText="Send reset link"
			/>
		</SignFormWrapper>
	)
}

export default SendResetLink
