const express = require("express");
const app = express();
const path = require("path");
const { dbconnected } = require("./connection/user");

const port = 7000;

const urlrouter = require("./router/urls");
const staticrouter = require("./router/staticrouter");
const userrouter = require("./router/user");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/url",urlrouter);
app.use("/",staticrouter);
app.use("/user",userrouter);


dbconnected();
app.listen(port,()=>{console.log("server start at port : ",port)});
