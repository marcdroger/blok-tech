const express = require('express');
const app = express();

const port = 3000;

//use static public directory
app.use(express.static('public'))

//set templating engine to pug
app.set('view engine', 'pug')

//render index page
app.get('/', (req, res) => {
  res.render('index');
})

//render account page
app.get('/account', (req, res) => {
  res.render('account');
})

//render 404 page
app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`express running on port ${port}`);
})