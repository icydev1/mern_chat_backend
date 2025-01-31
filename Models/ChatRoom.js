const mongoose = require('mongoose');

// Define the ChatRoom Schema
const chatRoomSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model for sender
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model for receiver
    required: true
  },
  status: {
    type: Number,
    default: 0,  // 0 for active, modify status codes as needed
    required: true
  },
  // is_room_deleted: {
  //   type: Number,
  //   default: 0,  // 0 for active, modify status codes as needed
  //   required: true
  // },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model who added the chat room
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now  // Timestamp for creation
  },
  updated_at: {
    type: Date,
    default: Date.now  // Timestamp for the last update
  }
});

// Create and export the model
const ChatRoomModel = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoomModel;
