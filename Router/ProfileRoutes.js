// FollowUnfollow
const { FollowUnfollow, getAllFriendLists } = require('../Controller/ProfileController');
const ensureAuthenticated = require('../Middleware/Auth');


const Router = require('express').Router();

Router.post('/follow-unfollow' ,ensureAuthenticated, FollowUnfollow)
Router.get('/get-friend-lists' ,ensureAuthenticated, getAllFriendLists)



module.exports = Router;