import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Acceuil from './pages/Accueil';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Acceuil />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
