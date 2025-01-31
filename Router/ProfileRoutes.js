// FollowUnfollow
const { FollowUnfollow, getAllFriendLists, getUserProfile } = require('../Controller/ProfileController');
const ensureAuthenticated = require('../Middleware/Auth');


const Router = require('express').Router();

Router.post('/follow-unfollow' ,ensureAuthenticated, FollowUnfollow)
// Router.get('/get-friend-lists' ,ensureAuthenticated, getAllFriendLists)
Router.post('/get-profile-data' ,ensureAuthenticated, getUserProfile)



module.exports = Router;