const express = require('express');
const app = express();
const port = 3000;

//use static public directory
app.use(express.static('public'))

//use css directory
app.use(express.static('css'))

//set templating engine to pug
app.set('view engine', 'pug')

//render index page
app.get('/', (req, res) => {
  res.render('index');
})

//render about page
app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/login', (req, res) => {
  res.render('login');
})

//render 404 page
app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`express running on port ${port}`);
})