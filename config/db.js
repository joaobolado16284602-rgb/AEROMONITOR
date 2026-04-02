const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/AEROMONITOR'; // Change this to your MongoDB URI if necessary

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 5 // Maintain up to 5 socket connections
};

async function connectDB() {
    try {
        await mongoose.connect(uri, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;