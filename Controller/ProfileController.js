const FriendListModel = require('../Models/FriendList')


const FollowUnfollow = async (req,res) => {

    
    try {


    const {user_id} = req.body;
    const added_by = req.user._id;


    const user = await FriendListModel.findOne({ user_id, added_by }); // Await the query
    let userMessage;
    let status;
    
    if (user) {
        await user.deleteOne(); // Corrected from `user.delete()`
        userMessage = 'User unfollowed';
        status = false
    } else {
        const friendListModel = new FriendListModel({ user_id, added_by });
        await friendListModel.save();
        userMessage = 'User followed';
        status = true
    }

    

    res.status(201)
            .json({
                message : userMessage, 
                data : status, 
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



const getAllFriendLists = async (req, res) => {
    try {
       

        const lists = await FriendListModel.find({added_by})
        .sort({ created_at: -1 })       
        // .limit(50)                      
        .populate('user_id', 'name email')  
        .exec(); 
        
       
        
        // Check if posts exist
        if (lists.length === 0) {
            return res.status(404).json({
                message: "No friends found",
                success: false
            });
        }

        res.status(200).json({
            message: "Friends fetched successfully",
            success: true,
            posts: posts // Returning the fetched posts
        });

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error : ${error.message}`,
            success: false
        });
    }
}





module.exports = {
    FollowUnfollow,
    getAllFriendLists,
    
}
