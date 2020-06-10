//Modules
const express = require('express');
const multer = require('multer');

//Created Files
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const uploadConfig = require('./config/upload');

//Instances
const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/status', (req, res)=>{
    res.send({status: 200});
})

//TODO SubscribeController
//TODO ApprovalController
//TODO RejectionController


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