import logo from './Breddit logo.png';
import './index.css';
import React, {useState, useEffect, useCallback } from 'react';
import { fetchRedditComments, fetchRedditPosts } from './components/api';
import SearchBar from './components/searchBar';
import renderContent from './components/render';
//import UpvoteButton from './components/votes';




function App() {
 
const [posts, setPosts] = useState([]);
const [query, setQuery] = useState('');//default empty query
const [comments, setComments] = useState({});
const [expandedPost, setExpandedPost] = useState(null);//track which post is expanded
//const [upvotes, setUpvotes] = useState({});//state to track upvotes

const getData = useCallback(async () => {
  try {
  const redditPosts = await fetchRedditPosts(query);
  console.log('Fetched Posts:', redditPosts);
  setPosts(redditPosts);
  } catch (error){
    console.error('Error fetching post:', error);
  }
}, [query]); //include query in dependancy array

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };
  const handleClick = () => {
    setQuery(''); // clear the query to fetch the latest post.
    getData();
  };
  
//function to transform number of upvotes to nearest hundred

 const formatNumber = (num) => {
  if (num>=1000) {
    return (num/1000).toFixed(1) + 'k';
  }
  return num;
};

const togglecomments = async(postId) => {
  if (expandedPost === postId) {
    setExpandedPost(null);
  } else {
    const postComments = await fetchRedditComments(postId);
  setComments((prevComments) => ({
    ...prevComments, 
    [postId]: postComments, 
  }));
  setExpandedPost(postId);
}
};

//change the number of upvotes

/*const handleUpvote = (postId) => { 
  setUpvotes((prevUpvotes) => (
      { ...prevUpvotes, [postId]: (prevUpvotes[postId] || 0) + 1, })
  ); 
};*/

  return (
    <div>
      <header className="App-Header">

        <div id='title' onClick={handleClick}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1><span>B</span>redit</h1>
        </div>

        <div className='search'>
          <SearchBar onSearch={handleSearch}/>
        </div>

      </header>

      <main>

        <div className="articles">

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

            {/*//format number with upvote button//
            <p>{formatNumber(post.data.score + (upvotes[post.data.is] || 0))}</p> 
            <UpvoteButton postId={post.data.id} handleUpvote={handleUpvote}/>*/}
          </li>
        ))}
      </ul>

      </div>

      </main>
    </div>
    
  );
}

export default App;