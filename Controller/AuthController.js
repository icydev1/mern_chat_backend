const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/User");
const FriendListModel = require('../Models/FriendList');

const signup = async (req,res) => {
    
    try {

        const {name , email , password} = req.body;

        const user = await UserModel.findOne({email}) 

        if(user) {
            return res.status(409)
            .json({
                message : "User is Already Exist , You Can Login ", 
                success: false
            })
        }

        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password, 10)

        await userModel.save();

        res.status(201)
            .json({
                message : "Signup Successfully , You can login now", 
                success: true
            })

        
    } catch (error) {
        res.status(500)
        .json({
            message : `Internal Server Error : ${error}`, 
            success: false
        })
    }

}

const login = async (req,res) => {
    
    try {

        const { email , password} = req.body;

        const errorMessage = "Incorrect email or password"

        const user = await UserModel.findOne({email}) 

        if(!user) {
            return res.status(403)
            .json({
                message : errorMessage, 
                success: false
            })
        }

        const isPassword = await bcrypt.compare(password , user.password)

        if(!isPassword) {
            return res.status(403)
            .json({
                message : errorMessage, 
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {
            email : user.email ,
            _id: user._id ,
            },
            process.env.JWT_SECRET,
            {expiresIn : '24h'},
        )

        res.status(201)
            .json({
                message : "Login Successfully", 
                success: true ,
                jwtToken,
                email,
                name: user.name,
            })

        
    } catch (error) {
        res.status(500)
        .json({
            message : `Internal Server Error : ${error}`, 
            success: false
        })
    }

}


const getProfile = async (req,res) => {
    
    console.log('logged in user detail ' , req.user)
    
    const email = req.user.email
    
    const user = await UserModel.findOne({email}) 

    const friendlist = await FriendListModel.find({ added_by: user._id });

    const response = {
        user: user,          // Include the user data
        friendlist: friendlist  // Include the friendlist data
    };

        if(user) {
            return res.status(200)
            .json({
                message : "User is Fetched", 
                success: true,
                data: response,
            })
        }
}



module.exports = {
    signup,
    login,
    getProfile,
    
}