import React from 'react';
import './home.css';
import axios from "axios";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "emp",
            login: {
                username: '',
                password: ''
            }
        };
    }

    login = () => {
        let flag = true;
        for(let key of Object.keys(this.state.login)){
            if(this.state.login[key] === ''){
                flag = false;
                break;
            }
        }
        if(flag){
            let user = 'hr';
            if(this.state.tab === 'emp'){
                user = 'emp'
            }
            axios
                .post(this.props.config.api_server + '/' + user + '/login' , this.state.login,{
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
                    localStorage.setItem('user', user);
                    this.props.history.push('/'+ user + '/dashboard')
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
                            className={this.state.tab === 'emp' ? 'btn nav-btn btn-primary' : 'btn nav-btn'}
                            style={{marginRight:'5px'}}
                            onClick={
                               () => {
                                   this.setState({tab:"emp"});
                               }
                           }>Employee</button>
                        <button
                            className={this.state.tab === 'hr' ? 'btn nav-btn btn-primary' : 'btn nav-btn'}
                            onClick={
                                   () => {
                                       this.setState({tab:"hr"});
                                   }
                           }>HR</button>
                    </div>
                    <hr></hr>
                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Username or Mobile or Email"
                                    onChange={(e) => {
                                        let login = this.state.login;
                                        login.username = e.target.value;
                                        this.setState({login})
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
                                    placeholder="Password"
                                    onChange={(e) => {
                                        let login = this.state.login;
                                        login.password = e.target.value;
                                        this.setState({login})
                                        }
                                    }
                                    required>
                                </input>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.login();
                                }}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    };
}

export default Home;


