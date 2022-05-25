//========================
//      DEPENDENCIES
//========================

const express = require("express")
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Masterpiece = require('./models/masterpiece.js')
const masterpieceSeed = require('./models/masterpieceSeed.js')
const methodOverride = require('method-override')

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


//========================
//          SEED
//========================


app.get('/masterpieces/seed', (req, res) => {
        Masterpiece.deleteMany({}, (error, allMasterpieces) => {
            Masterpiece.create(masterpieceSeed, (error, data) => {
                res.redirect('/masterpieces')
            })
        })
    })
//========================
//        INDEX
//========================

app.get('/masterpieces', (req, res) => {
    // res.send('index')
    Masterpiece.find({}, (error, allMasterpieces) => {
        res.render('index.ejs', {
            masterpieces: allMasterpieces,
        });
    });
});

//========================
//         NEW
//========================

app.get('/masterpieces/new', (req, res) => {
    res.render('new.ejs')
})

//========================
//         DELETE
//========================

app.delete('/masterpieces/:id', (req, res) => {
    Masterpiece.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/masterpieces')
    })
})

//========================
//        CREATE
//========================

app.post('/masterpieces', (req, res) => {
    // if (req.body.binged === 'on') {
    //     req.body.binged = true;
    // } else {
    //     req.body.binged = false;
    // }
    Masterpiece.create(req.body, (error, createdMasterpiece) => {
        res.redirect('/masterpieces')
    })
})

//========================
//         EDIT
//========================

app.get('/masterpieces/:id/edit', (req, res) => {
    Masterpiece.findById(req.params.id, (error, foundMasterpiece) => {
        res.render('/edit.ejs', {
            masterpiece: foundMasterpiece,
        })
    })
})

//========================
//         SHOW
//========================

app.get('/masterpieces/:id', (req, res) => {
    Masterpiece.findById(req.params.id, (err, foundMasterpiece) => {
        res.render('show.ejs', {
            masterpiece: foundMasterpiece,
        })
    })
})
//========================
//
//========================



//========================
//      LISTENING
//========================


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening on: ${PORT}')
})
