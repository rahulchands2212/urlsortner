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
  res.status(201).json(temp);
}

async function handleredirect(req, res) {
  const shorturl = req.params.shortid;
  const result = await user.findOne({ shortid: shorturl });
  if (result === null) {
    return res.status(404).json({ message: "short url not found" });
  }
  return res.redirect(result.longurl);
}

async function  handledisplayallurl(req,res){
   const allurl = await user.find({}).toArray();
    return res.end(`
    <html>
    <head></head>
    <body>
    <ol>
    ${allurl.map(url=>`<li>${url.shortid}  :      ${url.longurl} </li>`).join(" ")}
    </ol>
    </body>
    </html>
    `);
}

module.exports = {
  handlelongurl,
  handleredirect,
  handledisplayallurl,
};
