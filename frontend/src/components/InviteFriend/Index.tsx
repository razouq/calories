import { FC } from 'react';
import { StyledPaper, StyledTextField, Title, StyledButton } from './style';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { inviteFriend } from '../../store/reducers/usersReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email('Please enter a valid email format !').required(),
  })
  .required();

const initialValues = {
  name: '',
  email: '',
};

const InviteFriend: FC = () => {
  const dispatch = useDispatch();
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
    dispatch(inviteFriend(data));
    console.log(data)
  };
  return (
    <StyledPaper elevation={3}>
      <Title>Invite Friend</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          {...register('name')}
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name && errors?.name?.message}
        />
        <StyledTextField
          {...register('email')}
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email && errors?.email?.message}
        />

        <StyledButton type="submit" variant="contained">
          Invite
        </StyledButton>
      </form>
    </StyledPaper>
  );
};

export default InviteFriend;
