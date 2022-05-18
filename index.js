const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer({ dest: 'public/upload'});

const mongo = require('mongodb');

const port = process.env.DB_PORT || 3000;

require('dotenv').config();

//use static public directory
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

mongo.MongoClient.connect(url, (err, client) => {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
  console.log('connect');
})

//TODO: add validator data later?
app.post('/account', upload.single('avatar'), (req, res) => {
  console.log(req.body);

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

