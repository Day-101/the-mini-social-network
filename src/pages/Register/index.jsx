import React, {useState} from 'react';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  
  });
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  };
  
  const API_URL = 'http://localhost:1337/auth/local/register';
  
  const registerFetch = (e) => {
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
      
      console.log(data);
    })
  };

  return (
    <form onSubmit={registerFetch}>
      <h3>Register</h3>
      <label htmlFor="username">
        Username :
        <input type="text" name="username" onChange={handleChange}/>
      </label>
      <label>
        Email :
        <input type="text" name="email" onChange={handleChange} />
      </label>
      <label>
        Password :
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Register;
