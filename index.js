const express = require('express')
const mongoose = require('mongoose')
const AuthRoutes = require('./routes/auth')
const cors = require('cors')

const app = express();

const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE

const LIVE_DD = `mongodb+srv://seinde4:${PASSWORD}@cluster0.pp8yv.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
const STAGING = 'mongodb://localhost:27017/verido'

const DB =  LIVE_DD

mongoose.connect(DB,
    {    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => res.json({message: "success"}))

app.use('/user', AuthRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))