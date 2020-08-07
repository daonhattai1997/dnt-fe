import React from 'react';
import { ToastContainer } from 'react-toastify';

import * as Constants from "../common/CommonUtils";
import * as Message from "../common/message";

function OptionRole ({data}) {

    const roleNames = [];
    roleNames.push (
        <option value='' key='hiddenOptions'></option>);

    data.map((element, index) => {
        roleNames.push(
            <option key={element.roleId} value={element.roleId}>{element.name}</option> 
        )
    });

    return roleNames;
}

function OptionStaffName ({data}) {

    const staffNames = [];
    staffNames.push (
        <option value='' key='hiddenOptions'></option>);

    data.map((element, index) => {
        staffNames.push(
            <option key={element.staffId} value={element.staffId}>{element.name}</option> 
        )
    });

    return staffNames;
}

function TableData ({data}) {

    const items = [];
    data.map((element, index) => {
        let roleToString = "";

        for (let i = 0; i < element.roles.length; i++) {

            roleToString += element.roles[i].name + ", ";
        }

        roleToString = roleToString.substr(0,roleToString.length - 2);

        items.push(
            <tr key={element.username} style={{textAlign: 'center'}}>
                <td>{element.username}</td>
                <td>{roleToString}</td>
                <td>created by</td>
                <td>{element.createdDt}</td>
                <td>action</td>
            </tr>
        )
    });

    return items;
}

class AccountManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roleNames: [],
            tableData: [],
            staffNames: [],

            username:"",
            password:"",
            staffId: "",
            roleId: "",
        };

    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };

        fetch(Constants.SERVER + "/role/getAllRole", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    roleNames: data
                })
            ).catch(console.log);

        fetch(Constants.SERVER + "/staff/getAllStaff", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    staffNames: data
                })
            ).catch(console.log);

        fetch(Constants.SERVER + "/auth/getAllAccount", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    tableData: data
                })
            ).catch(console.log);
    }

    onAddAccount =  async(event) => {

        event.preventDefault();

        if(this.state.userName === "") {
            Message.Warning("Bạn chưa điền tên.");
            return;
        }

        if(this.state.password === "") {
            Message.Warning("Bạn chưa điền mật khẩu");
            return;
        }
        
        if(this.state.staffId === "") {
            Message.Warning("Bạn chưa điền nhân viên");
            return;
        }

        if(this.state.roleId === "") {
            Message.Warning("Bạn chưa điền chức vụ");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(
            { 
                username:this.state.username,
                password: this.state.password,
                staffId:this.state.staffId,
                roleId:this.state.roleId,
            })
        };
        await fetch(Constants.SERVER + "/auth/createAccount", requestOptions)
            .then(response => response.json())
            .then(results => {
                
                this.props.history.push("/");
            }).catch(err => {
                console.error(err);
                Message.Warning('Đăng kí thất bại');
            });
    };

    render(){
        // param
        const {username, password, staffId, roleId} = this.state;

        return (
               <div className="container">
                    <ToastContainer />
                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addAccountModal" style={{marginTop:10}}>
                        Add Account
                    </button>

                    <table className="table table-striped" id="tableContent" style={{marginTop:10}}>
                        <thead className="thead-dark">
                            <tr  style={{textAlign: 'center'}}>
                                <th>USER ID</th>
                                <th>ROLE</th>
                                <th>CREATED BY</th>
                                <th>CREATED DATE</th> 
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <TableData data={this.state.tableData} />
                        </tbody>
                    </table>

                    <div className="modal fade" id="addAccountModal">
                      <div className="modal-dialog">
                        <div className="modal-content">

                         
                            <div className="modal-header">
                                <h4 className="modal-title">Add Account</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                          
                            <div className="modal-body">
                                

                                <form onSubmit={this.onAddAccount} id="addAccountForm">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="User Name"
                                            value={username}
                                            onChange={ username => this.setState({ username: username.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" placeholder="Password"
                                            value={password}
                                            onChange={ password => this.setState({ password: password.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Staff Name</label>
                                        <select className="form-control"
                                            onChange={ staffId => this.setState({ staffId: staffId.target.value })}>
                                            <OptionStaffName data={this.state.staffNames} />
                                        
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Role Name</label>
                                        <select className="form-control"
                                            onChange={ roleId => this.setState({ roleId: roleId.target.value })}>
                                            <OptionRole data={this.state.roleNames} />
                                        
                                        </select>
                                    </div>
                                   
                                </form>

                            </div>

                          
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.onAddAccount} className="btn btn-success">Save</button>
                            </div>

                        </div>
                      </div>
                    </div>
               </div>
        );
    }
}













export default AccountManagement;