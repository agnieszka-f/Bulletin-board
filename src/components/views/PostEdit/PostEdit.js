import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router";
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost,getLoggedUser, fetchPost, updatePost } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotFound} from '../NotFound/NotFound';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

const Component = function ({className, children, post, loggedUser, fetchPost, match: { params: {id}}, updatePost}){
  const classes = useStyles();

  useEffect(() => {
    const getResult = async () =>{
      await fetchPost(id);
    };
    getResult(); 
  }, [fetchPost, id]);
  
  const [fields, setFields] = useState({author:loggedUser});

  const [status, setStatus] = useState(post.status);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const fieldChange = function(e){ 
    setFields({...fields, [e.target.id]: e.target.value});
  }
  
  const history = useHistory();

  const handleClick = () => {
      updatePost({...fields, status, updated: new Date(Date.now()).toISOString() });
      history.push('/post/'+post._id);
  }

  return(
    <div className={clsx(className, styles.root)}>
      {post && loggedUser ?
      
        <form noValidate autoComplete="off" className={classes.root}>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="title" label="Title" variant="outlined" defaultValue={post.title} required fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="text" label="Text" variant="outlined" defaultValue={post.text} required fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="author" label="Email" variant="outlined" defaultValue={post.author} disabled fullWidth/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="photo" label="Link to photo" variant="outlined" defaultValue={post.photo}  fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="price" label="Price" variant="outlined" defaultValue={post.price}  fullWidth/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="phone" label="Phone number" variant="outlined" defaultValue={post.phone}  fullWidth/>  
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="location" label="Location" variant="outlined" defaultValue={post.location}  fullWidth/>  
          <Select className={classes.item} label="Status" id="status" name="status" value={status} onChange={handleChange} fullWidth variant="outlined" required >
            <MenuItem id="status" value={'draft'} >Draft</MenuItem>
            <MenuItem id="status" value={'published'} selected >Published</MenuItem>
            <MenuItem id="status" value={'close'} >Close</MenuItem>
           </Select> 
          <Button className={classes.submitButton} onClick={() => handleClick() } variant="contained" color="primary" type='submit'>Save</Button>
        </form>
        : <NotFound />} </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  loggedUser: PropTypes.string,
  fetchPost: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state,props) => ({
  post: getPost(state),
  loggedUser: getLoggedUser(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id)),
  updatePost: data => dispatch(updatePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
