var mongoose = require('mongoose');
var url = 'mongodb://52.78.29.249:27017/appsearcher';
mongoose.connect(url);
var conn = mongoose.connection;

conn.on('error', function(err) {
   console.error('Error : ', err);
});

conn.on('open', function() {
   console.log('Connect');
});

// 앱 저장 스키마
var AppSchema = mongoose.Schema({
   name : String,
   image : String,
   package_name : String,
   activity_name : String,
   user_email : {type: String, default: ""}
});
var App = mongoose.model('App', AppSchema);

var UserSchema = mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : String,
    salt : String
});
var User = mongoose.model('User', UserSchema);

module.exports.App = App;
module.exports.User = User;
