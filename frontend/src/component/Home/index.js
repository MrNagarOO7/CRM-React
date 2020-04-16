import React from 'react';
import './home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: "emp"};
    }

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
                                <input type="email" className="form-control" placeholder="Enter Username /mobile/email">
                                </input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password">
                                </input>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    };
}

export default Home;


