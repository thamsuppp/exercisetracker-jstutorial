const router = require('express').Router();
let StudySession = require('../models/studysession.model');

// First endpoint that handles GET request
router.route('/').get((req, res) => {
    StudySession.find()
        // Promise (return the users in JSON format)
        .then(sessions => res.json(sessions))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Handles POST request - add new study session
router.route('/add').post((req, res) => {

    const username = req.body.username;
    const subject = req.body.subject;
    const task = req.body.task;
    const start = Date.parse(req.body.start);
    const end = Date.parse(req.body.end);
    // Derived variable difftime (in ms)
    const diffTime = Math.abs(end - start);
    // Duration in minutes
    const duration = Math.ceil(diffTime / (1000 * 60));
    const productivity = Number(req.body.productivity);
    var websites = req.body.websites;

    const newStudySession = new StudySession({
        username,
        subject,
        task,
        start,
        end,
        duration,
        productivity,
        websites
    });

    // Save the new user in the database
    newStudySession.save()
        .then( () => res.json('Study Session added!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

// Update route (id refers to the one created by MongoDB)
router.route('/:id').get((req, res) => {
    StudySession.findById(req.params.id)
        .then(session => res.json(session))
        .catch(err => res.status(400).json('Error: ' + error));
});

// Delete route (id refers to the one created by MongoDB)
router.route('/:id').delete((req, res) => {
    StudySession.findByIdAndDelete(req.params.id)
        .then(() => res.json('Study Session deleted.'))
        .catch(err => res.status(400).json('Error: ' + error));
});

// Update route
router.route('/update/:id').post((req, res) => {
    StudySession.findById(req.params.id)
        .then(session => {
            // Update the session object's information to the request's json body
            session.username = req.body.username;
            session.subject = req.body.subject;
            session.task = req.body.task;
            const start = Date.parse(req.body.start);
            const end = Date.parse(req.body.end);
            session.start = start;
            session.end = end;
            // Derived variable difftime (in ms)
            const diffTime = Math.abs(end - start);
            // Duration in minutes
            const duration = Math.ceil(diffTime / (1000 * 60));
            session.duration = duration;
            session.productivity = Number(req.body.productivity);
            session.websites = req.body.websites;

            session.save()
                .then(() => res.json('Study Session updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ') + err);
});


module.exports = router;