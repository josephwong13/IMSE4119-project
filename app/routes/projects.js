var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var passport = require('passport');
var jwtVerify = require('../jwtVerify');

router.route('/')

.get(function(req,res,next){
    Project.find(function(err,project){
        if(err) return next(err);
        res.json(project);
    })
})

.post(jwtVerify.verifyUser,function(req,res,next){
        var project = new Project(req.body);
        project.save(function(err){
            if(err) return next(err);
            res.json({message: 'new project saved'});
        });

    })

router.route('/:project_id')

.get(function(req,res,next){
    Project.findById(req.params.project_id, function(err,project){
        if(err) return next(err);
        if(project == null){
            res.json({message: 'No project found'});
            return next(err);
        }
        res.json(project);
    })
})


.put(jwtVerify.verifyUser,
    //This middleware is for verify owner
    function(req,res,next){
        Project.findById(req.params.project_id, function(err,project){
            if(err)return next(err);
            if(req.headers['user-id'] != project.owner_id){
                return res.status(401).json({message:"Not owner"});
            }
            next();
        })
    },

    function(req,res,next){
    Project.findByIdAndUpdate(req.params.project_id, req.body, function(err,project){
        if(err)return next(err);
        if(project == null) {
           res.json({message: 'No project found!'});
           return next(err);
        }
        res.json({message:'successfully update project'});
    })
})

.delete(jwtVerify.verifyUser,jwtVerify.verifyAdmin,

    function(req,res,next){
    Project.findByIdAndRemove(req.params.project_id, function(err){
        if(err) return next(err);
        res.json({message:'deleted project'});
    })
})


router.route('/:project_id/admin')
//admin put
.put(jwtVerify.verifyUser,jwtVerify.verifyAdmin,

    function(req,res,next){
    Project.findByIdAndUpdate(req.params.project_id, req.body, function(err,project){
        if(err)return next(err);
        if(project == null) {
           res.json({message: 'No project found!'});
           return next(err);
        }
        res.json({message:'successfully update project'});
    })
})

router.route('/:project_id/backer')
//backer put
.put(jwtVerify.verifyUser,
    //This middleware is for verify NOT owner
    function(req,res,next){
        Project.findById(req.params.project_id, function(err,project){
            if(err)return next(err);
            if(req.headers['user-id'] == project.owner_id){
                return res.status(401).json({message:"Owner can't back own project"});
            }
            next();
        })
    },

    function(req,res,next){
    Project.findByIdAndUpdate(req.params.project_id, {backer:req.body.backer,currentFund:req.body.currentFund,comment:req.body.comment}, function(err,project){
        if(err)return next(err);
        if(project == null) {
           res.json({message: 'No project found!'});
           return next(err);
        }
        res.json({message:'successfully backup project'});
    })
})

module.exports = router;