import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Home = () => {
 const {userID, token} = useSelector(state => state);

  const [textToPost, setTextToPost] = useState({
    text: '',
    user: userID
  });

  const handleChange = (e) => {
    setTextToPost({
      ...textToPost,
      [e.target.name]: e.target.value
    })
  };

  const messagePostFetch = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:1337/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textToPost)
    })
    .then(response => response.json())
    .then(textToPost => {
      console.log(textToPost);
      messageGetFetch();
      
    })
  };

  // ***************************************************

  const [data, setData] = useState();

  const messageGetFetch = () => {
    fetch('http://localhost:1337/posts', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
      console.log(data);
    })
  };

  useEffect(() => {
    messageGetFetch();
  },[]);
  
  return (
    <div className="container">
      <span id="title">Home</span>
      <form onSubmit={messagePostFetch} id="home">
        <input type="text" name="text" onChange={handleChange} placeholder="What's up ?"/>
        <button>Submit</button>
      </form>
      <span id="postsCount">{data && data.length} posts</span>
      <ul className="allPosts">
        {data && data.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/users/${post.user.id}`}>{post.user.username}</Link>
              <p>{post.text}</p>
            </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Home;
