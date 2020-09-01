import React, { useContext } from "react";
import { FirebaseContext } from 'firebaseApi';
import { useHistory, NavLink } from 'react-router-dom';
import { ROUTES } from 'constants/index';
import Link from '@material-ui/core/Link';
import SignFormWrapper from 'components/SignFormWrapper';
import EmailPasswordForm, { EmailPasswordFormData } from 'components/forms/EmailPasswordForm';
import Box from '@material-ui/core/Box';

const SignUp = () => {
  const auth = useContext(FirebaseContext);
  const history = useHistory();

  const signUp = async ({ email, password }: EmailPasswordFormData) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push(ROUTES.dashboard);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SignFormWrapper title="Sign up">
      <EmailPasswordForm
        onSubmit={signUp}
        buttonText="Sign up"
      />
      <Box component="div" textAlign="center">
        <Link
          component={NavLink}
          variant="body2"
          color="textPrimary"
          to={ROUTES.signIn}
        >
          Already have an account? Sign In
        </Link>
      </Box>
      {/* <Grid container>
        <Grid item>
        </Grid>
      </Grid> */}
    </SignFormWrapper>
  );
};

export default SignUp;
