const express = require("express");
const app = express();
const path = require("path");
const { dbconnected } = require("./connection/user");
const urlrouter = require("./router/urls");
const staticrouter = require("./router/staticrouter");
const port = 7000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/",urlrouter);
app.use("/",staticrouter);


dbconnected();
app.listen(port,()=>{console.log("server start at port : ",port)});
