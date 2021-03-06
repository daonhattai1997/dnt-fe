import React from 'react';
import './App.css';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Content from './components/Content';
import SideNavPage from './components/SideNavPage';
import Login from './components/Login';
import MyRedirect from './module/Redirect';
import NoMatch from './nomatch/NoMatch';
import Register from "./components/Register";
import AccountManagement from "./components/AccountManagement";
import StaffManagement from "./components/StaffManagement";
// import Footer from './components/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';



function App() {
    return (
    	<main>
	    	<Switch>
			  	<Route exact 	path="/" 				component={Login} />
			  	<Route exact    path="/404"             component={NoMatch} />
			  	<Route exact	path="/register"		component={Register} />
			  	<Route exact path="/staff" component={StaffManagement}/>
			  	<Route exact	path="/account">
            		<AccountManagement/>
            	</Route>
			  	<Route path="/home">
			      	<div className="d-flex" id="wrapper">
				        <SideNavPage />
				        <div id="page-content-wrapper">
				          <MyRedirect />
				        </div>
				    </div>
			    </Route>
			    <Route          path="*">
		            <Redirect to="/404" />
		        </Route>
		        


			</Switch>
		</main>

		        
    );


}

export default App;
