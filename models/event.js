const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({//pass javascript object here
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
//    every event shod create by user and every event create by one user
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Event", eventSchema);

