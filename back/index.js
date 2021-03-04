const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');


const app = express();

app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require("http").Server(app);
const socketio = require("socket.io")

// socket.io
io = socketio(server , {
    cors: {
      origin: '*',
    }});
// now all request have access to io
app.use(function (req, res, next) {
  req.io = io;
  next();
});

mongoose.connect(
    'mongodb+srv://ahsan199715:P2vocW8rhp579z6Q@cluster0.tgbkd.mongodb.net/Cluster0?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));


app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello ynov toulouse');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});
