import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Autocomplete, Button, Container } from '@mui/material';
import { DatePickerWrapper, StyledTextField } from './style';
import { createFood } from '../../store/reducers/foodsReducer';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @ts-ignore: Unreachable code error
import * as nutritionix from 'nutritionix-api';
import axios, { AxiosResponse } from 'axios';

nutritionix.init('603ff044', 'c170d466a095d2a40720b9c98cbe8a21');

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    calories: yup
      .number()
      .positive('calories must be a positive number')
      .required('calories is required!'),
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
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(createFood(data));
  };

  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const data = { query: term };
    const headers = {
      'x-app-key': 'c170d466a095d2a40720b9c98cbe8a21',
      'x-app-id': '603ff044',
    };
    const search = async () => {
      const response: AxiosResponse = await axios.post(
        'https://trackapi.nutritionix.com/v2/search/instant',
        data,
        { headers }
      );

      // @ts-ignore: Unreachable code error
      setResults(response.data.branded as []);
    };
    if (term !== '') search();
  }, [debouncedTerm]);

  return (
    <Container>
      <h1>Create Food</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={(field) => (
            <Autocomplete
              {...field}
              disablePortal
              id="combo-box-demo"
              options={results.map((result: any) => result?.food_name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Name"
                  value={term}
                  onChange={(e: any) => {
                    setTerm(e.target.value);
                    setValue('name', e.target.value);
                  }}
                  error={!!errors.name}
                  helperText={errors.name && errors?.name?.message}
                  required
                />
              )}
              freeSolo
              onInputChange={(event, value) => {
                setValue('name', value);
                if (value === '') {
                  setError('name', {
                    type: 'manual',
                    message: 'name is require!',
                  });
                } else {
                  clearErrors(['name']);
                }
                const food = results.find(
                  (result: any) => result?.food_name === value
                );
                if (food) {
                  // @ts-ignore: Unreachable code error
                  setValue('calories', food?.nf_calories);
                  clearErrors(['calories'])
                }
                return value;
              }}
            />
          )}
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
