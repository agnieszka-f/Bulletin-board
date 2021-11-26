/* eslint-disable react/jsx-key */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchPosts, getPosts, getLoggedUser, getStatusDisplay, getStatusLoading } from '../../../redux/postsRedux.js';
import {Post} from '../Post/Post.js';
import styles from './Homepage.module.scss';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  addNew: {
    margin: '20px auto 20px auto',
    display: 'block',
    width: '200px',
    textAlign: 'center',
  },
});

const Component = function({className, children, posts, loggedUser,display, fetchPosts, loading }){
  const classes = useStyles();
 
  useEffect(() => {
    const getResult = async () =>{
      await fetchPosts();
    };
    getResult();
  }, [fetchPosts]);

  if(loggedUser && display && !loading) return (
    <div className={clsx(className, styles.root)}>
      <Button className={classes.addNew} component={Link} to={'/post/add'} variant="contained" color="primary" >Add new post</Button>
      {
        posts && posts.length > 0 ? posts.map( post => post.author == loggedUser ?
          <Post post={post}/>:''
         ):''
      }
    </div>      
  );
  else if (loading) return (
    <div className={clsx(className, styles.root)}>
      Connection faild
    </div>
  );
  else return (
    <div className={clsx(className, styles.root)}>
      {
        posts && posts.length > 0 ? posts.map( post => post.status == 'published' ?
          <Post post={post}/>:''
        ):''
      }
    </div>  
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.any,
  loggedUser: PropTypes.string,
  display: PropTypes.bool,
  fetchPosts: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  loggedUser: getLoggedUser(state),
  display: getStatusDisplay(state),
  loading: getStatusLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
