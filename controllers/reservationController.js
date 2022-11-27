const {response} = require ("express");
const Reservation = require ('../models/reservation').Reservation;
module.exports = {
    createReservation: (req, res, next) => {
        const reservation = new Reservation (
            {n_person: req.body.n_person,
                n_room: req.body.n_room,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                email: req.body.email,
                price: req.body.price});
        reservation.save ((error, savedDocument) => {
            if (error) console.log (error);
            res.send (reservation);
        });
    },

    getAllReservations: (req, res, next) => {
        let today = new Date();
        Reservation.find ({endDate:{$gte: today.toISOString() }}, (error, reservations) => {
            if (error) console.log (error);
            res.send (reservations);
        });
    },

    getMyReservations: (req, res, next) => {
        Reservation.find ({email: req.params.email}, (error, reservations) => {
            if (error) console.log (error);
            res.send (reservations);
        });
    }
}