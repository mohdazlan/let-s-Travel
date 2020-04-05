let express = require('express');
let app = express();
let mongoose = require('mongoose')
let Post = require('./models/posts').Post;

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.json());

let id = 6;

app.get("/posts", async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

app.post("/posts", async (req, resp) => {
    let reqBody = req.body;
    let newPost = new Post({
        id: id++,
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: reqBody.imageUrl
    })
    await newPost.save();
    resp.send('Created');
})


app.use(express.static('public'));

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