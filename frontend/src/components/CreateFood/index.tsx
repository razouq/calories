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

const CreateFood: FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      calories: 0,
      date: null,
    },
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
                  renderInput={(params) => <TextField fullWidth {...params} />}
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