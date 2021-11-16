import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Link as LinkUI,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { login, logout } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Router from 'next/router';

const NavBar: () => JSX.Element = () => {
  const [user, loading, error] = useAuthState(getAuth());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log('user', user);
    console.log('loading', loading);
    console.log('error', error);
  }, [user, loading, error]);

  const menuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const loginHandler = async () => {
    try {
      await login();
    } catch (err) {
      console.log('err', err);
    }
  };

  const logoutHandler = async () => {
    closeHandler();
    await logout();
  };

  const newArticleHandler = () => {
    closeHandler();
    Router.push('/articles/create');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <LinkUI color="#FFF" href="/">
                Vet Nursing Education
              </LinkUI>
            </Link>
          </Typography>
          {!user && (
            <Button onClick={loginHandler} color="inherit">
              Login
            </Button>
          )}
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={menuHandler}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={closeHandler}
              >
                <MenuItem onClick={closeHandler}>Profile</MenuItem>
                <MenuItem onClick={closeHandler}>My account</MenuItem>
                <MenuItem onClick={newArticleHandler}>Create new article</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
