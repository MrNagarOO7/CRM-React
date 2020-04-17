import React from 'react';
import axios from 'axios';

class HRDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            create_hr_style: "",
            emp: {
                name: '',
                id: '',
                email: '',
                password: ''
            }
        };
    }

    fetchEmployeeList = () => {
        let token = localStorage.getItem('token');
        axios
            .get(this.props.config.api_server + '/hr/emps',{
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': token
                }
            })
            .then(resp => {
                this.setState({emps:resp.data.data});
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    addEmp = () => {
        if(this.state.emp.email && this.state.emp.password){
            let token = localStorage.getItem('token');
            axios
                .post(this.props.config.api_server + '/hr/emp', this.state.emp,{
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
        } else {
            this.props.toast.error("Please, Provide Valid Details.", {
                position: this.props.toast.POSITION.TOP_RIGHT
            });
        }
    };

    changeModelState = () => {
      if(!this.state.create_hr_style){
          this.setState({create_hr_style: 'contents'})
      } else {
          this.setState({create_hr_style: ''})
      }
      let  emp = {
            name: '',
            id: '',
            email: '',
            password: ''
      };
      this.setState({emp});
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push('/')
    };

    componentWillMount() {
        this.fetchEmployeeList();
    }

    render () {
        return(
            <div className={'AdminDashboard'}>
                <div className={'header'}>
                    <nav className="navbar navbar-light bg-light justify-content-between">
                        <a className="navbar-brand">HR Dashboard</a>
                        <div>
                            <button
                                className={'btn btn-primary'}
                                style={{'marginRight':'10px'}}
                                onClick={() => {
                                    this.changeModelState();
                                }}
                            >
                                Add Employee
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
                                                   </tr>
                                               )
                                           })
                                       }
                                       </tbody>
                                   </table> :
                                   <h3> No Data Found</h3>
                           }
                       </div>
                   </div>
                </div>
                <div className="modal fade" style={{'display': this.state.create_hr_style}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
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
                                                   let emp = Object.assign({},this.state.emp);
                                                   emp.name = e.target.value;
                                                   this.setState({emp})
                                               }
                                               }>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label>Id</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="Enter Employee Id"
                                               onChange={(e) => {
                                                   let emp = Object.assign({},this.state.emp);
                                                   emp.id = e.target.value;
                                                   this.setState({emp})
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
                                                   let emp = Object.assign({},this.state.emp);
                                                   emp.email = e.target.value;
                                                   this.setState({emp})
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
                                                   let emp = Object.assign({},this.state.emp);
                                                   emp.password = e.target.value;
                                                   this.setState({emp})
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
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.addEmp();
                                        }}
                                    >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
    };
}

export default HRDashboard;


