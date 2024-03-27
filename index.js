const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;



// Create a Schema object
const Schema = mongoose.Schema;

const w24studentsSchema = new Schema({
    name: { type: String, required: true },
    studentID: { type: String, required: true }
});

const w24Student = mongoose.model("w24students", w24studentsSchema);



// This Activitry creates the collection called activitimodels

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
 // const URI ="mongodb+srv://steffipachake:1234@cluster0.oxytwjf.mongodb.net/Winter24";

  //const URI = Document.getElementById('atlasURL').value;

  //const { atlasURL } = req.body;
 const URI = req.body.myuri;

  // connect to the database and log the connection

  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        try{
          const name = "Stefanny Fernando";
          const studentID = "300371937";
                // create a new Book object 
                const newW24Student= new w24Student({
                    name,
                    studentID
                });

                // save the new object (newBook)
                newW24Student
                    .save()
                    .then(() => res.send(`<h1>Document  Added</h1>`))
                    .catch((err) => res.status(400).json("Error: " + err));

        }catch(error){
          res.status(500).json({ message: error.message });
        }

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

  // add the data to the database

  // send a response to the user
  //res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
