import React, { Component } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.userName,
            password: this.props.password,
            validationMessage: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserNameChage = this.handleUserNameChage.bind(this);
        this.handlePassowedChage = this.handlePassowedChage.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('https://localhost:44385/api/Login?userName='+this.state.userName+'&password='+this.state.password)
          .then((response)  => {
            var cookies = new Cookies();
            cookies.set("token", response.data);
            this.props.history.push('/books');
          })
          .catch((error) => {
            if(error.request.status === 401){
                this.setState({validationMessage: "Incorrect user name or password."});
            }
            else{
                this.setState({validationMessage: "An error occured."});
            }
          });
    }

    handleUserNameChage(event){
        this.setState({userName: event.target.value});
    }

    handlePassowedChage(event){
        this.setState({password: event.target.value});
    }

    render(){
        return (
            <div>
                <div className="row">
                    <h2 className="col-md-4 offset-md-4 text-center">Login</h2>
                </div>
                <div className="row">
                    <form className="col-md-4 offset-md-4" onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label> User name:</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                value={this.state.userName} 
                                onChange={this.handleUserNameChage}/>
                        </div>
                        <div class="form-group">
                            <label> Password:</label>
                            <input 
                                className="form-control" 
                                type="password" 
                                value={this.state.password}
                                onChange={this.handlePassowedChage}/>
                        </div>
                        <div className="text-center text-danger">{this.state.validationMessage}</div>
                        <br/>
                        <div className="text-center">
                            <input className="btn btn-default" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withCookies(Login);
