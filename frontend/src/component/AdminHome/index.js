import React from 'react';
import './adminhome.css';
import axios from 'axios';

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "login",
            register: {
                name: '',
                username: '',
                password: '',
                email: ''
            },
            login: {
                username:'',
                password:''
            }
        };
    }

    registerAdmin = () => {
            let flag = true;
            for(let key of Object.keys(this.state.register)){
                if(this.state.register[key] === ''){
                    flag = false;
                    break;
                }
            }
            if(flag){
                axios
                    .post(this.props.config.api_server + '/admin/signup', this.state.register,{
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(resp => {
                        this.props.toast.success(resp.data.message,{
                            position: this.props.toast.POSITION.TOP_RIGHT
                        });
                        this.props.history.push('/admin')
                    })
                    .catch(err => {
                        this.props.toast.error(err.response.data.message, {
                            position: this.props.toast.POSITION.TOP_RIGHT
                        });
                        console.log(err.response);
                    });
            } else {
                this.props.toast.error("Please, Provide Valid Details.", {
                    position: this.props.toast.POSITION.TOP_RIGHT
                });
            }
        };

    loginAdmin = () => {
        let flag = true;
        for(let key of Object.keys(this.state.login)){
            if(this.state.login[key] === ''){
                flag = false;
                break;
            }
        }
        if(flag){
            axios
                .post(this.props.config.api_server + '/admin/login', this.state.login,{
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
                .then(resp => {
                    this.props.toast.success(resp.data.message,{
                        position: this.props.toast.POSITION.TOP_RIGHT
                    });
                    console.log(resp);
                    localStorage.setItem('token', resp.data.data);
                    localStorage.setItem('user', 'admin');
                    this.props.history.push('/admin/dashboard')
                })
                .catch(err => {
                    this.props.toast.error(err.response.data.message, {
                        position: this.props.toast.POSITION.TOP_RIGHT
                    });
                    console.log(err.response);
                });
        } else {
            this.props.toast.error("Please, Provide Valid Details.", {
                position: this.props.toast.POSITION.TOP_RIGHT
            });
        }
    };

    render () {
        return(<div className="container h-100">
                <div className="row  h-100 justify-content-center align-items-center">
                    <div className="col-4 card">
                        <div className="navigation">
                            <button
                                className={this.state.tab === 'login' ? 'btn nav-btn btn-primary' : 'btn nav-btn'}
                                style={{marginRight:'5px'}}
                                onClick={
                                    () => {
                                        this.setState({tab:"login"});
                                    }
                                }>Login</button>
                            <button
                                className={this.state.tab === 'register' ? 'btn nav-btn btn-primary' : 'btn nav-btn'}
                                onClick={
                                    () => {
                                        this.setState({tab:"register"});
                                    }
                                }>Register</button>
                        </div>
                        <hr></hr>
                        <div>
                            <form>
                                {
                                    this.state.tab === 'register' ?
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Name</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter Name"
                                                    onChange={(e) => {
                                                        let register = this.state.register;
                                                        register.name = e.target.value;
                                                        this.setState({register})
                                                        }
                                                    }
                                                    required>
                                                </input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Username</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter Username"
                                                    onChange={(e) => {
                                                        let register = this.state.register;
                                                        register.username = e.target.value;
                                                        this.setState({register})
                                                        }
                                                    }
                                                    required>
                                                </input>
                                            </div>
                                        </div>
                                        :
                                        ''
                                }
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={(e) => {
                                            if(this.state.tab === 'login'){
                                                if(e.target.value){
                                                    let login = this.state.login;
                                                    login.username = e.target.value;
                                                    this.setState({login})
                                                }
                                            }
                                            else {
                                                let register = this.state.register;
                                                register.email = e.target.value;
                                                this.setState({register})
                                            }
                                            }
                                        }
                                        required>
                                    </input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            if(this.state.tab === 'login'){
                                                if(e.target.value){
                                                    let login = this.state.login;
                                                    login.password = e.target.value;
                                                    this.setState({login})
                                                }
                                            }
                                            else {
                                                let register = this.state.register;
                                                register.password = e.target.value;
                                                this.setState({register})
                                            }
                                        }
                                        }
                                        required>
                                    </input>
                                </div>
                                {
                                    this.state.tab === 'register' ?
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.registerAdmin()
                                        }} className="btn btn-primary">Register</button>
                                        :
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                this.loginAdmin()
                                            }}
                                            className="btn btn-primary">Login</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default AdminHome;


