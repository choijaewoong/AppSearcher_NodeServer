var express = require('express');
var User = require('../models/appModel').User;
var router = express.Router();
var crypto = require("crypto"); // 암호화 모듈

// router.post('/signin', signIn);
router.post('/signup', signUp);
// router.post('/signout', signOut);

// function signIn(req, res, next){}
function signUp(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var salt = crypto.randomBytes(5).toString('hex'); // 암호화를 위한 salt
    var password = encryptPW(req.body.password, salt);    
    var user = new User({
        name : name,
        email : email, 
        password : password,
        salt : salt 
    });
    user.save().then(function fulfilled(result){
        res.send({msg:'success', user:result});
    }, function rejected(err){
        err.code = 500;
        next(err);
    });
}
// function signOut(req, res, next){}

// 패스워드 암호화
function encryptPW(pw, salt){
    var sha1 = crypto.createHash('sha1');
    sha1.update(pw + salt);
    var digest = sha1.digest('hex');

    return digest;
    // callback(digest);
}

module.exports = router;