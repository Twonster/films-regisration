const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const { SERVER_DATA } = require('./config/default')
const authRouter = require('./routes/auth.routes')

const PORT = SERVER_DATA.server_port

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

const start = async () => {
    try {
        mongoose.connect(SERVER_DATA.database_url)
        
        app.listen(PORT, () => {
            console.log("server started on:", PORT)
        })
    } catch (error) {
        console.log("error:",error)
    }
}

start()
