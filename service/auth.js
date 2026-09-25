const jwt = require("jsonwebtoken");
const secret = "R18A1H8U21L12";
function setid(user){
   const payload = {
        _id : user._id,
        email:user.email,
    }
      return jwt.sign(payload,secret); 
}

function getid(token){
    if(!token) return null;
   return  jwt.verify(token,secret);
}

module.exports = {
    setid,
    getid,
}