const mongoose = require('mongoose');
const Class = require('../models/Class');
const Booking = require('../models/Booking');

// Book a slot based on class type
const bookSlot = async (req, res) => {
    const { classType, name, age } = req.body; // User selects the class type (yoga, gym, etc.)
    try {
        // Use a case-insensitive regex to find the class by type
        const classObj = await Class.findOne({ type: new RegExp(`^${classType}$`, 'i') });

        if (!classObj) {
            return res.status(404).json({ message: `No ${classType} classes found` });
        }

        // Check if the class has available slots
        if (classObj.bookedSlots < classObj.capacity) {
            // Book the slot
            classObj.bookedSlots += 1;
            await classObj.save();

            // Create a new booking with user details
            const booking = new Booking({
                class: classObj._id,
                userInfo: { name, age },
                status: "booked",
                cancelled: false
            });
            await booking.save();

            return res.status(200).json({
                message: 'Booking confirmed!',
                booked: true,
                bookingId: booking._id,
                classDetails: classObj
            });
        } else {
            // Add user to waitlist if the class is full
            classObj.waitlist.push({ name, age });
            await classObj.save();

            return res.status(200).json({
                message: 'Class is full, added to waitlist',
                booked: false,
                classDetails: classObj
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const cancelSlot = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const booking = await Booking.findById(bookingId).populate('class');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        const classObj = booking.class;
        const currentTime = new Date();
        // Check if the cancellation is within 30 minutes of the class start
        if (currentTime > new Date(classObj.startTime) - 30 * 60000) {
            return res.status(400).json({ message: 'Cannot cancel within 30 mins of class' });
        }

        // Cancel the booking
        booking.status = 'cancelled';
        await booking.save();
        classObj.bookedSlots -= 1;
        // Allocate slot to first user in the waitlist
        if (classObj.waitlist.length > 0) {
            const nextUser = classObj.waitlist.shift(); // Remove first user from waitlist
            const newBooking = new Booking({
                class: classObj._id,
                user: nextUser.userId,
                userInfo: { name: nextUser.name, age: nextUser.age }
            });
            await newBooking.save();
            classObj.bookedSlots += 1;
        }

        await classObj.save();
        return res.status(200).json({
            message: 'Booking cancelled and slot reallocated if applicable',
            cancelled: true
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        // Optionally implement pagination (skip, limit) if required
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Fetch all bookings with pagination
        const bookings = await Booking.find()
            .skip(skip)
            .limit(parseInt(limit));

        // Get the total count of bookings
        const totalBookings = await Booking.countDocuments();

        return res.status(200).json({
            total: totalBookings,
            page: parseInt(page),
            limit: parseInt(limit),
            bookings
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { bookSlot, cancelSlot, getAllBookings};
