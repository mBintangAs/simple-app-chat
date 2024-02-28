const  mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {unique:true, type:String}, // String is shorthand for {type: String}
    password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = { User }


