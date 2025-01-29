const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendListSchema = new Schema({
    
   
    user_id: {
        type: mongoose.Schema.Types.ObjectId,  // Change to ObjectId
        ref: 'User',  // Reference to the 'User' model
        required: true
    },

    added_by: {
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
    is_block: {
        type: Boolean,
        default: false
    },
   
})

const FriendListModel = mongoose.model('FriendList', FriendListSchema);
module.exports = FriendListModel;