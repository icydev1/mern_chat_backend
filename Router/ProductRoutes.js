const ensureAuthenticated = require('../Middleware/Auth');


const Router = require('express').Router();


Router.get('/' ,ensureAuthenticated, (req,res) => {

    console.log('logged in user detail ' , req.user)

    res.status(200).json([
        {
            name:'Mobile',
            price: 2000
        },
        {
            name:'TV',
            price: 45000
        }
    ])

})




module.exports = Router;