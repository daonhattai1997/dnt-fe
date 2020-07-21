import React from 'react';
import './App.css';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Content from './components/Content';
import SideNavPage from './components/SideNavPage';
import Redirect from './components/Redirect';
// import Footer from './components/Footer';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        //<div className="App">
            //<Header/>
            //<SideNavPage/>
            //<Sidebar/>
            //<Content/>
            //<Footer/>
        //</div>

        <Router>
	      <div className="d-flex" id="wrapper">
	        <SideNavPage />
	        <div id="page-content-wrapper">
	          <Redirect />
	        </div>
	      </div>
	    </Router>
    );


}

export default App;
