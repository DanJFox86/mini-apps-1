const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'checkout'
});

db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);
  // res.sendFile(path.join(__dirname+'public/index.html'));
  res.end();
});

app.post('/purchase', (req,res) =>{
  console.log(`Received a ${req.method} request from ${req.url}`);
  var queryString = `INSERT INTO BILLING(NAME, EMAIL, PASSWORD, ADDRESS, CITY, STATE, 
                     ZIPCODE, PHONENUMBER, CARDNUMBER, EXPIRATIONDATE, CVVNUMBER, CCZIP)
                     VALUES("${req.body.billingInfo.info.userInfo.name}",
                     "${req.body.billingInfo.info.userInfo.email}",
                     "${req.body.billingInfo.info.userInfo.password}",
                     "${req.body.billingInfo.info.address1 + " " + req.body.billingInfo.info.address2}",
                     "${req.body.billingInfo.info.city}",
                     "${req.body.billingInfo.info.state}",
                     ${req.body.billingInfo.info.zipcode},
                     "${req.body.billingInfo.info.phoneNumber}",
                     "${req.body.cardNumber}",
                     "${req.body.expireDate}",
                     ${req.body.cvvNumber},
                     "${req.body.cardZipcode}");`;
  // var queryString = `INSERT INTO BILLING(NAME, EMAIL, PASSWORD, ADDRESS, CITY, STATE, 
  //                    ZIPCODE, PHONENUMBER, CARDNUMBER, EXPIRATIONDATE, CVVNUMBER, CCZIP)
  //                    VALUES("Dan",
  //                    "dan@dan.dan",
  //                    "nottodaynerds",
  //                    "lets see whats going on",
  //                    "My City",
  //                    "my state",
  //                    12312,
  //                    "555-555-5555",
  //                    "1234-1234-1234-1234",
  //                    "01/02/22",
  //                    123,
  //                    "94131");`;

  // console.log(queryString);
  db.query(queryString, function(err, results) {
    // console.log(err);
    // console.log(results);

    res.send({message: 'Purchase entered into database'});
  });
  
  // res.send();
});

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));