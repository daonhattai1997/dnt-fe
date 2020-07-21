import React, {Component} from 'react'; 
import * as Constants from "../common/CommonUtils";
import axios from 'axios';
// import { NavLink } from "react-router-dom";

function Menu ({data, index}) {

    if(index === data.length) return null;

    return data.map(item => (
        <React.Fragment key={item.menuId}>
            <li className={item.menuType === "SUB_MENU" ? "nav-item has-treeview" : "nav-item"}>
                <a href={data[index].menuUrl} className="nav-link">
                    <p>{data[index].menuName}</p>
                </a>
            </li>
            <ul className="nav nav-treeview">
                <Menu data={data} index={index+1} />
            </ul>
            
        </React.Fragment>
    ))
}

class SideNavPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            menus: []
        };

        //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    // fetch(Constants.SERVER + "/menu")
    //         .then(response => response.json())
    //         .then(data => this.setState({
    //             menus: data 
    //         })).catch(console.log);

        axios.get(Constants.SERVER + "/menu")
        .then(data => this.setState({ menus: data }))
        .catch(() => console.log);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <Menu data={this.state.menus} index={0}/>
                    </ul>
                </nav>
            </div>
        );
    }
        
}
export default SideNavPage;