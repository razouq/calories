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
          <Route exact path="/report" component={Report} />
          <Route exact path="/" component={ListFoods} />
          <Route exact path="/create-food" component={CreateFood} />
          <Route exact path="/foods/:id" component={ShowFood} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
