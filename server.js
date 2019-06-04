// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
//Require Mongoose 
const mongoose = require('mongoose');
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Require path
const path = require('path');
// Integrate body-parser with our App
app.use(bodyParser.json());
useNewUrlParser: true
// // Setting our Static Folder Directory
app.use(express.static(__dirname + '/public/dist/public'));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Use native promises (only necessary with mongoose versions <= 4)
mongoose.Promise = global.Promise;

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/authorsDemo');
// mongoose.connect('mongodb://localhost/authors');
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: 3
    }
}, { timestamps: true })
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author is required"],
        minlength: 3
    },
    books: [BookSchema]
}, { timestamps: true })

mongoose.model('author', AuthorSchema);
const Author = mongoose.model('author')

// Routes
// Root Request

//get ALL
app.get('/authors', (req, res) => {
    let allauthors = Author.find({}, function (err, data) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success", 'allAuthors': data });
        }
    })
})
//Retrieve
app.get('/authors/:id', (req, res) => {
    const id = req.params.id;
    Author.findOne({ _id: id }, function (err, author) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success", author: author });
        }
    })
})
// Create 
app.post('/authors', (req, res) => {
    console.log(req.body);
    const author = new Author({ name: req.body.name});
    author.save(function (err) {
        if (err) {
            res.json({ message: "error with the query.", error: err });
        } else {
            res.json({ message: "success" });
        }
    })
})

app.post('/authors/books/new/:id', (req, res) =>{
    const id=(req.params.id)
    //Find one and push it to the array
    Author.findByIdAndUpdate(id, {$push:{books:{title: req.body.title}}})
    .then(data =>{res.json({ message: "success", author: author })})
    .catch(err =>{res.json({ message: "error", error: err });})
})
//update
app.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    Author.update({ _id: id }, {name: req.body.name}, function (err, author) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success", author: author });
        }
    })
})
//delete
app.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    Author.remove({ _id: id }, function (err) {
        if (err) {
            res.json({ message: "error", error: err });
        } else {
            res.json({ message: "success" });
        }
    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
