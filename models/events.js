const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
    name: String,
    type: String,
    date: String,
    venue: String,
    time: String,
    image: String,
    fbUrl: String,
    description: String,
    short: String,
    organisersName: [{type: String}],
    organisersMobile: [{type: String}],
    organisersEmail: [{type: String}],
    users: [{type: String}],
    referrer: [{type: String}]
});

module.exports = mongoose.model("event", eventsSchema);