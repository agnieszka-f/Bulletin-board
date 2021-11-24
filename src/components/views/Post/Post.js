import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px auto 10px auto',
    maxWidth: '70%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const Component = function ({className, children, post}){
  const classes = useStyles();
  return (
    <div className={clsx(className, styles.root)}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image} component={Link} to={'/post/' + post.id}>
              <img className={classes.img} alt="complex" src={post.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {post.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {post.content.length > 100 ? post.content.substr(0, post.content.lastIndexOf(' ', 200)) + '...' : post.content}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.location ? post.location + ', ':''}
                  {post.created.getFullYear().toString() + '-' + post.created.getMonth().toString().padStart(2,'0') + '-' + post.created.getDate().toString().padStart(2,'0')}
                </Typography>
              </Grid>
              <Grid item>
                <Link to={'/post/' + post.id}>Read more...</Link>                
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{post.price ? '$'+post.price:''}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.any,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
