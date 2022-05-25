const mongoose = require('mongoose');

const masterpieceSchema = new mongoose.Schema({
    band: { type: String, },
    title: { type: String, },
    year: {type: String, },
    description: { type: String, },
    image: { type: String, },
    // binged: Boolean,
})

const Masterpiece = mongoose.model('Masterpiece', masterpieceSchema)

module.exports = Masterpiece