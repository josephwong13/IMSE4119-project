var jwt = require('jsonwebtoken');
var secretKey = "12345678"

function getToken(user){
    return jwt.sign(user, secretKey, {
        expiresIn: 3600
    });
};

function verifyUser(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token, secretKey, function (err, decoded){
            if(err) return res.status(401).json({message:"Unauthenticated, please login"});
            req.decoded = decoded;
            next();
        })
    }
    else{
        return res.status(403).json({message:"No token provided"});
    }
}


function verifyAdmin(req,res,next){
    if (req.decoded._doc.admin) {
        next();
    } else {
        var err = new Error('You are not an admin!');
        err.status = 401;
        return next(err);
    }
}
/*function verifyOwner(req,res,next){
    Project.findById(req.params.project_id, function(err,project){
        if(err)return next(err);
        if(req.params.project_id != project.owner_id){
            return res.status(401).json({message:"Not owner"});
        }
        next();
    })
}

function verifyOwner(req, res, next){
    var _id = req.body._id || req.query._id || req.headers['user-id'];

    if(_id){
            if(_id==req.params.project_id){
                next();
            }
            else{
                return res.status(401).json({message:"Not owner"});
            }
    }
    else{
        return res.status(403).json({message:"No id provided"});
    }
}
*/

module.exports = {
    getToken: getToken,
    verifyUser: verifyUser,
    verifyAdmin: verifyAdmin
}