const user = require("../model/user");
const {setid} = require("../service/auth");

async function handlecreateuser(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handlelogin(req, res) {
  const { email, password } = req.body;
  const result = await user.findOne({ email, password });
  if (!result)
    return res.render("login", {
      error: "invalid  email or password",
    });

   const token =  setid(result);
    res.cookie("uid",token);
  return res.redirect("/");
}
module.exports = {
  handlecreateuser,
  handlelogin,
};
