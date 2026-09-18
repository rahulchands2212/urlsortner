const express = require("express");
const app = express();
const path = require("path");
const { dbconnected } = require("./connection/user");
const cookieparser = require("cookie-parser");
const { restrictTouserLoginOnly,Checkauth} = require("./middleware/auth");
const port = 7000;

const urlrouter = require("./router/urls");
const staticrouter = require("./router/staticrouter");
const userrouter = require("./router/user");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());

app.use("/url",restrictTouserLoginOnly,urlrouter);
app.use("/",Checkauth,staticrouter);
app.use("/user",userrouter);


dbconnected();
app.listen(port,()=>{console.log("server start at port : ",port)});
