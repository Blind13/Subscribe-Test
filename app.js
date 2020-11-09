//jshisnt esversion: 6

const express = require('express');
const BodyParser = require('body-parser');
const https = require('https');
const request = require('request');

app = express();

app.use(express.static('public'));
app.use(BodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/singup.html")
})

app.post("/", function(req,res){
  AddInfoToMailChimp(req.body.email,req.body.fName,req.body.lName)


function AddInfoToMailChimp(email,fistname,lastname) {

const options = {
  'method': 'POST',
  'url': 'https://us2.api.mailchimp.com/3.0/lists/2e3679c3e1/members',
  'headers': {
    'Authorization': 'Basic QmxpbmQxMjpkZjcxMTdmODc4OTgyNTI4MDRhYzU1YjM0Mzg5NTdlNy11czI=',
    'Content-Type': 'application/json',
    'Cookie': 'ak_bmsc=0D4C95D22C2641CE7496855FF99C6D2B02142C64DB0A0000BE63A95FE9D98A0A~pli6aqAGN833IGUdNMN854G1EHLJ9xZPtkA8cHengVqGjkIpW13NnQyHnVWLmWuDvjEG1IlM3FR44MN83A+dK9GiZ230VoAUC1PSmPQ+CIY+AvLLExmh8OSy82oN7BnsZJf89ofq4PuvFwQBYPa5Wyw+wzB4vj0QUdxrk45d5/SgxaCAyLCKlctJbtwf+HdUJquShZAsy62nm+EDcRHmOjZrZ1Bl2rOPK5p4CSTKS0lks=; bm_sv=E1FB9A2AB8A24F78F8F8BF8141765FDB~PqBmCNMPj2ZmtvGi5q0EZfRtHW6wYqtmj2JKTvwou9wK/Zjgh67p2cW31XnTPx0PEf+2SYpG2xWHnTPXIBNDFB102DdzWOESco1U4yzDeXZzIkQ8nPIQI5n2Zsz3IlNXrQsSm8FXaIekAAaPEpyesK+OMdFkljEI84+99uRulyg='
  },
  body: JSON.stringify({"email_address":email,"status":"subscribed","merge_fields":{"FNAME":fistname,"LNAME":lastname}})

};
request(options, function (error, response, body) {
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/faliure.html");
  }
  console.log(body);
  console.log(response.statusCode);

});
}
})

app.post('/faliure', function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT, function () {
  console.log("Server running in port 3000");
})
