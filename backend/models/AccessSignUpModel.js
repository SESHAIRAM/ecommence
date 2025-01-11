const mongoose = require('mongoose');

// Define the schema for user sign-up details
const accessSignUpSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true, 
        trim: true 
    },  // Ensure no extra spaces are stored
    mailID: { 
        type: String, 
        required: true, 
        trim: true, 
        unique: true, 
        lowercase: true 
    },  // Ensure unique email and lowercase for consistency
    password: { 
        type: String, 
        required: true 
    },  // The password will be stored as plain text (not recommended for production)
    createdAt: { 
        type: Date, 
        default: Date.now 
    },  // Automatically sets the creation date
}, {
    collection: 'UserDetials'  // Use the collection name explicitly
});

// No password hashing, password will be stored as plain text
// The 'pre' hook for password hashing is removed.

// Create and export the model
const accessSignUpModel = mongoose.model('UserDetails', accessSignUpSchema);  // Singular name used for model

module.exports = accessSignUpModel;
