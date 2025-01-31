const ChatRoomModel = require('../Models/ChatRoom');
const ChatMessageModel = require('../Models/Message');


const ChatRoom = async (req, res) => {
    try {
        const { user_id } = req.body;
        const sender_id = req.user._id;
        const receiver_id = user_id;

        // Check if a chat room already exists between the two users
        const existingRoom = await ChatRoomModel.findOne({
            $or: [
                { sender_id, receiver_id },  // Check sender to receiver
                { sender_id: receiver_id, receiver_id: sender_id }  // Check receiver to sender (vice versa)
            ]
        });

        if (existingRoom) {
            return res.status(200).json({
                message: "Chat Room Already Exists",
                success: true,
                chatRoom: existingRoom
            });
        }

        // Create a new chat room if it does not exist
        const newChatRoom = new ChatRoomModel({ sender_id, receiver_id, added_by: sender_id });
        await newChatRoom.save();

        res.status(201).json({
            message: "Chat Room Created Successfully",
            success: true,
            chatRoom: newChatRoom
        });

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`,
            success: false
        });
    }
};


const ChatRoomList = async (req, res) => {
    try {
        const user_id = req.user._id; // Logged-in user's ID

        // Find all chat rooms where the user is either sender or receiver
        const chatRooms = await ChatRoomModel.find({
            $or: [{ sender_id: user_id }, { receiver_id: user_id }]
        }).populate("sender_id receiver_id", "name email"); // Fetch user details

        if (!chatRooms.length) {
            return res.status(200).json({
                message: "No Chat Rooms Found",
                success: true,
                chatRooms: []
            });
        }

        // Filter the chat rooms to exclude the logged-in user from the response
        const filteredChatRooms = chatRooms.map(chatRoom => {
            const receiverList = chatRoom.sender_id._id.toString() === user_id.toString() 
                ? chatRoom.receiver_id 
                : chatRoom.sender_id;

            return {
                _id: chatRoom._id,
                receiverList: {
                    _id: receiverList._id,
                    name: receiverList.name,
                    email: receiverList.email
                },
                authUser:{
                    
                    _id: user_id,
                    
                },
                createdAt: chatRoom.created_at
            };
        });

        res.status(200).json({
            message: "Chat Rooms Retrieved Successfully",
            success: true,
            chatRooms: filteredChatRooms
        });

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`,
            success: false
        });
    }
};


const SendMessage = async (req, res) => {
    try {
        const { receiver_id , room_id , content } = req.body;
        const sender_id = req.user._id;
        // const receiver_id = user_id;

       

        // Create a new chat room if it does not exist
        const sendMessage = new ChatMessageModel({ sender_id, receiver_id, added_by: sender_id , room_id , content });
        await sendMessage.save();

        

        res.status(201).json({
            message: "Message Successfully",
            success: true,
            data: sendMessage
        });

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`,
            success: false
        });
    }
};

const ChatHistory = async (req, res) => {
    try {

        const { room_id } = req.body;
       

       
        const chatHistory = await ChatMessageModel.find({
            room_id
        });


        if (chatHistory) {
            return res.status(200).json({
                message: "Chat History Fetched",
                success: true,
                chatHistory: chatHistory
            });
        }else{
            return res.status(200).json({
                message: "No Chat Found",
                success: true,
                chatHistory: []
            });
        }

        

    } catch (error) {
        res.status(500).json({
            message: `Internal Server Error: ${error}`,
            success: false
        });
    }
};

module.exports = {
    ChatRoom,
    ChatRoomList,
    SendMessage,
    ChatHistory
   
}
