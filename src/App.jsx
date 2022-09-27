import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Acceuil from './pages/Accueil';
import Home from './pages/Home';
import Post from './pages/Post';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Acceuil />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/home/:postId">
                    <Post />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
