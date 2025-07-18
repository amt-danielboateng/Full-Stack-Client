import React from 'react';
import {useState, useContext} from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();
  
  const login = () => {
    const data = {
      username: username,
      password: password
    }
    axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/login`, data).then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }else{
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({username: response.data.username, id: response.data.id, status: true});
        navigate("/");
      }
      
    })
  };
  return (
    <div className='loginContainer'>
      <label htmlFor="username">Username: </label>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password: </label>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
