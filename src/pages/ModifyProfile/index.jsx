import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

const ModifyProfile = () => {

  const {token, userID} = useSelector(state => state);
  const history = useHistory();

  const [userInfo, setUserInfo] = useState('');
  
  const profileFetch = () => {
    fetch('http://localhost:1337/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserInfo(data)
    })
  };

  useEffect(() => {
    profileFetch();
  },[]);

  //****************************** */

  const [dataD, setData] = useState({
    username: '',
    email: '',
    password: ''
  
  });
  
  const handleChange = (e) => {
    setData({
      ...dataD,
      [e.target.name]: e.target.value
    })
  };
  
  const modifyFetch = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:1337/users/${userID}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataD)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      profileFetch();
      history.push('/users/me');
    })
  };
  console.log(dataD);
  


  return (
    <div className="container">
      <div>
        <h1>Modify Profile</h1>
        <p>{userInfo.username}</p>
        <p>{userInfo.id}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.description}</p>
      </div>
      <form onSubmit={modifyFetch}>
        <h3>Modify</h3>
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
    </div>
  );
};

export default ModifyProfile;
