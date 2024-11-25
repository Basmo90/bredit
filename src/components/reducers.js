import { combineReducers } from "redux";
import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
} from './api';
import {
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
} from './api';

const initialState = {
    loading: false,
    posts: [],
    comments: [],
    error: '',
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: '',
                };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                posts: [],
                error: action.payload,
            };
        case FETCH_COMMENTS_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case FETCH_COMMENTS_SUCCESS:
            return{
                ...state,
                loading: false,
                comments: {
                    ...state.comments,
                    [action.payload.postId]: action.payload.comments,
                },
                error: '',
            };
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;            
    }
};





const rootReducer = combineReducers({
    posts: postsReducer,
});

export default rootReducer;