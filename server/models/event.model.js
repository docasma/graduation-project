
const mongoose = require("mongoose");
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [3, 'First Name must have at least 3 chars']
        
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [3, 'Last Name must have at least 3 chars']
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isEmail,
            message: "Please enter a valid email"
        }
    },
    phoneNumber:{
        type:Number,
        requiered:[true, 'Phone number is required'],
        min: [8, "{PATH} must be at least 8 "]
    }
});

const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, "Event Name is required"],
        minLength: [3, "{PATH} must have at least 3 chars"]
    },
    eventLocation: {
        type: String,
        required: [true, "Location is required"],
        minLength: [3, "{PATH} must have at least 3 chars"]
    },
    eventCreator: {
        type: String,
        required: [true, "Event Creator is required"],
        minLength: [3, "{PATH} must have at least 3 chars"]

    },
    eventDate: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: function(value) {
                const minimumDate = new Date();
                minimumDate.setDate(minimumDate.getDate() + 15); // Ajoute 15 jours à la date actuelle
                return value >= minimumDate;
            },
            message: "Event date must be at least 15 days from today"
        }
    },
    eventTime: {
        type: String,
        required: [true, "Event Time is required"],
        validate: {
            validator: function(value) {
                // Expression régulière pour valider le format HH:MM
                return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
            },
            message: "Event Time must be in the format HH:MM"
        }
    },
    eventDescription: {
        type: String,
        required: [true, "Description is required"],
        minLength: [10, "{PATH} must have at least 10 chars"]
    },
    eventTotalAttendees: {
        type: Number,
        required: [true, "Total Attendees Number is required"],
        min: [10, "{PATH} must be at least 10 "]
    },

    isFull: {
        type: Boolean,
        default: false
    },
    attendees:[attendeeSchema]
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;


// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema({
//     eventName: {
//         type: String,
//         required: [true, "Event Name is required"],
//         minLength: [3, "{PATH} must have at least 3 chars"]
//     },
//     eventLocation: {
//         type: String,
//         required: [true, "Location is required"],
//         minLength: [3, "{PATH} must have at least 3 chars"]
//     },

//     // problem of submittion that needs the id of the event creator???

//     eventCreator: {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User', // Référence au modèle User
//             required: true // L'événement doit avoir un créateur
//         },
//         firstName: {
//             type: String,
//             required: [true, "Event Creator First Name is required"],
//             minLength: [2, "Event Creator First Name must have at least 2 chars"]
//         },
//         lastName: {
//             type: String,
//             required: [true, "Event Creator Last Name is required"],
//             minLength: [2, "Event Creator Last Name must have at least 2 chars"]
//         }
//     },
//     eventDate: {
//         type: Date,
//         required: [true, "Date is required"],
//         validate: {
//             validator: function(value) {
//                 const minimumDate = new Date();
//                 minimumDate.setDate(minimumDate.getDate() + 15); // Ajoute 15 jours à la date actuelle
//                 return value >= minimumDate;
//             },
        
//             message: "Event date must be at least 15 days from today"
//         }
//     },
//     eventTime: {
//         type: String,
//         required: [true, "Event Time is required"],
//         validate: {
//             validator: function(value) {
//                 // Expression régulière pour valider le format HH:MM
//                 return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
//             },
//             message: "Event Time must be in the format HH:MM"
//         }
//     },
//     eventDescription: {
//         type: String,
//         required: [true, "Description is required"],
//         minLength: [10, "{PATH} must have at least 10 chars"]
//     },
//     eventTotalAttendees: {
//         type: Number,
//         required: [true, "Total Attendees Number is required"],
//         min: [10, "{PATH} must be at least 10 "]
//     },
//     eventCurrentAttendees: {
//         type: Number,
//         default: 0
//     },
//     isFull: {
//         type: Boolean,
//         default: false      
//     },
//     attendees: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User' // Référence au modèle User pour les participants à l'événement
//     }]
// }, { timestamps: true });

// const Event = mongoose.model("Event", EventSchema);

// module.exports = Event;
