const express = require("express");
const app = express();
const path = require("path");
const { dbconnected } = require("./connection/user");
const cookieparser = require("cookie-parser");
const { checkauthication,restritto} = require("./middleware/auth");
const port = 7000;

const urlrouter = require("./router/urls");
const staticrouter = require("./router/staticrouter");
const userrouter = require("./router/user");

//srs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middle wares
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());
app.use(checkauthication);

//routes
app.use("/url",restritto(["NORMAL","ADMIN"]),urlrouter);
app.use("/",staticrouter);
app.use("/user",userrouter);


dbconnected();
app.listen(port,()=>{console.log("server start at port : ",port)});
