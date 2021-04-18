import React, {useState} from "react";
import {axiosWithAuth} from '../helpers/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const initialValues = {
  credentials: {
    username: '',
    password: '',
  }
}

const Login = () => {
  const [login, setLogin] = useState(initialValues)
  const {push} = useHistory();  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('/login', login.credentials)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        push('/BubblesPage')
      })
      .catch(err => console.error('axiosPost: authError: ', err))
  }
  
  const handleChange = e => {
    setLogin({
      credentials: {
        ...login.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  // useEffect(() => {
    
  // })

    return (
      <div>
        <h1>Welcome Back to the Bubble App!</h1>
        <div data-testid="loginForm" className="login-form">
          <h2>Login </h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input 
                type='text' 
                name='username' 
                placeholder='Username:'
                value={login.credentials.username}
                onChange={handleChange}
                data-testid="username"/>
            </label>
            <label>
              Password:
              <input 
                type='password' 
                name='password'
                placeholder='Password:'
                value={login.credentials.password}
                onChange={handleChange}
                data-testid="password"/>
            </label>
            <button >Login</button>
          </form>
        </div>
  
        {/* <p data-testid="errorMessage" className="error">{error}</p> */}
      </div>
    );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.

// state = {
//   credentials: {
//     username: '',
//     password: ''
//   },
//   error: [],
// }
