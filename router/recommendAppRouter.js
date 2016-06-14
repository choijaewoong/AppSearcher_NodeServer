var express = require('express');
var RecommendApp = require('../models/appModel').RecommendApp;
var router = express.Router();

var session = require('express-session');
router.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'Secret Key'
}));
var passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

router.get('/recommendlist', showRecommendList);
router.post('/addrecommend', addRecommendApp);

// 모든 추천 앱 리스트 출력 메소드
function showRecommendList(req, res, next) {
   var user = req.user.user;
   if(!user){
       res.sendStatus(401);
   }else{ 
        RecommendApp.find({}).sort({_id: -1}).then(function fulfilled(docs) {
            console.log('Success : ');
            var result = {
                count : docs.length,
                recommends : docs
            };
            res.send(result);
        }, function rejected(err) {
            err.code = 500;
            next(err);
        });
   }
}

// 게시글 추가 메소드
function addRecommendApp(req, res, next) { 
   var user = req.user.user;
   if(!user){
       res.sendStatus(401);
   }else{ 
        var name = req.body.name;
        var description = req.body.description;
        var image = req.body.image;
        var download_url = req.body.download_url;
        var recommendApp = new RecommendApp({name:name, 
                           description:description, 
                           image:image, 
                           download_url:download_url});
        recommendApp.save().then(function fulfilled(result){
            console.log(result);
            res.send({ recommendApp : result});
        }, function rejected(err) {
            err.code = 500;
            next(err);      
        });
   }
}
module.exports = router;