import React from "react";


//render the diff types of content
const renderContent = (post) => {
  if (!post || !post.data) {
    return null;  // Return null if post or post.data is undefined
  }
   /* if (post.data.selftext) {             //text post
      return <p>{post.data.selftext}</p>;

    } */ else if (post.data.media && post.data.media.reddit_video) {
      return (
        <video controls>
          <source src={post.data.media.reddit_video.fallback_url} type="video/mp4" />;
          Your browser does not support the video tag.
        </video>
      );
       }   else if (post.data.url ||
        (post.data.url.endsWith('.jpg') || post.data.url.endsWith('.png') || post.data.url.endsWith('.gif'))){ //image post
              return <img src={post.data.url} alt="Post content" />;
  }
     else {
      return <a href={post.data.url} target="_blank" rel="noopener noreferrer">{post.data.url}</a>;
    }
  };

  export default renderContent;