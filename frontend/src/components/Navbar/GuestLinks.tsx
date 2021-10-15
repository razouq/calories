import { FC } from 'react';
import Button from '@mui/material/Button';
import { StyledLink } from './style';

const GuestLinks: FC = () => {
  return (
    <Button color="inherit">
      <StyledLink to="/login">Login</StyledLink>
    </Button>
  );
};

export default GuestLinks;
