import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Acceuil from './pages/Accueil';
import Home from './pages/Home';
import Post from './pages/Post';
import Error from './components/Error';

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
                <Route>
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
