const express = require('express');
const fs = require('file-system');
// const bodyParser = require('body-parser');
const _ = require('underscore');
// const multer = require('multer');
// const upload = multer();

// var bb = require('express-busboy');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;

app.use(fileUpload());
// bb.extend(app);

// bb.extend(app, {
//     upload: true,
//     path: '/here',
//     allowedPath: /./
// });



app.use(express.static('client')); 

// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/submit', (req, res) => {
  console.log(`Received a ${req.method} request from ${req.url}`);
  console.log(req.files.myfile.data.toString());
  var csvData = CSVGenerator(req.files.myfile.data.toString());

  res.send(template({'result':csvData}));
});

app.get('/index', (req, res) => {
  // console.log(`Received a ${req.method} request from ${req.url}`);
  res.send('/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// CSV Generator
var CSVGenerator = function (JSONData) {
  var csvData = '';
  if (JSONData[JSONData.length - 1] === `;`) {
    JSONData = JSONData.slice(0, JSONData.length - 1);
  }
  JSONData = JSON.parse(JSONData);
  var keys = Object.keys(JSONData);
  for (var i = 0; i < keys.length - 1; i++) {
    csvData += keys[i];
    if (i < keys.length - 2) {
      csvData += ',';
    }
  }
  csvData += '\n';
  keys.pop();
  var helper = function(node) {
    for (var i = 0; i < keys.length; i++) {
      csvData += node[keys[i]];
      if (i < keys.length - 1) {
        csvData += ',';
      }
    }
    csvData += '\n';
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        helper(node.children[i]);
      }
    }
  }
  helper(JSONData);
  csvData = csvData.slice(0, csvData.length - 1);
  return csvData;
}

var template = _.template(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>CSV Report Generator</title>
    <script src="http://localhost:3000/app.js"></script>
  </head>
  <body>
    <form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3000/submit">
      <input id="fileupload" name="myfile" type="file" />
      <input type="submit" value="submit" id="submit" />
      <br><label for="csv">CSV:</label></br>
      <br><textarea name="csv" rows="15" cols="100" value="CSV"><%= result %></textarea></br>
    </form>
  </body>
</html>`);












