const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

// const tasklist = mongoose.Schema({
//     projectName: {
//         type : String,
//         trim: true
//     },
//     Status: {
//         type : String,
//         trim: true
//     }
// });

const regSchema = new mongoose.Schema({
    name : {
        type : Object,
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
        unique : true,
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
    tasklist : {
        type : Array
    },
    authToken : [{
        token : {
            type : String,
            required : true
        }
    }],
    addedOn : {
        type : Date,
        default : Date.now
    }
})

regSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({ _id: this._id.toString()}, process.env.AUTH_KEY);
        this.authToken = this.authToken.concat({token});
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
    }
}

regSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next();
})

const User = new mongoose.model('User', regSchema)

module.exports = User