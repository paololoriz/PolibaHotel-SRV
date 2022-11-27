const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
        n_room: String,
        price: String,
        n_person: String,
        email: String,
        startDate: String,
        endDate: String
});

reservationSchema.pre("save", function(next) {
    let user = this;
    next()
});

exports.Reservation = mongoose.model("Reservation", reservationSchema);