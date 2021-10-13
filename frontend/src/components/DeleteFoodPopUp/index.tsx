import { Modal, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteFood } from '../../store/reducers/foodsReducer';
import { StyledBox, ButtonsWrapper, CancelButton, DeleteButton } from './style';

interface DeleteFoodPopUpProps {
  foodId: string;
  open: boolean;
  handleClose: () => void;
}

const DeleteFoodPopUp: FC<DeleteFoodPopUpProps> = ({
  foodId,
  open,
  handleClose,
}) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFood(foodId));
    handleClose();
  }

  const food: Food = useSelector((state: RootState) => state.foods.foods[foodId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography id="modal-modal-title" component="h2">
          Delete Food  {food.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          are you sure ?
        </Typography>
        <ButtonsWrapper>
          <CancelButton onClick={handleClose} variant="outlined">Cancel</CancelButton>
          <DeleteButton onClick={handleDelete} variant="outlined">Delete</DeleteButton>
        </ButtonsWrapper>
      </StyledBox>
    </Modal>
  );
};

export default DeleteFoodPopUp;