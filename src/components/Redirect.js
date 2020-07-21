import React from 'react';
import { Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Events from './Events';
// import Overview from './Overview';
// import Profile from './Profile';
// import Shortcuts from './Shortcuts';

function Redirect() {
    return (
        <div>
            <Route exact path="/(Dashboard|)">
                <Dashboard />
            </Route>
            <Route exact path="/Events">
                <Events />
            </Route>
        </div>
    );
}
export default Redirect;