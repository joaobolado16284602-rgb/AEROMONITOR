const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

// Password hashing method
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT Token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;