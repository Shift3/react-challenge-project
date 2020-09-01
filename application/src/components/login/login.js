import React, { Component } from 'react';
import LoginForm from './login-form/loginForm';
import './login.css';

const TOKEN_KEY = 'jwt';

class Login extends Component {
  
  render() {
    localStorage.removeItem(TOKEN_KEY);
    return (
      <div className="main-body">
        <h1 className="text-center">Login Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <LoginForm onLogin={() => {this.props.history.push('/view-orders')}}/>
        </div>
      </div>
    )
  }
}

export default Login;