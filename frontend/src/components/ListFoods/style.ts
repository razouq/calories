import styled from 'styled-components';
import {Button, Container} from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledContainer = styled(Container)`
  margin-top: 2rem;
`;

export const DeleteButton = styled(Button)`
  color: red;
  border-color: red;
  margin: .3rem;
  &:hover {
    border-color: red;
    background-color: red;
    color: white
  }
`;

export const ShowButton = styled(Button)`
  color: green;
  border-color: green;
  margin: .3rem;
  &:hover {
    border-color: green;
    background-color: green;
    color: white
  }
`;

export const UpdateButton = styled(Button)`
  margin: .3rem;
  &:hover {
    border-color: blue;
    background-color: blue;
    color: white
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
