import React, {Component} from 'react';
import * as Constants from "../common/CommonUtils";
// import { NavLink } from "react-router-dom";

function Menu ({data}) {

    const items = [];

    data.map((element, index) => {
        items.push(
            <li className="nav-item" key={element.menuId}>
                <a href={element.menuUrl} className="nav-link">
                    <p>{element.menuName}</p>
                </a>
            </li>
        )
    });

    return items;
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
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };

        fetch(Constants.SERVER + "/menu", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    menus: data
                })
            ).catch(console.log);
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <a href="/dashboard" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <Menu data={this.state.menus} />
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

}
export default SideNavPage;