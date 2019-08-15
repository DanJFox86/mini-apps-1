const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);
  // res.sendFile(path.join(__dirname+'public/index.html'));
  res.send();
});

app.get('/f1', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);

  res.send();
});

app.post('/purchase', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);
  console.log(`BODDDDYYYY: `, req.body);
  res.send();
  // res.send();
});

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));