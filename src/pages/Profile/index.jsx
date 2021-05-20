import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const Profile = () => {

  const {token} = useSelector(state => state);

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
      console.log(data)
      setUserInfo(data)
    })
  };

  useEffect(() => {
    profileFetch();
  },[]);
  
  return (
    <div>
      <h1>Profile</h1>
      <p>{userInfo.username}</p>
      <p>{userInfo.email}</p>
      <p>{userInfo.description}</p>
    </div>
  );
};

export default Profile;
