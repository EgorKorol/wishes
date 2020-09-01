import React, { FC, ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ROUTES } from 'constants/index'

interface PrivateRouteProps {
	children: ReactNode;
	isAuthenticated: boolean;
	path: string;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute: FC<PrivateRouteProps> = ({ children, ...rest }) => {
	return (
		<Route
      {...rest}
      render={
				({ location }) => rest.isAuthenticated
					? (children)
					: (<Redirect to={{ pathname: ROUTES.signIn, state: { from: location } }} />)
      }
    />
	)
}

export default PrivateRoute
