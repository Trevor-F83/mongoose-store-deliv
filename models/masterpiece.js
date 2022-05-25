const mongoose = require('mongoose');

const masterpieceSchema = new mongoose.Schema({
    title: { type: String, },
    author: { type: String, },
    description: { type: String, },
    image: { type: String, },
    binged: Boolean,
})

const Masterpiece = mongoose.model('Masterpiece', masterpieceSchema)

module.exports = Masterpiece