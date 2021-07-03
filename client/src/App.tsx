import React, {useState, useEffect, FC} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/navigation/Header';

const App: FC = () => {

    return (
        <React.Component>
            <Header />
            <Router>
                <Switch>
                    
                </Switch>
            </Router>
        </React.Component>
    )
}

export default App
