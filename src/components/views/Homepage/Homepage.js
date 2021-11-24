/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllPosts, getPublishedPosts,  getMyPosts, getLoggedUser, getStatusDisplay } from '../../../redux/postsRedux.js';
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

const Component = function({className, children, posts, publishedPosts, myPosts, loggedUser,display }){
  const classes = useStyles();

  if(loggedUser && display) return (
    <div className={clsx(className, styles.root)}>
      <Button className={classes.addNew} component={Link} to={'/post/add'} variant="contained" color="primary" >Add new post</Button>
      {
        myPosts.map( post => 
          <Post post={post}/>
        )
      }
    </div>      
  );
  else return (
    <div className={clsx(className, styles.root)}>
      {
        publishedPosts.map( post => 
          <Post post={post}/>
        )
      }
    </div>  
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  publishedPosts: PropTypes.array,
  myPosts: PropTypes.array,
  loggedUser: PropTypes.string,
  display: PropTypes.bool,
};

const mapStateToProps = state => ({
  publishedPosts: getPublishedPosts(state),
  posts: getAllPosts(state),
  myPosts:getMyPosts(state),
  loggedUser: getLoggedUser(state),
  display: getStatusDisplay(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
