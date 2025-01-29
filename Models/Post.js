const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        required: true
    },
   
    user_id: {
        type: mongoose.Schema.Types.ObjectId,  // Change to ObjectId
        ref: 'User',  // Reference to the 'User' model
        required: true
    },
    
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Boolean,
        default: false
    },
   
})

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;