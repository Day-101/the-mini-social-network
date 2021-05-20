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
    <div className="container">
      <span id="title">Register</span>
      <form onSubmit={registerFetch} id="form-container">
        <div id="form-content">
          <label htmlFor="username">
            Username :
          </label>
            <input type="text" name="username" onChange={handleChange}/>
          <label>
            Email :
          </label>
            <input type="email" name="email" onChange={handleChange} />
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

export default Register;
