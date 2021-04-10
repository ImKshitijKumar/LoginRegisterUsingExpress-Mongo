const mongoose = require('mongoose');
const validator = require('validator');

// const nameSchema = mongoose.Schema({
//     first: {
//         type : String,
//         required: true,
//         minLength: [3, 'First Name should be of atleast 3 Characters'],
//         lowercase: true,
//         trim: true
//     },
//     last: {
//         type : String,
//         lowercase: true,
//         trim: true
//     }
// });

const regSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userRole : {
        type : String,
        default : "Employee"
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        validate(v){
            if(!validator.isEmail(v)){
                throw new Error("Email is Invalid")
            }
        },
        lowercase : true,
        trim: true
    },
    contact : {
        type : String,
        validate(v){
            if(!validator.isMobilePhone(v,['en-IN'])){
                throw new Error("Invalid Phone Number")
            }
        },
        required : [true, 'Contact is Required']
    },
    password : {
        type : String,
        required : true
    },
    addedOn : {
        type : Date,
        default : Date.now
    }
})

const User = new mongoose.model('User', regSchema)

module.exports = User