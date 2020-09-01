import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ROUTES } from 'constants/index';
import { FirebaseContext } from 'firebaseApi';
import PrivateRoute from 'components/PrivateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from 'components/Header';

const SignIn = lazy(() => import("views/SignIn"));
const SignUp = lazy(() => import("views/SignUp"));
const SendResetLink = lazy(() => import("views/SendResetLink"));
const UpdatePassword = lazy(() => import("views/UpdatePassword"));
const Dashboard = lazy(() => import("views/Dashboard"));

export default function App() {
  const auth = useContext(FirebaseContext)
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser: firebase.User | null) => {
      setUser(firebaseUser);
    })
  }, [auth, setUser]);

  const isAuthenticated = !!user;

  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="app">
        <Header isAuthenticated={isAuthenticated} />
        <Switch>
          <Route exact path={ROUTES.root}>
            <h1>Public content</h1>
          </Route>
          {
            isAuthenticated && (
              <PrivateRoute path={ROUTES.dashboard} isAuthenticated={isAuthenticated}>
                <Suspense fallback={"Loading..."}>
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            )
          }
          <Route path={ROUTES.signIn}>
            <Suspense fallback={"Loading..."}>
              <SignIn />
            </Suspense>
          </Route>
          <Route path={ROUTES.resetPassword}>
            <Suspense fallback={"Loading..."}>
              <SendResetLink />
            </Suspense>
          </Route>
          <Route path={ROUTES.updatePassword}>
            <Suspense fallback={"Loading..."}>
              <UpdatePassword />
            </Suspense>
          </Route>
          <Route path={ROUTES.signUp}>
            <Suspense fallback={"Loading..."}>
              <SignUp />
            </Suspense>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
