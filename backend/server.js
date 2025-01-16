const express = require('express'); 
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); 


const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://faizanshaikh3122002:faizan123@cluster0.i7gog.mongodb.net/', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
});

mongoose.connection.on('connected', ()=>{
  console.log(`Connected to MongoDB`);
})

app.listen(PORT, ()=>{
  console.log(`App listening on PORt: ${PORT}`);
})