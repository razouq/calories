import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Container } from '@mui/material';
import { DatePickerWrapper, StyledTextField } from './style';
import { createFood } from '../../store/reducers/foodsReducer';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
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

const initialValues = {
  name: '',
  calories: 0,
  date: null,
};

const CreateFood: FC = () => {
  const dispatch = useDispatch();
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

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(createFood(data));
  };

  return (
    <Container>
      <h1>Create Food</h1>
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
                  label="Date"
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
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </Container>
  );
};

export default CreateFood;
