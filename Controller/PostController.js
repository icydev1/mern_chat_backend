const PostModel = require('../Models/Post')


const UploadPost = async (req,res) => {

    
    try {
    const {content} = req.body;

    // console.log('logged in user detail ' , req.user)
    
    const user_id = req.user._id;

    const postModel = new PostModel({content,user_id});
    // postModel.password = await bcrypt.hash(password, 10)

    await postModel.save();

    res.status(201)
            .json({
                message : "Post Successfully", 
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


const getAllPosts = async (req, res) => {
    try {
       

        const posts = await PostModel.find()
        .sort({ created_at: -1 })       
        .limit(50)                      
        .populate('user_id', 'name email')  
        .exec(); 
        
        console.log(posts, 'postsposts');
        
        

        // Check if posts exist
        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found",
                success: false
            });
        }

        res.status(200).json({
            message: "Posts fetched successfully",
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
    UploadPost,
    getAllPosts
}
