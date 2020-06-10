//Modules
const express = require('express');
const multer = require('multer');

//Created Files
const routes = express.Router();
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');

//Instances
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

routes.get('/status', (req, res)=>{
    res.send({status: 200});
})

//For Event
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)
routes.get('/event/:eventId', EventController.getEventById)

//For User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;