import React from "react";

const UpvoteButton = ({postId, handleUpvote}) => {
    return (
        <button onClick={() => handleUpvote(postId)}>Upvote</button>
    );
};
  
export default UpvoteButton;