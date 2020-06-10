const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    sport: String,
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Event"
    }
});

module.exports = mongoose.model("Registration", RegistrationSchema)