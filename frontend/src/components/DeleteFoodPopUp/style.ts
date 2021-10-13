import { Button } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components'

export const StyledBox = styled(Box)`
  position: absolute;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border: 2px solid red;
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
export const DeleteButton = styled(Button)`
  color: red;
  border-color: red;
  margin-left: 1rem;
  &:hover {
    color: white;
    background-color: red;
    border-color: red
  }
`;

export const ButtonsWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: end;
`;