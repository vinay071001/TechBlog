const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    City: String,
    State: String,
    Review: String
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;