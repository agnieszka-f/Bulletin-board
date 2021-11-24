import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { toggleLoggingUser, getLoggedUser, showMyPosts } from '../../../redux/postsRedux.js';

import styles from './Header.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Component = function ({className, children, toggleLoggingUser, loggedUser, showMyPosts}){
  const classes = useStyles();
  const [logged, setLogged] = React.useState(loggedUser);

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static"> 
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button component={Link} to={'/'} color="inherit" onClick={
              () => showMyPosts(false)
            }>Home</Button>
          </Typography>
          { 
            logged == null ?  <Button color="inherit" onClick={ () =>{
              toggleLoggingUser('agnf@gmail.com');
              setLogged('agnf@gmail.com');
            }}>Login</Button>
              : <div>
                <Button component={Link} to={'/'} color="inherit" onClick={
                  () => showMyPosts(true)
                }>My posts</Button>
                <Button component={Link} to={'/'} color="inherit" onClick={ () =>{
                  showMyPosts(false);
                  toggleLoggingUser(null); 
                  setLogged(null);
                }}>Logout</Button> 
              </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  toggleLoggingUser: PropTypes.func,
  loggedUser: PropTypes.string,
  showMyPosts: PropTypes.func,
};

const mapStateToProps = (state,props) => ({
  loggedUser: getLoggedUser(state),
});

const mapDispatchToProps = dispatch => ({
  toggleLoggingUser: id => dispatch(toggleLoggingUser(id)),
  showMyPosts: isShow => dispatch(showMyPosts(isShow)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
