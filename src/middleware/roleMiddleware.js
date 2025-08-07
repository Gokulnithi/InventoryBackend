const authorizeRoles = (...allowedroles)=>{
    return (req,res,next)=>{
        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({message:"Acces denied"});
        }
        next();
    }
}

module.exports = authorizeRoles