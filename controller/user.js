const { client } = require("../connection/user");
const crypto = require("crypto");
  const db = client.db("urlshortner");
  const user = db.collection("user");

function shortidgen() {
  const shortid = crypto.randomBytes(3).toString("base64url");
  return shortid;
}

async function handlelongurl(req, res) {
  const url = req.body.url;
  let shorturl = shortidgen();
  //check the id is already genrated or not
  let check = await user.findOne({ shortid: shorturl });
  while (check !== null) {
    shorturl = shortidgen();
     check = await user.findOne({ shortid: shorturl });
  }
  const temp = {
    longurl: url,
    shortid: shorturl,
  };
  await user.insertOne(temp);
  res.render("home",{
    id : shorturl,
  })
}

async function handleredirect(req, res) {
  const shorturl = req.params.shortid;
  const result = await user.findOne({ shortid: shorturl });
  if (result === null) {
    return res.status(404).json({ message: "short url not found" });
  }
  return res.redirect(result.longurl);
}

async function  handlehome(req,res){
  const allurl = await user.find({}).toArray();
    return res.render('home',{
      urls : allurl,
    });
}

module.exports = {
  handlelongurl,
  handleredirect,
  handlehome,
};
