import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, Modal, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
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
import axios, { AxiosResponse } from 'axios';

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
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

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
          <Controller
            name="name"
            control={control}
            render={(field) => (
              <Autocomplete
                {...field}
                disablePortal
                id="combo-box-demo"
                options={results.map((result: any) => result?.food_name)}
                defaultValue={food.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Name"
                    value={term}
                    onChange={(e: any) => {
                      setTerm(e.target.value.trim());
                      setValue('name', e.target.value.trim());
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
                    clearErrors(['calories']);
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
                    inputFormat="dd/MM/yyyy"
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
