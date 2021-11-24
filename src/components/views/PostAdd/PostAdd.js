import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getLoggedUser } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NotFound } from '../NotFound/NotFound.js';

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

const Component = function({className, children,loggedUser}) {
  const classes = useStyles();
  console.log('------',loggedUser);
  return(
    loggedUser ? <div className={clsx(className, styles.root)}>
      <form noValidate autoComplete="off" className={classes.root}>
        <TextField className={classes.item} id="title" label="Title" variant="outlined"  required fullWidth multiline/>
        <TextField className={classes.item} id="content" label="Content" variant="outlined"  required fullWidth multiline/>
        <TextField className={classes.item} id="email" label="Email" variant="outlined"  required fullWidth/>
        <TextField className={classes.item} id="photo" label="Link to photo" variant="outlined"   fullWidth multiline/>
        <TextField className={classes.item} id="price" label="Price" variant="outlined"   fullWidth/>
        <TextField className={classes.item} id="phone" label="Phone number" variant="outlined"  fullWidth/>  
        <TextField className={classes.item} id="location" label="Location" variant="outlined"   fullWidth/>    
        <Button className={classes.submitButton} variant="contained" color="primary" type='submit'>Create</Button>
      </form>
    </div> : <NotFound />
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loggedUser: PropTypes.string,
};

const mapStateToProps = state => ({
  loggedUser: getLoggedUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
