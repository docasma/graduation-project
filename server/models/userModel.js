const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must have at least 8 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
    },
    // userType: {
    //     type: String,
    //     enum: ['eventCreator', 'eventAttendee'],
    //     required: [true, 'User type is required']
    // },
    // createdEvents: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event'
    // }]
    
}, { timestamps: true });

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords dont match');
    }
    next();
});

UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});
    // Méthode statique pour obtenir le nom de l'utilisateur à partir de son ID
UserSchema.statics.getUserNameById = async function (userId) {
    try {
        const user = await this.findById(userId);
        return user ? `${user.firstName} ${user.lastName}` : null;
    } catch (error) {
        console.error(error);
        return null;
    }
},

    // Méthode statique pour obtenir l'ID de l'utilisateur à partir de son nom complet
UserSchema.statics.getUserIdByName = async function (firstName, lastName) {
    try {
        const user = await this.findOne({ firstName, lastName });
        return user ? user._id : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const User = mongoose.model("User", UserSchema);
module.exports = User;
