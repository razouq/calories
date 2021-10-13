import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Modal, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateFood } from '../../store/reducers/foodsReducer';
import { Controller, useForm } from 'react-hook-form';
import {
  StyledBox,
  ButtonsWrapper,
  CancelButton,
  UpdateButton,
  StyledTextField,
  DatePickerWrapper,
} from './style';

interface UpdateFoodPopUpProps {
  foodId: string;
  open: boolean;
  handleClose: () => void;
}

const UpdateFoodPopUp: FC<UpdateFoodPopUpProps> = ({
  foodId,
  open,
  handleClose,
}) => {
  const food: Food = useSelector(
    (state: RootState) => state.foods.foods[foodId]
  );
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    console.log('values', values);
    dispatch(updateFood({ ...values, _id: food._id }));
    handleClose();
  };

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: food.name,
      calories: food.calories,
      date: food.date,
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography id="modal-modal-title" component="h2">
          Update Food
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            {...register('name')}
            label="Name"
            variant="outlined"
            fullWidth
          />
          <StyledTextField
            {...register('calories')}
            label="Calories"
            variant="outlined"
            fullWidth
            type="number"
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerWrapper>
                  <DatePicker
                    {...field}
                    label="Birth Date"
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </DatePickerWrapper>
              </LocalizationProvider>
            )}
          />
          <ButtonsWrapper>
            <CancelButton onClick={handleClose} variant="outlined">
              Cancel
            </CancelButton>
            <UpdateButton type="submit" variant="outlined">
              Update
            </UpdateButton>
          </ButtonsWrapper>
        </form>
      </StyledBox>
    </Modal>
  );
};

export default UpdateFoodPopUp;