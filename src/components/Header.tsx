import React, { FC, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { FirebaseContext } from 'firebaseApi';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ROUTES } from 'constants/index';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

interface HeaderProps {
	isAuthenticated: boolean;
}

const PublicUserActions: FC = () => {
	return (
		<>
			<Button
				component={NavLink}
				color="inherit"
				to={ROUTES.signIn}
			>
				Sign In
			</Button>
			<Button
				component={NavLink}
				color="inherit"
				to={ROUTES.signUp}
			>
				Sign Up
			</Button>
		</>
	)
}

const PrivateUserActions: FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const auth = useContext(FirebaseContext);
	const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
	};
	
	const logOut = async () => {
		await auth.signOut();
		closeMenu();
	}
	
	const goToDashboard = () => {
		history.push(ROUTES.dashboard);
		closeMenu();
	}

	return (
		<div>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				onClose={closeMenu}
			>
				<MenuItem onClick={goToDashboard}>Dashboard</MenuItem>
				<MenuItem onClick={logOut}>Log Out</MenuItem>
			</Menu>
		</div>
	)
}

const Header: FC<HeaderProps> = ({ isAuthenticated }) => {
  const classes = useStyles();

  return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					<Link
						component={NavLink}
						to={ROUTES.root}
						color="inherit"
						underline="none"
					>
						Wishes
					</Link>
				</Typography>
				{
					isAuthenticated
						? <PrivateUserActions />
						: <PublicUserActions />
				}
			</Toolbar>
		</AppBar>
  );
}

export default Header
