import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getLoggedUser, createPost } from '../../../redux/postsRedux.js';
import { useHistory } from "react-router";

import styles from './PostAdd.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NotFound } from '../NotFound/NotFound.js';
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

const Component = function({className, children,loggedUser, createPost}) {
  const classes = useStyles();

  const [fields, setFields] = useState({});

  const fieldChange = function(e){ 
    if(typeof e.target.id == 'undefined'){
      setFields({...fields, [e.target.name]: e.target.value});
    } else{
      setFields({...fields, [e.target.id]: e.target.value});
    }
  }

  const history = useHistory();

  const handleClick = () => {  
      createPost({...fields, author:loggedUser, created: new Date(Date.now()).toISOString(), updated: new Date(Date.now()).toISOString()});
      history.push('/');
  }

  return(
    loggedUser ? <div className={clsx(className, styles.root)}>
  <form noValidate autoComplete="off" className={classes.root}>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="title" label="Title" variant="outlined"  required fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="text" label="Text" variant="outlined" required fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="author" label="Email" variant="outlined" defaultValue={loggedUser} disabled fullWidth/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="photo" label="Link to photo" variant="outlined"  fullWidth multiline/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="price" label="Price" variant="outlined"  fullWidth/>
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="phone" label="Phone number" variant="outlined"   fullWidth/>  
          <TextField className={classes.item} onChange={(e) => fieldChange(e)} id="location" label="Location" variant="outlined"   fullWidth/>  
          <Select className={classes.item} onChange={(e) => fieldChange(e)} labelId="Status" id="status" name="status"   fullWidth variant="outlined" required >
            <MenuItem id="status" value={'draft'} >Draft</MenuItem>
            <MenuItem id="status" value={'published'} >Published</MenuItem>
            <MenuItem id="status" value={'close'} >Close</MenuItem>
           </Select>  
          <Button className={classes.submitButton} onClick={(e) => handleClick(e) } variant="contained" color="primary" type='submit'>Create</Button>
        </form>
    </div> : <NotFound />
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUser: PropTypes.string,
  createPost: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedUser: getLoggedUser(state),
});

const mapDispatchToProps = dispatch => ({
  createPost: data => dispatch(createPost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
