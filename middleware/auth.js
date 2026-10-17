const user = require("../model/user");
const { getid } = require("../service/auth");

function checkauthication(req, res, next) {
  const tokencookies = req.cookies?.token;
  if (!tokencookies) return next();
  const user = getid(tokencookies);
  req.user = user;
  return next();
}

function restritto(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("unAuthorized");
    return next();
  };
}

module.exports = {
  checkauthication,
  restritto,
};
