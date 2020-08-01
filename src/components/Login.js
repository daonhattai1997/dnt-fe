import React from 'react';
import { Input} from 'antd';
import { ToastContainer } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import * as Constants from "../common/CommonUtils";
import * as Message from "../common/message";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        //this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    onLogin =  async(event) => {

        event.preventDefault();

        if(this.state.username === "") {
            Message.Warning("Vui lòng nhập tên tài khoản!");
            return; 
        }
        if(this.state.password === "") {
            Message.Warning("Vui lòng nhập mật khẩu!"); 
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer JWTSuperSecretKey'
            },
            body: JSON.stringify(
            { 
                username: this.state.username, 
                password: this.state.password 
            })
        };
        await fetch(Constants.SERVER + "/auth/login", requestOptions)
            .then(response => response.json())
            .then(results => {
                localStorage.setItem('token', results.accessToken);
                localStorage.setItem('username', results.username);
                
                this.props.history.push("/home");
            }).catch(err => {
                console.error(err);
                Message.Warning('Sai tài khoản hoặc mật khẩu.');
            });
    };

    render(){
        // param
        const { username, password } = this.state;

        return (
            <div className="hold-transition login-page">
                <ToastContainer />
                <div className="login-box">
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg"><b>Đăng nhập</b></p>
                            <form onSubmit={this.onLogin} id="loginForm">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" 
                                        placeholder="Username" 
                                        value={username}
                                        onChange={ username => this.setState({ username: username.target.value })}/>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={ password => this.setState({ password: password.target.value })} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            {/*<input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                              Remember Me
                                            </label>*/}
                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-4">
                                        <button type="submit" onClick={this.onLogin} className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>
                            {/* 
                            <div className="social-auth-links text-center mb-3">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                                </a>
                            </div>
                            /.social-auth-links 
                            */}
                            <p className="mb-1">
                                <a href="forgot-password.html">Forgot password</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;