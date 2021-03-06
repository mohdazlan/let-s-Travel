
let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();

router.get("/", async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.post("/", async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if (reqBody.imageURL) {
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    //console.log(req.file);
    await newPost.save();
    resp.send('Created');
})

router.delete('/:id', async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({ id: id })
    resp.send('Deleted');
})

module.exports = router