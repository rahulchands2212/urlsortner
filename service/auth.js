const sessionidTousermap = new Map();

function setid(id,user){
 sessionidTousermap.set(id,user);
}

function getid(id){
   return  sessionidTousermap.get(id);
}

module.exports = {
    setid,
    getid,
}