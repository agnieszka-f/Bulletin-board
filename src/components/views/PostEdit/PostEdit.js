import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost,getLoggedUser } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotFound} from '../NotFound/NotFound';

const useStyles = makeStyles({
  root: {
    maxWidth: '50%',
    margin: '20px auto 20px auto',
  },
  item: {
    marginBottom: '15px',
  },
  submitButton: {
    display: 'block',
    float: 'right',
    marginBottom: '20px',
  },
});

const Component = function ({className, children, post, loggedUser}){
  const classes = useStyles();

  return(
    <div className={clsx(className, styles.root)}>
      {post && loggedUser ?
      
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField className={classes.item} id="title" label="Title" variant="outlined" defaultValue={post.title} required fullWidth multiline/>
          <TextField className={classes.item} id="content" label="Content" variant="outlined" defaultValue={post.content} required fullWidth multiline/>
          <TextField className={classes.item} id="email" label="Email" variant="outlined" defaultValue={post.email} required fullWidth/>
          <TextField className={classes.item} id="photo" label="Link to photo" variant="outlined" defaultValue={post.image}  fullWidth multiline/>
          <TextField className={classes.item} id="price" label="Price" variant="outlined" defaultValue={post.price}  fullWidth/>
          <TextField className={classes.item} id="phone" label="Phone number" variant="outlined" defaultValue={post.phone}  fullWidth/>  
          <TextField className={classes.item} id="location" label="Location" variant="outlined" defaultValue={post.location}  fullWidth/>    
          <Button className={classes.submitButton} variant="contained" color="primary" type='submit'>Save</Button>
        </form>
        : <NotFound />} </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  loggedUser: PropTypes.string,
};

const mapStateToProps = (state,props) => ({
  post: getPost(state, props.match.params.id),
  loggedUser: getLoggedUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
