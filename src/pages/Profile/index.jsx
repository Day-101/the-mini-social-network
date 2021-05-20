import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Profile = () => {

  const {token, userID} = useSelector(state => state);

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

  //************************** */

  const [data, setData] = useState();
  
  const messageGetFetch = () => {
    fetch(`http://localhost:1337/posts?user.id=${userID}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
  };
    
  useEffect(() => {
    messageGetFetch();
  },[]);

  const handleClic = (id) => {
    fetch(`http://localhost:1337/posts/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
  }
 
  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>{userInfo.username}</p>
        <p>{userInfo.id}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.description}</p>
        <Link to="/users/me/modify">Modify</Link>
      </div>
      <div>
        <h3>{data && data.length} posts</h3>
        <ul>
          {data && data.map((post) => {
            return (
              <li key={post.id}>
                <p>{post.text}</p>
                <button onClick={handleClic(post.id)}>Delete</button>
              </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Profile;
