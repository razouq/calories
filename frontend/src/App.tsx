import {useEffect} from 'react';
import Navbar from './components/Navbar';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import history from './history';
import { Container } from './style';
import ListFoods from './components/ListFoods';
import ShowFood from './components/ShowFood';
import CreateFood from './components/CreateFood';
import Report from './components/Report';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './store/reducers/usersReducer';
import InviteFriend from './components/InviteFriend/Index';
import AdminRoute from './Routes/AdminRoute';
import UserRoute from './Routes/UserRoute';
import NotFound from './components/NotFound';
import ExceededDays from './components/ExceededDays';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch])
  return (
    <Router history={history}>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AdminRoute exact path="/report" component={Report} />
          <UserRoute exact path="/exceeded-days" component={ExceededDays} />
          <UserRoute exact path="/invite-friend" component={InviteFriend} />
          <UserRoute exact path="/" component={ListFoods} />
          <UserRoute exact path="/create-food" component={CreateFood} />
          <AdminRoute exact path="/foods/:id" component={ShowFood} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
