var express = require('express');
var App = require('../models/appModel').User;
var router = express.Router();

router.get('/signin', signIn);
router.post('/signup', signUp);
router.post('/signout', signOut);

function signIn(req, res, next){}
function signUp(req, res, next){}
function signOut(req, res, next){}
