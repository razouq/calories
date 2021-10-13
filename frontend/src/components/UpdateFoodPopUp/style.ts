import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components'

export const StyledBox = styled(Box)`
  position: absolute;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  background-color: white;
  border: 2px solid blue;
  border-radius: 1rem;
  box-shadow: 24px;
`;

export const CancelButton = styled(Button)`
  color: gray;
  border-color: gray;
  &:hover {
    border-color: gray;
    color: white;
    background-color: gray;
  }
`;
export const UpdateButton = styled(Button)`
  color: blue;
  border-color: blue;
  margin-left: 1rem;
  &:hover {
    color: white;
    background-color: blue;
    border-color: blue;
  }
`;

export const ButtonsWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: end;
`;

export const StyledTextField = styled(TextField)`
  margin: 1rem 0;
`;

export const DatePickerWrapper = styled.div`
  margin: 1rem 0;
`;