import { FC } from 'react';
import Button from '@mui/material/Button';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from '../../store/reducers/usersReducer';
import { StyledLink } from './style';

const UserLinks: FC = () => {
  // const dispatch = useDispatch();
  // const onClickLogout = () => {
    // dispatch(logoutUser());
  // };
  return (
    <>
      <Button color="inherit">
        <StyledLink to="/create-food">Create Food</StyledLink>
      </Button>
      <Button color="inherit">
        <StyledLink to="/">List Foods</StyledLink>
      </Button>
      <Button color="inherit">
        <StyledLink to="/invite-friend">Invite Friend</StyledLink>
      </Button>
      {/* <Button color="inherit" onClick={onClickLogout}>
        Logout
      </Button> */}
    </>
  );
};

export default UserLinks;