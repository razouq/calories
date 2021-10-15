import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { StyledLink } from './style';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';
import AdminLinks from './AdminLinks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
// import { RootState } from '../../store';

const Navbar: FC = () => {
  const user = useSelector((state: RootState) => state.users.user);

  const renderUserLinks = () => {
    if (user?.role === 'admin') return <AdminLinks />;
    else if (user?.role === 'user') return <UserLinks />;
    else return <GuestLinks />;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">CALORIES</StyledLink> 
          </Typography>
          {renderUserLinks()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;