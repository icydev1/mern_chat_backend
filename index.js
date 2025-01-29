const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Router/AuthRoutes')
const ProductRouter = require('./Router/ProductRoutes')
const PostRouter = require('./Router/PostRoutes')
require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 8080;

app.get('/ping' , (req,res) => {
    res.send(`PONG ${res}`)
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth' , AuthRouter)
app.use('/products' , ProductRouter)
app.use('/post' , PostRouter)

app.listen(PORT , () => {
    console.log(`Server Listening at ${PORT}`);
    
})