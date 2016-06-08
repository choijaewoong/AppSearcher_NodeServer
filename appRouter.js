var express = require('express');
var App = require('./appModel');
var router = express.Router();

router.get('/apps', showAppList);

function showAppList(req, res, next) {
   App.find({},{_id:1, name:1}).then(function fulfilled(docs) {
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

module.exports = router;