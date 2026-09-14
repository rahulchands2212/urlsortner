const mongoose = require("mongoose");

async function dbconnected() {
    await mongoose.connect("mongodb://127.0.0.1:27017/urlshortner");
        console.log("connected to mongodb");
}

module.exports={
    dbconnected,
}