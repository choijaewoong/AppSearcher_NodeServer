var express = require('express');
var App = require('../models/appModel').App;
var router = express.Router();

router.get('/applist', showAppList);
router.post('/addapp', addApp);

// 모든 앱 리스트 출력 메소드
function showAppList(req, res, next) {
   App.find({},{_id:1, name:1, image:1}).then(function fulfilled(docs) {
      console.log('Success : ');
      var result = {
         count : docs.length,
         data : docs
      };
      res.send(result);
   }, function rejected(err) {
      err.code = 500;
      next(err);
   });
}

// 앱 추가 메소드
function addApp(req, res, next) {
   var name = req.body.name;
   var image = req.body.image;
   var package_name = req.body.package_name;
   var activity_name = req.body.activity_name;
   
   var app = new App({name:name, image:image, package_name:package_name, activity_name:activity_name});
   app.save().then(function fulfilled(result){
      console.log(result);
      res.send({msg:'success', id:result._id});
   }, function rejected(err) {
      err.code = 500;
      next(err);      
   });
}

module.exports = router;