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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    calories: yup
      .number()
      .positive('calories must be a positive number')
      .required(),
    date: yup.date().required(),
  })
  .required();

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

  const initialValues = {
    name: food.name,
    calories: food.calories,
    date: food.date,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
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
            error={!!errors.name}
            helperText={errors.name && errors?.name?.message}
          />
          <StyledTextField
            {...register('calories')}
            label="Calories"
            variant="outlined"
            fullWidth
            type="number"
            error={!!errors.calories}
            helperText={errors.calories && errors?.calories?.message}
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
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors.date}
                        helperText={errors.date && errors?.date?.message}
                      />
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
