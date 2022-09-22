const express = require("express");
const path = require("path");
//const fs = require("fs");
const app = express();
 var mongoose = require('mongoose');
const bodyparser = require("body-parser");
 mongoose.connect('mongodb://localhost/contactDance' , {useNewUrlParser: true});
const port = 80;

//schema
var contactSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: String,
  email: String

});
var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
// app.use(express.static('static' , options))
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())



// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

//endpoints
app.get('/', (req, res)=>{
    const con = ""
    const params = {'title': '', "content": con}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = ""
    const params = {'title': '', "content": con}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
   const myData = new Contact(req.body);
   myData.save().then(() =>{
      res.send("Your information has been saved succesfully")
   }).catch(() =>{
       res.status(400).send("Sorry, your informations are not saved. Try entering it again")
    })

   // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 