import React from 'react';
import axios from 'axios';
import './emp.css';

class EmpDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emp: {}
        };
    }

    fetchEmployeeData = () => {
        let token = localStorage.getItem('token');
        axios
            .get(this.props.config.api_server + '/emp/profile',{
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': token
                }
            })
            .then(resp => {
                this.setState({emp:resp.data.data});
                console.log("data=>", resp.data.data)
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push('/')
    };

    componentWillMount() {
        this.fetchEmployeeData();
    }

    render () {
        return(
            <div className={'AdminDashboard'}>
                   <div className={'container'}>
                       <div className="card">
                           <img src="https://www.mdcacademy.org/wp-content/uploads/2019/08/blank-profile-picture-973460_1280-1200x1200.png" alt="John" style={{"width":"100%"}}></img>
                               <h1>{this.state.emp.name ? this.state.emp.name : "Default"}</h1>
                               <p className="title">{this.state.emp.email ? this.state.emp.email : "Default"}</p>
                               <p>{this.state.emp.id ? this.state.emp.id : "Default"}</p>

                               <p>
                                   <button
                                       className={'btn btn-primary'}
                                       onClick={() =>{
                                           this.logout();
                                       }}
                                   >
                                       Logout
                                   </button>
                               </p>
                       </div>
                   </div>
            </div>
    )
    };
}

export default EmpDashboard;


