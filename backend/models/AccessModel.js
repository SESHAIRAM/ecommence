const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    mailID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'UserDetials'
});
const accessModel = mongoose.model('UserDetails', accessSchema);  // Singular name used for model

module.exports = accessModel;
