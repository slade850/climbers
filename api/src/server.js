require('dotenv').config({path: `apiConfig.env`});
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.SERVER_PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output');
//add new router
const levelRoutes = require('./modules/level/routes');
const groupMessageRoutes = require('./modules/groupMessage/routes');
const climberProfileRoutes = require('./modules/climberProfile/routes');
const climberPracticeTypeRoutes = require('./modules/climberPracticeType/routes');
const strongPointRoutes = require('./modules/strongPoint/routes');
const themeRoutes = require('./modules/theme/routes');
const mediaRoutes = require('./modules/media/routes');
const likeRoutes = require('./modules/like/routes');
const private_messageRoutes = require('./modules/private_message/routes');
const commentRoutes = require('./modules/comment/routes');
const postRoutes = require('./modules/post/routes');
const userRoutes = require('./modules/user/routes');
const eventRoutes = require('./modules/event/routes');
const groupRoutes = require('./modules/group/routes');
require('./config/database');
require('./config/redis');
const redis = require('./config/redis');
//const jwt = require('jsonwebtoken');
const authorize = require('./middle/authorize');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public')); 

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/api/', (req, res) => {
    res.send('wellcome to fastBlock API')
})
//serve static medias files
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
app.use('/api/level', levelRoutes);
app.use('/api/group-message', groupMessageRoutes);
app.use('/api/profile', climberProfileRoutes);
app.use('/api/practice-type', climberPracticeTypeRoutes);
app.use('/api/strong-point', strongPointRoutes);
app.use('/api/theme', themeRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/private-message', private_messageRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/group', groupRoutes);

//create http server
const httpServer = http.createServer(app);
//bind socket.io to http server
const io = require('socket.io')(httpServer, {
    pingInterval: 10000, // set ping intervel in ms
    pingTimeout: 5000 // set ping timeout in ms
});

//attach io to app.io object for global use 
app.io = io;

io.on('connection', client => {
    console.log(console.log(`new client connected: ${client.id}, at: ${client.handshake.address}`));
    client.on('connect', data => console.log(data));
    /* client.on('register', data => {
        redis.set(data, client.id, (err, rep) => { err ? console.log(err) : console.log(rep)});
    }); */
    client.on('event', data =>  console.log(data));
    client.on('disconnect', () => { console.log(`client ${client.id} as disconnected`) });
});


httpServer.listen(port, console.log(`server started on port ${port}`));