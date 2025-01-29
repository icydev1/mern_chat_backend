const mongoose = require('mongoose');

// Define ChatMessage Schema
const chatMessageSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom', // Reference to the ChatRoom model
    required: true
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for sender
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for receiver
    required: true
  },
  content: {
    type: String,
    default: null,
    required: false
  },
  image: {
    type: String,
    default: null,
    required: false
  },
  is_message_read: {
    type: Boolean,
    default: false
  },
  is_message_block: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 0, // 0 means active, you can define more statuses based on your use case
  },
  
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const ChatMessageModel = mongoose.model('Message', chatMessageSchema);

module.exports = ChatMessageModel;
