import React, { FC } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/navigation/Header';
import Index from './pages/Index';
import Footer from './components/navigation/Footer';

const App: FC = () => {

    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Index}/>
                </Switch>
                <Footer />
            </Router>
        </>
    )
}

export default App
