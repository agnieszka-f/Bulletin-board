const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find()
      .select('author created title photo text location status')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id', async (req, res) => {
  const {author, created, updated, status, title, text, photo, price, phone, location} = req.body;
  
  try {
    const result = await Post.findById(req.params.id);
    if(result){
      await Post.updateOne({_id: result._id}, { $set: {author:author, created:new Date(created), updated:new Date(updated), status:status, title:title, text:text, photo:photo, price:Number(price), phone:phone, location:location} });
      res.json(await Post
        .findById(result._id));
    } else res.status(404).json({ post: 'Not found' });
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => { 
  const {author, created, updated, status, title, text, photo, price, phone, location} = req.body;
  try {
    const newPost = new Post({author:author, title:title, text:text, status:status, created:new Date(created), updated:new Date(updated), photo:photo, price:price, phone:phone, location:location});
    await newPost.save();
    const result = await Post.findById(newPost._id);
    if(result) res.json(result);
    else res.status(404).json({ post: 'Not found' });
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
