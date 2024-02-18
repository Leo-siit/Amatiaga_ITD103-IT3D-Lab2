// Import necessary libraries and modules
const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./User')
var cors = require('cors')

// Initialize express app
const app = express()
const port = 3001

// Middleware to parse JSON bodies
app.use(cors())
app.use(express.json())

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/amatiagaDB',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('DB is connected')) // Log success message
.catch(err => console.log(err)); // Log error message

// Route to get all users
app.get('/', (req, res) => {
    UserModel.find() // Find all users
      .then(users => res.json(users)) // Send users as response
      .catch(err => res.json(err)) // Send error as response
})

// Route to get a user by ID
app.get('/get/:id', (req, res) => {
  const id = req.params.id // Get ID from request parameters
    UserModel.findById({_id: id }) // Find user by ID
      .then(post => res.json(post)) // Send user as response
      .catch(err => res.json(err)) // Send error as response
})

// Route to create a new user
app.post('/create',(req, res) =>{
  UserModel.create(req.body) // Create new user with data from request body
    .then(user => res.json(user)) // Send new user as response
    .catch(err => res.json(err)) // Send error as response
})

// Route to update a user by ID
app.put('/update/:id', (req, res) => {
  const id = req.params.id; // Get ID from request parameters
  UserModel.findByIdAndUpdate({_id: id}, req.body, { new: true }) // Update user by ID with data from request body
    .then(user => res.json(user)) // Send updated user as response
    .catch(err => res.json(err)) // Send error as response
})

// *Another way(code) to update a user*
// app.put('/update/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       $set: {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//         school_id: req.body.school_id,
//         course: req.body.course,
//         department: req.body.department
//       }
//     },
//     { new: true }
//   )
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })

// Route to delete a user by ID
app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id; // Get ID from request parameters
  UserModel.findByIdAndDelete({_id: id}) // Delete user by ID
    .then(response => res.json(response)) // Send response as response
    .catch(err => res.json(err)) // Send error as response
})

// Route to get the count of users in a department
app.get('/count/:department', (req, res) => {
  const department = req.params.department; // Get department from request parameters

  // Use a regular expression for case-insensitive and less specific match
  const departmentRegex = new RegExp(department, 'i');

  UserModel.countDocuments({ department: departmentRegex }) // Count users in department
    .then(count => res.json({ department: department, studentCount: count })) // Send count as response
    .catch(err => res.json(err)); // Send error as response
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})