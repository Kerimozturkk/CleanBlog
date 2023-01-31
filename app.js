const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

const Post = require('./models/Post');

mongoose.connect('mongodb://localhost/cleanblog-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// Template Engine
app.set('view engine','ejs');

// Middlewares
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Routes
app.get('/',async(req,res) => {
    const posts = await Post.find({});
    res.render('index',{
        posts
    });
})

app.get('/about',(req,res) => {
    res.render('about');
})

app.get('/add_post',(req,res) => {
    res.render('add_post');
})

app.get('/post',(req,res) => {
    res.render('post');
});


app.post('/posts',async(req,res) => {
    await Post.create(req.body)
    res.redirect('/');
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server port ${port} de başlatıldı...`);
})
