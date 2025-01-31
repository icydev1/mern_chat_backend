// FollowUnfollow
const { ChatRoom, ChatRoomList, SendMessage, ChatHistory } = require('../Controller/MessageController');
const ensureAuthenticated = require('../Middleware/Auth');


const Router = require('express').Router();

Router.post('/create-room' ,ensureAuthenticated, ChatRoom)
Router.get('/chat-room-listing' ,ensureAuthenticated, ChatRoomList)
Router.post('/send-message' ,ensureAuthenticated, SendMessage)
Router.post('/get-chat-history' ,ensureAuthenticated, ChatHistory)


module.exports = Router;