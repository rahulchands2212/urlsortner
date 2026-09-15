const Url = require("../model/url");
const crypto = require("crypto");
 
function shortidgen() {
  const shortid = crypto.randomBytes(3).toString("base64url");
  return shortid;
}

async function handlelongurl(req, res) {
  const url = req.body.url;
  if(!url){
    return res.status(400).send("Please enter a URL");
  }
  
  let shorturl = shortidgen();
  //check the id is already genrated or not
  let check = await Url.findOne({ shortid: shorturl });
  while (check !== null) {
    shorturl = shortidgen();
     check = await Url.findOne({ shortid: shorturl });
  }
  const temp = {
    longurl: url,
    shortid: shorturl,
  };
  await Url.create(temp);
  res.render("home",{
    id : shorturl,  
  })
}

async function handleredirect(req, res) {
  const shorturl = req.params.shortid;
  const result = await Url.findOne({ shortid: shorturl });
  if (result === null) {
    return res.status(404).json({ message: "short url not found" });
  }
  result.clickcount +=1;
  result.save();
  return res.redirect(result.longurl);
}

async function  handlehome(req,res){
  const allurl = await Url.find({});
    return res.render('home',{
      urls : allurl,
    });
}

function handlesignup(req,res){
  return res.render("signup");
}

function handlelogin(req,res){
  return res.render("login");
}

module.exports = {
  handlelongurl,
  handleredirect,
  handlehome,
  handlesignup,
  handlelogin,
};
