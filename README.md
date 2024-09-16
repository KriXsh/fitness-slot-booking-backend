# Fitness Slot Booking System

## Project Description

The **Fitness Slot Booking System** is a full-stack web application that allows users to book slots for fitness classes like yoga, gym, and dance. It provides features for class booking, waitlist management, cancellations, and a backend API for managing bookings efficiently.

## Table of Contents

- [Project Description](#project-description)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

## Key Features

- **Class Booking**: Users can book available slots for different class types (e.g., Yoga, Gym, Dance).
- **Waitlist Management**: If the class is full, users can be placed on a waitlist. When a slot becomes available due to cancellation, it's reallocated to the next user on the waitlist.
- **Slot Cancellation**: Users can cancel their bookings up to 30 minutes before the class starts.
- **Booking History**: Users can view their past bookings with pagination and filtering options.
- **Redis Caching**: Redis is used to enhance performance by caching frequently accessed data.
- **MongoDB Storage**: MongoDB is used as the database to store all bookings and class information.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS (for styling)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Redis
- **Testing**: Jest (for unit testing)
  
## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [Redis](https://redis.io/) (local or cloud)
- npm or yarn (package manager)

### Steps to Set Up Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd fitness-slot-booking-backend
2. **Install dependencies:
3.   ```bash
    npm install
    
-Set up MongoDB:
Make sure MongoDB is running locally or use a cloud service like MongoDB Atlas.
-Set up Redis:
Ensure Redis is running locally or on a cloud service.
-Create .env file:
In the root directory, create a .env file and add the following environment variables:
.env 
   ```bash
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/fitness_booking

# Redis connection URL
REDIS_URL=redis://localhost:6379

# Application Port
PORT=3000

   
