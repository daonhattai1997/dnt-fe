import React from 'react';
import { ToastContainer } from 'react-toastify';

import * as Constants from "../common/CommonUtils";
import * as Message from "../common/message";

function OptionHotel ({data}) {

    const items = [];
    items.push (
        <option value='' key='hiddenOptions'></option>);

    data.map((element, index) => {
        items.push(
            <option key={element} value={element}>{element}</option> 

                
        )
    });

    return items;
}




class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hotelNames: [],
            name:"",
            email: "",
            address:"",
            gender:"",
            hotelName:""
        };

    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        };

        fetch(Constants.SERVER + "/hotel/getAllHotelName", requestOptions)
            .then(response => response.json())
            .then(
                data => this.setState({
                    hotelNames: data
                })
            ).catch(console.log);
    }

    onRegister =  async(event) => {

        event.preventDefault();

        if(this.state.name === "") {
            Message.Warning("Bạn chưa điền Tên.");
            return;
        }

        if(this.state.address === "") {
            Message.Warning("Bạn chưa điền địa chỉ.");
            return;
        }
        
        if(this.state.email === "") {
            Message.Warning("Bạn chưa điền Email.");
            return;
        }


        if(this.state.gender === "") {
            Message.Warning("Bạn chưa điền giới tính.");
            return;
        }

        if(this.state.hotelName === "") {
            Message.Warning("Bạn chưa điền tên khách sạn");
            return;
        }

        console.log(this.state.name);
        console.log(this.state.address);
        console.log(this.state.email);
        console.log(this.state.gender);
        console.log(this.state.hotelName);

        


        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(
            { 
                name:this.state.name,
                email: this.state.email,
                address:this.state.address,
                gender:this.state.gender,
                hotelName:this.state.hotelName
            })
        };
        await fetch(Constants.SERVER + "/auth/register", requestOptions)
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
        const {name, email, address, gender, hotelName} = this.state;

        return (
               <div className="hold-transition register-page">
               <ToastContainer />
                    <div className="register-box">
                        <div className="register-logo">
                            <a href="../register"><b>Register</b></a>
                        </div>

                        <div className="card">
                            <div className="card-body register-card-body">

                                <form onSubmit={this.onRegister} id="registerForm">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Name"
                                            value={name}
                                            onChange={ name => this.setState({ name: name.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Address"
                                            value={address}
                                            onChange={ address => this.setState({ address: address.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email"
                                            value={email}
                                            onChange={ email => this.setState({ email: email.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Gender" 
                                            value={gender}
                                            onChange={ gender => this.setState({ gender: gender.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>
                                   {/* <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Hotel Name"
                                            value={hotelName}
                                            onChange={ hotelName => this.setState({ hotelName: hotelName.target.value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>*/}
                                    <div className="form-group">
                                        <label>Hotel Name</label>
                                            <select className="form-control"
                                                onChange={ hotelName => this.setState({ hotelName: hotelName.target.value })}>
                                                <OptionHotel data={this.state.hotelNames} />
                                        
                                            </select>
                                      </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                {/*<input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                                <label htmlFor="agreeTerms">
                                                I agree to the <a href="#">terms</a>
                                                </label>*/}
                                            </div>
                                        </div>
                                      
                                        <div className="col-4">
                                            <button type="submit" onClick={this.onRegister} className="btn btn-primary btn-block">Register</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Register;