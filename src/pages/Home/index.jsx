import React, {useState} from 'react';
import { useSelector } from "react-redux";

const Home = () => {
 const {userID, token} = useSelector(state => state);

  const [textToPost, setTextToPost] = useState({
    text: '',
    user: userID
  });

  const handleChange = (e) => {
    setData({
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

  const [data, setData] = useState({
    text: '',
    user: userID
  });

  const messageGetFetch = () => {
    fetch('http://localhost:1337/posts', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
  };
  messageGetFetch()
  
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

      <ul>
        {messageGetFetch().map(post => 
          <li>
            post
          </li>
        )}
        <li>
          
        </li>
      </ul>

    </div>
  );
};

export default Home;
