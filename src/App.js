import './App.css';
import Container from './components/container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Unavailable from './components/unavailable';

function App() {
  return (
    <div className="App">
      <Router>
       <Switch>
         <Route path="/" exact>
          <Container />
         </Route>
         <Route path="*">
            <Unavailable />
         </Route>
       </Switch>
      </Router>
    </div>
  );
}

export default App;
