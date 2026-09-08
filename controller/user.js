const { client } = require("../connection/user");
const crypto = require("crypto");

function shortidgen() {
  const shortid = crypto.randomBytes(3).toString("base64url");
  return shortid;
}

async function handlelongurl(req, res) {
  const url = req.body.url;
  let shorturl = shortidgen();
  const db = client.db("urlshortner");
  const user = db.collection("user");
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
  res.status(201).json(temp);
}

async function handleredirect(req, res) {
  const shorturl = req.params.shortid;
  const db = client.db("urlshortner");
  const user = db.collection("user");
  const result = await user.findOne({ shortid: shorturl });
  if (result === null) {
    return res.status(404).json({ message: "short url not found" });
  }
  return res.redirect(result.longurl);
}

module.exports = {
  handlelongurl,
  handleredirect,
};
