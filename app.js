const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

const app = express();

mongoose.connect('mongodb+srv://kerim:So3veJEqcRniV38L@cluster0.pwnb7gp.mongodb.net/cleanblog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected')).catch((e) => console.log(e));

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);


app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server port ${port} de başlatıldı...`);
});
