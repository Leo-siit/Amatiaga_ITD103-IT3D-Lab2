// Import the mongoose library
const mongoose = require('mongoose')

// Define the schema for a User
const UserSchema = new mongoose.Schema({
    name: String,       // User's name
    email: String,      // User's email
    age: Number,        // User's age
    school_id: String,  // User's school ID
    course: String,     // User's course
    department: String  // User's department
})

// Create a model from the User schema. This model will be used to interact with the 'users' collection in the database
const UserModel = mongoose.model('users', UserSchema)

// Export the UserModel so it can be used in other parts of the application
module.exports = UserModel;