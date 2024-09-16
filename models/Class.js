const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    type: { type: String, enum: ['yoga', 'gym', 'dance'], required: true }, // Ensure "type" is required and has proper values
    capacity: { type: Number, required: true }, // Number of total allowed slots
    bookedSlots: { type: Number, default: 0 }, // Number of booked slots
    waitlist: [{ name: String, age: Number }], // Store waitlist with user details directly
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

module.exports = mongoose.model('Class', classSchema);
