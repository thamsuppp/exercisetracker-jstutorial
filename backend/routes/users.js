// Express router
const router = require('express').Router();
// Mongoose User model
let User = require('../models/user.model');

// First endpoint that handles GET request
router.route('/').get((req, res) => {
    User.find()
        // Promise (return the users in JSON format)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles POST request - add new username
router.route('/add').post((req, res) => {

    const username = req.body.username;
    const newUser = new User({username});

    // Save the new user in the database
    newUser.save()
        .then( () => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

module.exports = router;