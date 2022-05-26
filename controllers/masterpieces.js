
const express = require('express')
const Masterpiece = require('../models/masterpiece')
const router = express.Router()
const masterpieceSeed = require('../models/masterpieceSeed.js')






router.get('/seed', (req, res) => {
    Masterpiece.deleteMany({}, (error, allMasterpieces) => {})
        Masterpiece.create(masterpieceSeed, (error, data) => {
            res.redirect('/masterpieces')
        })
    
})
//========================
//        INDEX
//========================

router.get('/', (req, res) => {
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

router.get('/new', (req, res) => {
res.render('new.ejs')
})

//========================
//         DELETE
//========================

router.delete('/:id', (req, res) => {
Masterpiece.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/masterpieces')
})
})

//========================
//        UPDATE
//========================

router.put('/:id', (req, res) => {
    Masterpiece.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedMasterpiece) => {
            res.redirect( `/masterpieces/${req.params.id}`)
        }
    )
})
//========================
//        CREATE
//========================

router.post('/', (req, res) => {
Masterpiece.create(req.body, (error, createdMasterpiece) => {
    res.redirect('/masterpieces')
})
})

//========================
//         EDIT
//========================

router.get('/:id/edit', (req, res) => {
Masterpiece.findById(req.params.id, (error, foundMasterpiece) => {
    res.render('edit.ejs', {
        masterpiece: foundMasterpiece,
    })
})
})

//========================
//         SHOW
//========================

router.get('/:id', (req, res) => {
Masterpiece.findById(req.params.id, (error, foundMasterpiece) => {
    res.render('show.ejs', {
        masterpiece: foundMasterpiece,
    })
})
})

module.exports = router