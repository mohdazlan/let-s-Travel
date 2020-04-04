let express = require('express');
let app = express();
let mongoose = require('mongoose')
let Post = require('./models/posts').Post;

mongoose.connect('mongodb://localhost/travels',{useNewUrlParser: true,useUnifiedTopology: true})
let post1 = new Post({
    id:5,
    title: "Monggol Man",
    date: new Date(),
    description: "Heello Me",
    text: "Hello World",
    country: "Norway",
    imageURL: "/images1.jpg"
});

post1.save();

app.use(express.static('public'));

app.listen(3000, () => console.log('System Server listening in 3000..'));