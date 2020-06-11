//Modules
const express = require('express');
const multer = require('multer');

//Created Files
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const uploadConfig = require('./config/upload');

//Instances
const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res)=>{
    res.send({status: 200});
})


//TODO ApprovalController
//TODO RejectionController


//Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id', RegistrationController.getRegistration);

//Login Router
routes.post('/login', LoginController.store)

//Dashboard Router
routes.get('/dashboard/:sport', DashboardController.getAllEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)

//Events Router
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId', EventController.delete)

//User Router
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;