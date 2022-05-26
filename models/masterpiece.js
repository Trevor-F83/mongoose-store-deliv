const mongoose = require('mongoose');

const masterpieceSchema = new mongoose.Schema({
    band: { type: String, },
    title: { type: String, },
    year: {type: String, },
    description: { type: String, },
    img: { type: String, },
  
})

const Masterpiece = mongoose.model('Masterpiece', masterpieceSchema)

module.exports = Masterpiece