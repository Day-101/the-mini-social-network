import React,{useState} from 'react';
import { useDispatch} from "react-redux";
import Cookies from 'js-cookie';
import { newUserSuccess } from "../../Reduxx/action";
import { useHistory } from "react-router-dom";

const SignIn = () => {

  const history = useHistory();

  const dispatch = useDispatch();

  const [data, setData] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };

  const API_URL = 'http://localhost:1337/auth/local'

  const SignInFetch = (e) => {
    e.preventDefault();
    
    fetch(API_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      dispatch(newUserSuccess(data, true))
      Cookies.set('token', data.jwt);
      Cookies.set('id', data.user.id);
      history.push('/');
    })
  };

  return (
    <div className="container">
      <span id="title">Sign in</span>
      <form onSubmit={SignInFetch} id="form-container">
        <div id="form-content">
          <label>
            Username or Email :
          </label>
          <input type="text" name="identifier" onChange={handleChange}/>
          <label>
            Password :
          </label>
          <input type="password" name="password" onChange={handleChange} />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SignIn;