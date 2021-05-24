const bcrypt = require("bcryptjs");


const Event = require("./../models/event"); //import event model
const User = require("./../models/user");//import user model

const events = async eventIds => {
    //here we fetch all events which have eventIds
    //handle errors with try catch
    try {
        const events = await Event.find({_id: {$in: eventIds}});
        events.map(event => {
            return {
                ...event._doc,
                date:new Date(event._doc.date).toISOString() ,
                creator: user.bind(this, event.creator)
            }
        });
        return events
    }
    catch(err) {throw err}
};

const user = async userId => {
    try {
        const user = await User.findById(userId);
        //createdEvents same name in user model
        return {...user._doc, createdEvents: events.bind(this, user._doc.createdEvents)}
    } catch(err) {throw err}

};


module.exports = {
    events: async () => {
        // populate() get all data from all relation mongoose knows
        //creator is where we combine 2 collection
        try {
            const events = await Event.find();
            // .populate('creator')
            return events.map(event => {
                return {
                    ...event._doc,
                    date:new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)

                }}
            )
        }
     catch(err) {throw err};
    },
        createEvent: async (args) => {
    // const event = {
    //     _id: Math.random().toString(),
    //     title: args.eventInput.title,
    //     description: args.eventInput.description,
    //     price: +args.eventInput.price, //because price is float we add +
    //     date: new Date().toISOString() //because we want to save it as string
    // };
    // events.push(event);
    const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price, //because price is float we add +
        date: new Date(args.eventInput.date), //because we want to save it as string
        creator: "609fe2e9958ce92974c62750"
    });
    let createdEvent;
    const result = await event.save();
            createdEvent =  {...result._doc, creator: user.bind(this, result._doc.creator)};
            return User.findById("609fe2e9958ce92974c62750")
        .then(user => {
            //    we have user
            console.log(user, "user");

            if (!user) {
                throw new Error("user not found")
            }
            user.createdEvents.push(event);
            return user.save();
        }).then(result => {
            console.log(result, "result");
            return createdEvent;
        })
        .catch(err => {
            console.log("err", err);
            throw err;
        });
},
    createUser: (args) => {
    //looking to email which is exist
    return User.findOne({
        email: args.userInput.email
    }).then(user => {
        //    we have user
        if(user) {
            throw new Error("user exists already")
        }
        return bcrypt
            .hash(args.userInput.password, 12);
    }).then(hashedPassword => {
        const user = new User({
            email: args.userInput.email,
            password: hashedPassword
        });
        return user.save();
    })
        .then(result => {
            console.log(result, "res");
            return {...result._doc, password: null}
        })
        .catch(err => {console.log(err); throw err});
}
};
