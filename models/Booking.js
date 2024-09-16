const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    user: {
        name: { type: String, required: true },
        age: { type: Number, required: true }
    },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
    bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
