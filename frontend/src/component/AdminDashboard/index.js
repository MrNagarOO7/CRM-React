import React from 'react';
import axios from 'axios';

class AdminDashboard extends React.Component {
    constructor(props) {
        console.log("props==>", props);
        super(props);
        this.state = {
            tab: "emps",
            emps: [],
            create_hr_style:"",
            hr: {
                name: '',
                username: '',
                email: '',
                password: ''
            }
        };
    }

    fetchEmployeeList = () => {
        let token = localStorage.getItem('token');
        axios
            .get(this.props.config.api_server + '/admin/emps',{
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': token
                }
            })
            .then(resp => {
                // this.props.toast.success(resp.data.message,{
                //     position: this.props.toast.POSITION.TOP_RIGHT
                // });
                for(let emp of resp.data.data){
                    emp.status = 'Offline';
                    emp.login_time = null
                }
                this.setState({emps:resp.data.data});
            })
            .catch(err => {
                this.props.toast.error(err.response.data.message, {
                    position: this.props.toast.POSITION.TOP_RIGHT
                });
                console.log(err.response);
            });
    };

    addHR = () => {
        if(this.state.hr.email && this.state.hr.password){
            let token = localStorage.getItem('token');
            axios
                .post(this.props.config.api_server + '/admin/hr', this.state.hr,{
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': token
                    }
                })
                .then(resp => {
                    this.props.toast.success(resp.data.message,{
                        position: this.props.toast.POSITION.TOP_RIGHT
                    });
                    this.changeModelState();
                })
                .catch(err => {
                    this.props.toast.error(err.response.data.message, {
                        position: this.props.toast.POSITION.TOP_RIGHT
                    });
                    console.log(err.response);
                });
        }
    };

    changeModelState = () => {
      if(!this.state.create_hr_style){
          this.setState({create_hr_style: 'contents'})
      } else {
          this.setState({create_hr_style: ''})
      }
      let  hr = {
            name: '',
            username: '',
            email: '',
            password: ''
      };
      this.setState({hr});
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push('/admin')
    };

    componentWillMount() {
        this.fetchEmployeeList();
    }

    render () {
        return(
            <div className={'AdminDashboard'}>
                <div className={'header'}>
                    <nav className="navbar navbar-light bg-light justify-content-between">
                        <a className="navbar-brand">Admin Dashboard</a>
                        <div>
                            <button
                                className={'btn btn-primary'}
                                style={{'marginRight':'10px'}}
                                onClick={() => {
                                    this.changeModelState();
                                }}
                            >
                                Add HR
                            </button>
                            <button
                                className={'btn btn-secondary'}
                                onClick={() =>{
                                    this.logout();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
                <div className={'body'}>
                   <div className={'row'} style={{"marginLeft":0, "marginRight":0}}>
                       <div className={'col-12'}>
                           {
                               this.state.emps.length > 0 ?
                                   <table className="table">
                                       <thead className="thead-dark">
                                       <tr>
                                           <th scope="col">#</th>
                                           <th scope="col">Employee Name</th>
                                           <th scope="col">Employee Email</th>
                                           <th scope="col">Status</th>
                                           <th scope="col">Login Time</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       {
                                           this.state.emps.map((emp, index) => {
                                               return(
                                                   <tr key={index}>
                                                       <th scope="row">{index+1}</th>
                                                       <td>{emp.name}</td>
                                                       <td>{emp.email}</td>
                                                       <td>{emp.status}</td>
                                                       <td>{emp.login_time}</td>
                                                   </tr>
                                               )
                                           })
                                       }
                                       </tbody>
                                   </table> :
                                   <h1> No Data Found</h1>
                           }
                       </div>
                   </div>
                </div>
                <div className="modal fade" style={{'display': this.state.create_hr_style}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add HR</h5>
                                <button type="button"
                                        className="close"
                                        onClick={() => {
                                            this.changeModelState();
                                        }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                            <div className="modal-body">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="Enter Name"
                                               onChange={(e) => {
                                                   let hr = Object.assign({},this.state.hr);
                                                   hr.name = e.target.value;
                                                   this.setState({hr})
                                                }
                                               }>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="Enter Username"
                                               onChange={(e) => {
                                                   let hr = Object.assign({},this.state.hr);
                                                   hr.username = e.target.value;
                                                   this.setState({hr})
                                                }
                                               }>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email"
                                               className="form-control"
                                               placeholder="Enter Email"
                                               onChange={(e) => {
                                                   let hr = Object.assign({},this.state.hr);
                                                   hr.email = e.target.value;
                                                   this.setState({hr})
                                                }
                                               }
                                               required>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="password"
                                               className="form-control"
                                               placeholder="Password"
                                               onChange={(e) => {
                                                   let hr = Object.assign({},this.state.hr);
                                                   hr.password = e.target.value;
                                                   this.setState({hr})
                                                }
                                               }
                                               required>
                                        </input>
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        this.changeModelState();
                                    }}
                                >Close</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.addHR();
                                    }}
                                >Save changes</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
    };
}

export default AdminDashboard;


