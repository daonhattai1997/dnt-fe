import React from 'react';
import { Route } from "react-router-dom";

import Dashboard from '../components/Dashboard';
import Account from '../components/AccountManagement';

function Redirect() {
    return (
        <div>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/home/account">
            	<Account />
            </Route>
        </div>
    );  
}

export default Redirect;