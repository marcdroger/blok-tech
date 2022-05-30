const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

//use static public directory
app.use(express.static('public'));

//use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require the dotenv package for dotenv variables
require('dotenv').config();

//environment variables
const port = process.env.DB_PORT || 3000;
const url = process.env.DB_URI;
const databaseName = process.env.DB_DATABASE;
const collection = process.env.DB_COLLECTION;
const mapboxAPI = process.env.MAPBOX_KEY;

let db;

//set templating engine to pug
app.set('view engine', 'pug');

//render index page
app.get('/', async (req, res) => {
  //get students data but skip first entry because that's the main user
  const students = await db.collection(collection).find({},{}).skip(1).toArray();

  res.render('index', {
    mapboxAPI, students
  });
})

//render account page
app.get('/account', async (req, res) => {
  const student = await db.collection(collection).findOne({},{});

  res.render('account', {
    student
  });
})

//TODO: add validator data later?
app.post('/account', async (req, res) => {

  //get parameter values from account form
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const education = req.body.education;
  const currentSchool = req.body.school;
  const countryPreference = req.body.country;

  //update first entry
  await db.collection(collection).updateOne({},
    {$set: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      education: education,
      currentSchool:
      currentSchool,
      countryPreference: countryPreference
  }});

  //refresh page
  res.redirect('back');
})

//render 404 page
app.use((req, res) => {
  res.status(404).render('404');
})

//connect to MongoDB database
async function connectDB() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    db = client.db(databaseName);
  } catch (error) {
    throw error;
  }
}

//listen on port for changes
app.listen(port, () => {
  console.log(`express running on port ${port}`);

  //check if mongoDB connection succes
  connectDB().then(console.log('Connected to MongoDB'));
})

