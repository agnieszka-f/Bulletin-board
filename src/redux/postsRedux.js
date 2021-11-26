import Axios from 'axios';

/* selectors */
export const getPosts = ({posts}) => posts.data

export const getLoggedUser = ({posts}) => posts.loggedUser;

export const getStatusDisplay = ({posts}) => posts.myPosts;

export const getPost =  ({posts}) => posts.data;

export const getStatusLoading = ({posts}) => posts.loading.error;
/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const TOGGLE_LOGGING_USER =  createActionName('TOGGLE_LOGGING_USER');
const SHOW_MY_POSTS = createActionName('SHOW_MY_POSTS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const toggleLoggingUser = payload => ({ payload, type: TOGGLE_LOGGING_USER });
export const showMyPosts = payload => ({ payload, type: SHOW_MY_POSTS });

/* thunk creators */
export const fetchPosts = () => {
  return (dispatch, getState) => { 
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updatePost = (data) => { 
  return (dispatch, getState) => { 
    const post = getState().posts.data; 
      Axios
        .put('http://localhost:8000/api/posts/' + post._id, {...post, ...data})
        .then(res => { 
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
  };
};

export const fetchPost = (id) => {
  return (dispatch, getState) => { 
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts/' + id)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const createPost = (data) => { 
  return (dispatch) => { 
     
      Axios
        .post('http://localhost:8000/api/posts', data)
        .then(res => { 
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
  };
};
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: { 
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: { 
      return { 
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case TOGGLE_LOGGING_USER: { 
      return {
        ...statePart, loggedUser: action.payload,
      };
    }
    case SHOW_MY_POSTS: { 
      return {
        ...statePart, myPosts: action.payload,
      };
    }
    default:
      return statePart;
  }
};
