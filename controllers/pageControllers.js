const Post = require('../models/Post');

exports.getAboutPage = async (req, res) => {
  res.render('about');
};

exports.getAddPage = async (req, res) => {
  res.render('add_post');
};

exports.getEditPage = async (req, res) => {
  // console.log(req.params.id);
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};
