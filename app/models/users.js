var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    profilepic: {type:String,default:"https://www.kirkleescollege.ac.uk/wp-content/uploads/2015/09/default-avatar.png"},
    admin: {type:Boolean,default:false},
    paypal: String,
    mysupportproject: [String]
});


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);