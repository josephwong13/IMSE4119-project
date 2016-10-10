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

module.exports = {
    getToken: getToken,
    verifyUser: verifyUser
}