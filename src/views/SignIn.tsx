import React, { useContext } from 'react';
import { ROUTES } from 'constants/index';
import { useHistory, NavLink } from 'react-router-dom';
import { FirebaseContext } from 'firebaseApi';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import SignFormWrapper from 'components/SignFormWrapper';
import EmailPasswordForm, { EmailPasswordFormData } from 'components/forms/EmailPasswordForm';

const SignIn = () => {
  const auth = useContext(FirebaseContext)
  const history = useHistory();

  const signIn = async ({ email, password }: EmailPasswordFormData) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push(ROUTES.dashboard);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SignFormWrapper title="Sign in">
      <EmailPasswordForm
        onSubmit={signIn}
        hasAutocomplete
        buttonText="Sign in"
      />
      <Grid container>
        <Grid item xs>
          <Link
            component={NavLink}
            variant="body2"
            color="textPrimary"
            to={ROUTES.resetPassword}
          >
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={NavLink}
            variant="body2"
            color="textPrimary"
            to={ROUTES.signUp}
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </SignFormWrapper>
  );
}

export default SignIn;
