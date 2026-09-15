const user = require("../model/user");

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
  return res.redirect("/");
}
module.exports = {
  handlecreateuser,
  handlelogin,
};
