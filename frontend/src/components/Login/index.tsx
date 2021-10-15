import { FC, useEffect } from 'react';
import {
  StyledPaper,
  StyledTextField,
  Title,
  StyledButton,
  ServerErrorsList,
  ServerError,
} from './style';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/reducers/usersReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from '../../store';
import { cleanErrors } from '../../store/reducers/serverReducer';

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Please enter a valid email format !').required(),
    password: yup
      .string()
      .min(4, 'Password must contain at least 4 characters')
      .required(),
  })
  .required();

const initialValues = {
  email: '',
  password: '',
};

const Login: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanErrors());
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    dispatch(loginUser(data));
  };
  const serverErrors = useSelector((state: RootState) => state.server.errors);
  const renderServerErrors = () => {
    return (
      <ServerErrorsList>
        {serverErrors.map((error) => (
          <ServerError>{error}</ServerError>
        ))}
      </ServerErrorsList>
    );
  };
  return (
    <StyledPaper elevation={3}>
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          {...register('email')}
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email && errors?.email?.message}
        />
        <StyledTextField
          {...register('password')}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors.password && errors?.password?.message}
        />
        {serverErrors.length ? renderServerErrors() : null}

        <StyledButton type="submit" variant="contained">
          Login
        </StyledButton>
      </form>
    </StyledPaper>
  );
};

export default Login;
