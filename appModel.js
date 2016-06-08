var mongoose = require('mongoose');
var url = 'mongodb://52.78.29.249:27017/apps';
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
   activity_name : String   
});

var App = mongoose.model('App', AppSchema);

module.exports = App;
