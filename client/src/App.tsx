import React, { FC } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/navigation/Header';
import Index from './pages/Index';
import Authentication from './pages/Authentication';
import Footer from './components/navigation/Footer';
import AuthHeader from './components/navigation/authentication/AuthHeader';
import AuthFooter from './components/navigation/authentication/AuthFooter';

const App: FC = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/authentication" component={AuthHeader}/>
                    <Route component={Header}/>
                </Switch>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/authentication" component={Authentication} />
                </Switch>
                <Switch>
                    <Route path="/authentication" component={AuthFooter}/>
                    <Route component={Footer}/>
                </Switch>
            </Router>
        </>
    )
}

export default App
