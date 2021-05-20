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
      dispatch(newUserSuccess(data))
      Cookies.set('token', data.jwt);
      Cookies.set('id', data.user.id);
      history.push('/');
    })
  };

  return (
    <form onSubmit={SignInFetch}>
      <h3>Sign in</h3>
      <label>
        Username or Email :
        <input type="text" name="identifier" onChange={handleChange}/>
      </label>
      <label>
        Password :
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignIn;