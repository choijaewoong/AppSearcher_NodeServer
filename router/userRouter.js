var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/appModel').User;
var crypto = require("crypto"); // 암호화 모듈
var passport = require('passport');

router.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'Secret Key'
}));

router.use(passport.initialize());
router.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;
var strategy = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'        
    }, function(email, password, done) {    
        User.findOne({email : email}).then(
            function fulfilled(result){
                if(!result){
                    // done(null, false, req.flash('message', '존재하지 않는 이메일 입니다.'));
                    done(null, false, {message: '존재하지 않는 이메일 입니다.'});
                }
                if(result.password === encryptPW(password, result.salt)){         
                    var userinfo = { _id: result._id, name: result.name, email: result.email};
                    done(null, {message: "success", user: userinfo});
                } else{
                    done(null, false, {message: '비밀번호가 다릅니다.'});
                }
            }, function rejected(err){
                  err.code = 500;
                  next(err);
            });});
passport.use(strategy);

passport.serializeUser(function(user, done) {
   console.log("세션 기록");
   done(null, user); 
});

passport.deserializeUser(function(user, done) {
    console.log('세션에서 사용자 정보 읽기');
    done(null, user);
});

// 로그인 요청
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/signinSuccess',
    failureRedirect: '/signinFailure'
  })
);
// 로그인 실패
router.get('/signinFailure', function(req, res) {
    res.send({message : "fail"});
});
// 로그인 성공
router.get('/signinSuccess', function(req, res) {
  res.send(req.user);
});
router.post('/signup', signUp); // 회원가입
router.get('/signout', signOut); // 로그아웃
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
function signOut(req, res){
    req.logout();
    res.send({msg:'success'});
}

// 패스워드 암호화
function encryptPW(pw, salt){
    var sha1 = crypto.createHash('sha1');
    sha1.update(pw + salt);
    var digest = sha1.digest('hex');

    return digest;
    // callback(digest);
}

module.exports = router;