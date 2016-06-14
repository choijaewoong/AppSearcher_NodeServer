var express = require('express');
var Post = require('../models/appModel').Post;
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

router.get('/postlist', showPostList);
router.post('/writepost', writePost);

// 모든 게시글 리스트 출력 메소드
function showPostList(req, res, next) {
   var user = req.user.user;
   if(!user){
       res.sendStatus(401);
   }else{ 
        Post.find({}).sort({_id : -1}).then(function fulfilled(docs) {
            console.log('Success : ');
            var result = {
                count : docs.length,
                posts : docs
            };
            res.send(result);
        }, function rejected(err) {
            err.code = 500;
            next(err);
        });
   }
}

// 게시글 추가 메소드
function writePost(req, res, next) { 
   var user = req.user.user;
   if(!user){
       res.sendStatus(401);
   }else{ 
        var app_name = req.body.app_name;
        var app_evaluation = req.body.app_evaluation;
        var app_image = req.body.app_image;
        var write_date = req.body.write_date;
        var post = new Post({app_name:app_name, 
                           user_name:user.name, 
                           app_evaluation:app_evaluation, 
                           app_image:app_image,
                           write_date:write_date});
        post.save().then(function fulfilled(result){
            console.log(result);
            res.send({ post : result});
        }, function rejected(err) {
            err.code = 500;
            next(err);      
        });
   }
}

module.exports = router;