const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    n_person: Number,
    n_room: Number,
    price: Number,
    description: String,
    name: String,
    image: String
});

exports.Room = mongoose.model("Room", roomSchema);