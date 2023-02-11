const Post = require('../models/Post');
const moment = require('moment');

exports.getAllPosts = async (req, res) => {

  console.log(req.query);

  const page = req.query.page || 1;
  const postPerPage = 2;
  const totalPosts = await Post.find().countDocuments();

  const posts = await Post.find({})
  .sort('-dateCreated')
  .skip((page - 1) * postPerPage)
  .limit(postPerPage);

  res.render('index',{
    moment:moment,
    posts:posts,
    current:page,
    pages: Math.ceil(totalPosts / postPerPage),
  })
  // const posts = await Post.find({}).sort('-dateCreated');
  // res.render('index', {
  //   posts,
  //   moment,
  // });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
    moment,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.detail = req.body.detail;
  post.save();
  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
