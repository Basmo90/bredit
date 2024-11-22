import axios from 'axios';

const REDDIT_API_URL = 'https://www.reddit.com';

export const fetchRedditPosts = async (query = '') => {
    try {
        const url = query ? `${REDDIT_API_URL}/search.json?q=${query}&restrict_sr=1` : `${REDDIT_API_URL}/.json`;
        const response = await axios.get(url);
        
        console.log('API Response: ', response.data);
        let posts = response.data.data.children;
        //sort posts by score in descending order and limit to 30 results
        posts = posts.sort((a,b) => b.data.score - a.data.score).slice(0,30);
        return posts;
    } catch (error){
        console.error('Error fetching data: ', error)
        throw error;
    }
};

export const fetchRedditComments = async (postId) => {
    try {
        const response = await axios.get(`${REDDIT_API_URL}${postId}.json`);
        const comments = response.data[1].data.children.slice(0,10);
        return comments;
    } catch (error) {
        console.error('Error fetching comments: ', error);
        throw error;
    }
};