import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import GuestLinks from './GuestLinks';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import UserLinks from './UserLinks';

const Navbar: FC = () => {
  // const user = useSelector((state: RootState) => state.users.user);

  // const renderUserLinks = () => {
    // if (user === false) return <GuestLinks />;
    // else if (user == null) return null;
    // else return <UserLinks />;
  // };

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
            CALORIES
          </Typography>
          {/* {renderUserLinks()} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;