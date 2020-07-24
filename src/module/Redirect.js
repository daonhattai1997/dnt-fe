import React from 'react';
import { Route } from "react-router-dom";

import Dashboard from '../components/Dashboard';

function Redirect() {
    return (
        <div>
            <Route exact path="/admin/dashboard">
                <Dashboard />
            </Route>
        </div>
    );  
}

export default Redirect;