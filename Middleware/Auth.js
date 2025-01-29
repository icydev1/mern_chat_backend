const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req,res,next) => {

    const auth = req.headers['authorization']

    if(!auth){
        return res.status(403).json(
           {
            message : 'UnAuthorized , JWT Token is Required',
            status : false
           }
        )
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json(
            {
             message : 'UnAuthorized , JWT Token is wrong or expired',
             status : false
            }
         )
    }

}

module.exports = ensureAuthenticated;