const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer({ dest: 'public/upload'});

const port = 3000;

require('dotenv').config();

//use static public directory
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: add validator

app.post('/account', upload.single('avatar'), (req, res) => {
  console.log(req.body)

  //TODO: add account update succes or error messages
  //res.redirect('back');
})

//set templating engine to pug
app.set('view engine', 'pug');

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

