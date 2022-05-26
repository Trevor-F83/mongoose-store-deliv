//========================
//      DEPENDENCIES
//========================

const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
// const Masterpiece = require('./models/masterpiece.js')

const methodOverride = require('method-override')
const masterpiecesController = require('./controllers/masterpieces')

//========================
//  DATABASE CONNECTIONS
//========================

mongoose.connect(process.env.DATABASE_URL, {
   // useNewParser: true,
    useUnifiedTopology: true,
});

//=================================
//DATABASE CONNECTION ERROR/SUCCESS
//=================================

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'))
db.on('connected', () => console.log('mongo connected'))
db.on('dissconnected', () => console.log('mongo dissconnected'))

//==========================
//      MIDDLEWARE
//==========================

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/masterpieces', masterpiecesController)
//========================
//          SEED
//========================



//========================
//
//========================



//========================
//      LISTENING
//========================


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`)
})
