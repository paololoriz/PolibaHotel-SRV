const {response} = require("express");
const Room = require('../models/room').Room

module.exports = {
    getRooms: (req, res, next) => {
        Room.find({}, (error,rooms) => {
            if (error) console.log(error);
            res.send(rooms);
        });
    },

    addRoom: (req, res, next) => {
        const room = new Room({
            name: req.body.name,
            image: req.body.image,
            email: req.body.username,
            price: req.body.price,
            n_room: req.body.n_room,
            n_person : req.body.n_person,
            description: req.body.description});
        room.save((error, savedDocument) => {
            if (error) console.log(error);
            res.send(room);
        });
    },

    deleteRoom: (req, res, next) => {
        Room.deleteOne({n_room : req.body.n_room}, (error, response) => {
            if (error) console.log(error);
            res.send(response);
        })
    },

    updateRoom: (req, res, next) => {
        Room.findOneAndUpdate({id : req.body._id}, {name: req.body.name, price: req.body.price, description: req.body.description, n_person: req.body.n_person, image: req.body.image}, {}, (error,response) => {
            if (error) console.log(error);
            res.send(response);
        })
    }
}