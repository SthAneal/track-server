const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {MY_SECRET_KEY} = require('../../config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length<2){
                throw new Error('Name must consist at least 2 characters');
            }
        }
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Must be a valid email address');
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        trim: true,
        validate(value){
            if(value<0){
                throw new Error('Must be a positive number');
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain "password"');
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});
/* 
    to create a virtual User's field related to the Task
*/
userSchema.virtual('tracks',{
    ref:'Track',
    localField: '_id',
    foreignField: 'userId'
});




/* 
    to cerate the authentication function.

    .methods is available to the instances of the model
*/
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, MY_SECRET_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid Credentials!');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Invalid Credentials!');
    }
    return user;
}

/* 
    to hash the password, automatically during the process of save.
*/
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

/* 
    to hide the credential informations while express is sending the stringify value.
 */
    userSchema.methods.toJSON = function(){
        const user = this;
        const userObject = user.toObject();

        delete userObject.tokens;
        delete userObject.password;

        return userObject;
    }


const User = mongoose.model('User', userSchema);

module.exports = User;