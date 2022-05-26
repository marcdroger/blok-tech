const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

//require the dotenv package for dotenv variables
require('dotenv').config();

//environment variables
const port = process.env.DB_PORT || 3000;
const uri = process.env.DB_URI;
const db = process.env.DB_DATABASE;
const collection = process.env.DB_COLLECTION;
const mapboxAPI = process.env.MAPBOX_KEY;


//use static public directory
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//TODO: add validator data later?
app.post('/account', (req, res) => {
  console.log(req.body);

  //TODO: add account update succes or error messages
  //res.redirect('back');
})

//connect to MongoDB database
async function connectMongo() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    client.db(process.env.DB_DATABASE);
  } catch (error) {
    throw error;
  }
}

//set templating engine to pug
app.set('view engine', 'pug');

//render index page
app.get('/', async (req, res) => {
  //const students = await db.collection(process.env.DB_COLLECTION).find({},{}).toArray();

  //console.log(students)

  res.render('index', {
    mapboxAPI
  });
})

//render account page
app.get('/account', (req, res) => {
  res.render('account');
})

//render 404 page
app.use((req, res) => {
  res.status(404).render('404');
})

//listen on port for changes
app.listen(port, () => {
  console.log(`express running on port ${port}`);

  //check if mongoDB connection succes
  //connectMongo().then(console.log('Connected to MongoDB'));
})

