require('dotenv').config({path: ('apiConfig.env')});
const express = require('express');
const app = express();
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

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html')); 

app.get('/api/', (req, res) => {
   res.send('wellcome to fastBlock API')
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
app.listen(port, console.log(`server started on port ${port}`));