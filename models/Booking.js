const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    flight_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Flight'
    },
    number_of_passengers: {
        type: Number,
        required: true,
        min: 1
    },
    booking_status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    booking_date: {
        type: Date,
        default: Date.now
    },
    payment_status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'pending'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
