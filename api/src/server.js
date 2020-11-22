require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.SERVER_PORT;
//add new router
const mediaRoutes = require('./modules/media/routes');
const likeRoutes = require('./modules/like/routes');
const private_messageRoutes = require('./modules/private_message/routes');
const commentRoutes = require('./modules/comment/routes');
const postRoutes = require('./modules/post/routes');
const userRoutes = require('./modules/user/routes');
const eventRoutes = require('./modules/event/routes');
const groupRoutes = require('./modules/group/routes');
require('./config/database');
const authorize = require('./middle/authorize');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public')); 

app.get('/api/', (req, res) => {
   res.send('wellcome to fastBlock API')
})
app.get('/medias/:filename' , authorize(["user","moderator","admin"]), express.static('files'), (req, res) => {
    res.sendFile(`medias/${req.params.filename}`)
})
app.get('/groupPictures/:filename' , authorize(["user","moderator","admin"]), express.static('files'), (req, res) => {
    res.sendFile(`groupPictures/${req.params.filename}`)
})
app.get('/avatars/:filename' , authorize(["user","moderator","admin"]), express.static('files'), (req, res) => {
    res.sendFile(`avatars/${req.params.filename}`)
})
//add new route
app.use('/api/media', mediaRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/private_message', private_messageRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/group', groupRoutes);

const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);

io.on('connection', client => {
    client.on('event', data => { console.log(`new client connected: ${client}`)});
    client.on('disconnect', () => { console.log(`client ${client} as disconnected`) });
});

httpServer.listen(port, console.log(`server started on port ${port}`));