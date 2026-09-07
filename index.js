const express = require("express");
const app = express();
const { dbconnected } = require("./connection/user");
const router = require("./router/users");
const port = 7000;

app.use(express.json());
app.use("/",router);

dbconnected();
app.listen(port,()=>{console.log("server start at port : ",port)});