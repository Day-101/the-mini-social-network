import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserProfile = () => {

  const {token} = useSelector(state => state);

	const { slug } = useParams();
	const id = slug;
  console.log(id);

  const [userInfo, setUserInfo] = useState('');
  
  const profileFetch = () => {
    fetch(`http://localhost:1337/users/${id}`, {
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
    fetch(`http://localhost:1337/posts?user.id=${id}`, {
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

	return (
    <div className="container">
      <div>
        <h1>UserProfile</h1>
        <p>{userInfo.username}</p>
        <p>{userInfo.id}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.description}</p>
      </div>
      <div>
        <h3>{data && data.length} posts</h3>
        <ul>
          {data && data.map((post) => {
            return (
              <li key={post.id}>
                <p>{post.text}</p>
              </li>
              )
            })
          }
        </ul>
      </div>
    </div>
	)
}
export default UserProfile;
