const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (res) => {
  res.render('index');
})

app.use((res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`express running on port ${port}`);
})