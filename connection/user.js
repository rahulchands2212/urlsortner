const {MongoClient} = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function dbconnected(){
await client.connect()
.then(()=>console.log("connectd to monogodb"))
.catch((err)=>{
    console.log(err.message);
});
}

module.exports ={
    dbconnected,
    client,
}
