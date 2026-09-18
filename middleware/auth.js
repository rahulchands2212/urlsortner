const {getid} = require("../service/auth");

async function restrictTouserLoginOnly(req,res,next){
    const  useruid = req.cookies.uid;
    if(!useruid) return res.redirect("/login");
    const user = getid(useruid);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}

async function Checkauth(req,res,next){
    const  useruid = req.cookies.uid;
    const user = getid(useruid);
    req.user = user;
    next();
}

module.exports ={
    restrictTouserLoginOnly,
    Checkauth,
}