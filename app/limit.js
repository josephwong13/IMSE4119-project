module.exports =

 function allow(req, res, next){
    if(!req.isAuthenticated()){
        return res.json(401, {message: 'You are unauthorized to perform this operation'})
    }
    next();
}