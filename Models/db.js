const mongoose = require('mongoose');
const mongo_url  = process.env.MONGO_DB;


mongoose.connect(mongo_url).then(() =>{
    console.log(`DB is connected`);
}).catch((err) => {
    console.log(`Mongo Connection error : ${err}`);
    
})