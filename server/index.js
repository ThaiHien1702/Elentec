require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/users')
const postRouter = require('./routes/ports')


const connectDB = async () => {
    try {
        const mongoURL = 'mongodb://localhost:27017/MERN'

        await mongoose.connect(mongoURL,{
            // useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (error) {
      console.log(error.message)
      console.log('MongoDB faill')
      process.exit(1)
    }
}
connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)

const POST = 5000
app.listen(POST, () =>{
    console.log(`Example app listening at http//localhost:${POST}`)
})
