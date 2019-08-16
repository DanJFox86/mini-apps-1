const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);
  // res.sendFile(path.join(__dirname+'public/index.html'));
  res.send();
});

app.listen(port, () => console.log(`Connect4 app is listening on port ${port}`));