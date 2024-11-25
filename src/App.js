import logo from './Breddit logo.png';
import './index.css';
import React, {useState, useEffect } from 'react';
import { fetchRedditComments, fetchRedditPosts } from './components/api';
import SearchBar from './components/searchBar';
import renderContent from './components/render';
import { useDispatch, useSelector } from 'react-redux';


function App() {

const dispatch = useDispatch();
const { posts, loading, error, comments } = useSelector((state) => state.posts);

const [expandedPost, setExpandedPost] = useState(null);//track which post is expanded


useEffect(() => {
  dispatch(fetchRedditPosts(), fetchRedditComments());
}, [dispatch]);

const handleSearch = (searchQuery) => {
  dispatch(fetchRedditPosts(searchQuery));
};

//function to transform number of upvotes to nearest hundred

 const formatNumber = (num) => {
  if (num>=1000) {
    return (num/1000).toFixed(1) + 'k';
  }
  return num;
};


const togglecomments = (postId) => {
  if (expandedPost === postId) {
    setExpandedPost(null);
  } else {
    dispatch(fetchRedditComments(postId));
  setExpandedPost(postId);
}
};



  return (
    <div>
      <header className="App-Header">

        <div id='title' onClick={() => dispatch(fetchRedditPosts(''))}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1><span>B</span>redit</h1>
        </div>

        <div className='search'>
          <SearchBar onSearch={handleSearch}/>
        </div>
      </header>

      <main>
        <div className="articles">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

      <ul >
        {posts.map((post) => (
          <li key={post.data.id} className='article'>
            <h3>{post.data.title}</h3>

            <div className='content'>
              {renderContent(post)}
            </div>         
             {expandedPost === post.data.permalink && comments[post.data.permalink] &&
             (<div className='comments'>
              {comments[post.data.permalink].map((comment, index) => (
                <div key={index} className='comment'>
                  <strong> {comment.data.author}</strong>
                <p>{comment.data.body}</p>
                </div>
              ))}
             </div>
            )}
            <div className='add-ons'>
             <p>{formatNumber(post.data.score)}</p> 
                         
            <button onClick={() => togglecomments(post.data.permalink)} className='commentsbutton'>
              <img src='comments.png' alt="comments"/>
              </button>
            </div>

            
          </li>
        ))}
      </ul>

      </div>

      </main>
    </div>
    
  );
}

export default App;