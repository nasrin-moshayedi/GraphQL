const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents:[ //connect event by user with booking
        //we will have multiple items here
        {
            type: Schema.Types.ObjectId, //mongo db use this id
            //name of the model most put here
            ref: 'Event'//important interianlly in mongoose and let  mongoose know two model are related when we fetch data it is autommaticly merge data
        }
    ]
});

module.exports = mongoose.model("User", userSchema);