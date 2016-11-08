var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var jwtVerify = require('../jwtVerify');



/* GET users listing. */
router.get('/',jwtVerify.verifyUser,jwtVerify.verifyAdmin,function(req, res, next) {
    User.find(function(err,user){
        if(err) return next(err);
        res.json(user);
    })
});

//get single user
router.get('/:user_id',function(req,res,next){
    User.findById(req.params.user_id, function(err,user){
        if(err) return next(err);
        if(user == null){
            res.json({message: 'No user found'});
            return next(err);
        }
        res.json(user);
    })
})

//get single user
router.get('/username/:username',function(req,res,next){
    User.findOne({username:req.params.username}, function(err,user){
        if(err) return next(err);
        res.json(user);
    })
})

//put user
router.put('/:user_id',jwtVerify.verifyUser,jwtVerify.verifyAdmin,function(req,res,next){
    User.findByIdAndUpdate(req.params.user_id,req.body ,function(err,user){
        if(err) return next(err);
        if(user == null){
            res.json({message: 'No user found'});
            return next(err);
        }
        res.json({message:"Update successful"});
    })
})

//put user for user
router.put('/userupdate/:user_id',jwtVerify.verifyUser,

//verify owner
    function(req,res,next){
        User.findById(req.params.user_id, function(err,user){
            if(err)return next(err);
            if(req.headers['user-id'] != user._id){
                return res.status(401).json({message:"Not owner"});
            }
            next();
        })
    },

    function(req,res,next){
    User.findByIdAndUpdate(req.params.user_id,req.body ,function(err,user){
        if(err) return next(err);
        if(user == null){
            res.json({message: 'No user found'});
            return next(err);
        }
        res.json({message:"Update successful"});
    })
})

//delete user
router.delete('/:user_id', jwtVerify.verifyUser,jwtVerify.verifyAdmin,function(req,res,next){
    User.findByIdAndRemove(req.params.user_id, function(err){
        if(err) return next(err);
        res.json({message:'deleted user'});
    })
})

//register

router.get('/register', function(req,res,next){
    res.send('This is the register page');
});

router.post('/register',function(req,res){
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user){
        if(err){return res.send(err)};
        passport.authenticate('local')(req,res, function(){
            res.send('Register successfully');
        });
    });
});

//login

router.get('/login', function(req,res){
        res.send('This is the login page');
});

router.post('/login', function(req,res){
    passport.authenticate('local', function(err, user, info){
        if(err) {return res.send(err);}
        if(!user) {return res.status(401).json({err: info});}
        req.logIn(user, function(err){
            if(err){return res.status(500).json({err: 'Cannot login due to unexpected error'});}
            //successfully login
            var token = jwtVerify.getToken(user);
            res.status(200).json({
                status: 'Login successful',
                success: true,
                token: token,
                _id: user._id,
                username: user.username,
                admin: user.admin,
                pic: user.profilepic
            });
        });
    })(req,res);   
});

//logout

router.get('/logout', function(req,res){
    req.logOut();
    res.send('Goodbye!');
})


module.exports = router;
