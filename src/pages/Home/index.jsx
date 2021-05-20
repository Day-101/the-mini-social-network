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
    <div>
      <h1>Home</h1>
      <form onSubmit={messagePostFetch}>
        <label>
          Message :
          <input type="text" name="text" onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
      <h3>{data && data.length} posts</h3>
      <ul>
        {data && data.map((post) => {
          return (
            <li key={post.id}>
              <p>{post.text}</p>
              by <Link to={`/users/${post.user.id}`}>{post.user.username}</Link>
            </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Home;
