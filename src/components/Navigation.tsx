import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/index'

interface NavigationProps {
	isAuthenticated: boolean;
	logOut: () => void;
}

const Navigation: FC<NavigationProps> = ({ isAuthenticated, logOut }) => {
	const logOutEmit = () => {
		logOut()
	}

	return (
		<nav>
			<ul>
				{
					isAuthenticated
						? (
							<>
								<li>
									<Link to={ROUTES.dashboard}>Dashboard</Link>
								</li>
								<li>
									<button type="button" onClick={logOutEmit}>Log out</button>
								</li>
							</>
						)
						: (
							<>
								<li>
									<Link to={ROUTES.signIn}>Log In</Link>
								</li>
								<li>
									<Link to={ROUTES.signUp}>Sign Up</Link>
								</li>
							</>
						)
				}
			</ul>
		</nav>
	)
}

export default Navigation
