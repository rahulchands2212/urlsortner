const { client } =  require("../connection/user");
const crypto = require("crypto");

async function handlelongurl(req,res){
    const url = req.body.url;
    const shortid = crypto.randomBytes(3).toString("base64url");
    const db = client.db("urlshortner");
    const user = db.collection("user");
    const temp = {
        longurl : url,
        shortid : shortid,
    };
    await user.insertOne(temp);
    res.status(201).json(temp);
}

async function handleredirect(req,res){
    const shorturl = req.params.shortid;
    const db = client.db("urlshortner");
    const user = db.collection("user");
    const result = await user.findOne({shortid:shorturl});
    res.redirect(result.longurl);
}

module.exports = {
    handlelongurl,
    handleredirect,
}