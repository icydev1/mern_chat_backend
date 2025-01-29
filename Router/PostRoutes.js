const { UploadPost, getAllPosts } = require('../Controller/PostController');
const ensureAuthenticated = require('../Middleware/Auth');


const Router = require('express').Router();

Router.post('/upload-post' ,ensureAuthenticated, UploadPost)
Router.get('/get-all-posts' ,ensureAuthenticated, getAllPosts)



module.exports = Router;