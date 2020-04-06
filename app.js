let express = require('express');
let app = express();
let mongoose = require('mongoose')
let multer = require('multer');
let postsRouter = require('./routes/posts');

//console.log(uniqid());

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({ storage: imageStorage }).single('imageFile'));

//let id = 6;
app.use(express.static('public'));

app.use('/posts', postsRouter);
app.listen(3000, () => console.log('System Server listening in 3000..'));


// let post1 = new Post({
//     id:5,
//     title: "Monggol Man",
//     date: new Date(),
//     description: "Heello Me",
//     text: "Hello World",
//     country: "Norway",
//     imageURL: "/images1.jpg"
// });
//post1.save();