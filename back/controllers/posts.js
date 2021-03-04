
const postsRouter = require('express').Router();
const Post = require('../models/post');
const mongoose = require('mongoose');
const { json } = require('express');

postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
     
        req.io.emit('UPDATE', posts);
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
   
    const savedPost=await Post.create({
            _id: mongoose.Types.ObjectId(),
           ...req.body.content
          });
    

        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

postsRouter.post('/like', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const posts = await Post.findById(req.body.content.id).exec();
        const oldLikes=[...posts.like]
        const checkLike=oldLikes.find(x=>x==req.body.content.user.email);
        if(checkLike)
        {
            
           
            posts.like=oldLikes.filter(x=>x!=req.body.content.user.email);
        }
        else
        {
            oldLikes.push(req.body.content.user.email)
            posts.like=oldLikes;
        }
        await posts.save();
        req.io.emit('UPDATE', await Post.find({}));
        return res.status(201).json(posts);

    }
    return res.status(403).send('Not authorized')
    
});
module.exports = postsRouter;