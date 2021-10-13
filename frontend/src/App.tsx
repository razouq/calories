import Navbar from './components/Navbar';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import history from './history';
import { Container } from './style';
import ListFoods from './components/ListFoods';
import ShowFood from './components/ShowFood';

function App() {
  return (
    <Router history={history}>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={ListFoods} />
          <Route exact path="/foods/:id" component={ShowFood} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
