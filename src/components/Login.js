import React from "react";
import {axiosWithAuth} from '../helpers/axiosWithAuth';
import {useHistory} from 'react-router-dom';

// const {push} = useHistory();

class Login extends React.Component{
  state = {
    credentials: {
      username: '',
      password: ''
    },
    error: [],
  }
  

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  login = e => {
    e.preventDefault();
    axiosWithAuth().post('/login', this.state.credentials)
      .then(res => {
        // console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        this.props.history.push('/bubble')
      })
      .catch(err => {
        console.error('axiosPost: authError: ', err)
        this.setState({error: [err]})
      })
  }
  
   handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  //replace with error state

  render(){
    const { push } = useHistory();
    return (
      <div>
        <h1>Welcome Back to the Bubble App!</h1>
        <div data-testid="loginForm" className="login-form">
          <h2>Login </h2>
          <form onSubmit={this.login}>
            <label>
              Username:
              <input 
                type='text' 
                name='username' 
                // placeholder='Username:'
                value={this.state.credentials.username}
                onChange={this.handleChange}
                data-testid="username"/>
            </label>
            <label>
              Password:
              <input 
                type='password' 
                name='password'
                // placeholder='Password:'
                value={this.state.credentials.password}
                onChange={this.handleChange}
                data-testid="password"/>
            </label>
            <button >Login</button>
          </form>
        </div>
  
        <p data-testid="errorMessage" className="error">{this.error}</p>
      </div>
    );
  }
  
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.