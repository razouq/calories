import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router';

const AdminRoute: FC<RouteProps> = (props) => {
  const currentUser = useSelector((state: RootState) => state.users.user);
  console.log(currentUser)
  const isAdmin = currentUser?.role === 'admin';

  return isAdmin ? <Route {...props} /> : <Redirect to="/login" />
};

export default AdminRoute;
