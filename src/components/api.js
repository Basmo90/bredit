import axios from 'axios';

const REDDIT_API_URL = 'https://www.reddit.com';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
})

export const fetchPostsFailure = (error) => ({
    type: FETCH_POSTS_FAILURE,
    payload: error,
});


export const fetchRedditPosts = (query = '') => async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
        const url = query ? `${REDDIT_API_URL}/search.json?q=${query}&restrict_sr=1` : `${REDDIT_API_URL}/.json`;
        const response = await axios.get(url);
        
        console.log('API Response: ', response.data);

        let posts = response.data.data.children;
        //sort posts by score in descending order and limit to 30 results
        posts = posts.sort((a,b) => b.data.score - a.data.score).slice(0,30);
        dispatch(fetchPostsSuccess(posts));
    } catch (error){
        console.error('Error fetching posts: ', error.message);
        dispatch(fetchPostsFailure(error.message));
    }
};

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const fetchCommentsRequest = () => ({
    type: FETCH_COMMENTS_REQUEST,
});
export const fetchCommentsSuccess = (postId, comments) => ({
    type: FETCH_COMMENTS_SUCCESS,
    payload: {postId, comments},
});
export const fetchCommentsFailure = (postId, error) => ({
    type: FETCH_COMMENTS_FAILURE,
    payload: {postId, error},
});

export const fetchRedditComments = (postId) => async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
        const response = await axios.get(`${REDDIT_API_URL}${postId}.json`);
        const comments = response.data[1].data.children.slice(0,10);
        dispatch(fetchCommentsSuccess(postId, comments));
    } catch (error) {
        console.error('Error fetching comments: ', error.message);
        dispatch(fetchCommentsFailure(postId, error.message));
    }
};