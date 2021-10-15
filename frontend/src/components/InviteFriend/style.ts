import { Paper, TextField, Button } from '@mui/material';
import styled from 'styled-components';


export const StyledPaper = styled(Paper)`
  width: 50rem;
  margin: 2rem auto;
  padding: 2rem;
`;

export const StyledTextField = styled(TextField)`
  margin: 1rem;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const StyledButton = styled(Button)`
  margin: 1rem;
`;

export const ServerErrorsList = styled.ul``;
export const ServerError = styled.li`
  color: red;
`;