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
// router.post('/writepost', writePost);

// 모든 게시글 리스트 출력 메소드
function showPostList(req, res, next) {
   var user = req.user.user;
   if(!user){
       res.sendStatus(401);
   }else{ 
        Post.find().then(function fulfilled(docs) {
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

module.exports = router;