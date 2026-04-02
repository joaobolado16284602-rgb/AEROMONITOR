const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airlineName: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    duration: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;