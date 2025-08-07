const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    let token = req.cookies.token;
    //let authHeader = req.headers.Authorization || req.headers.authorization

    if(token){
        //token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"no tokken, authorization denied"})
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            next();
        }catch(err){
            res.status(400).json({message:"token is invalid"});
        }
    }else{
        res.status(401).json({message:"no tokken, authorization denied"})
    }
}

module.exports = verifyToken