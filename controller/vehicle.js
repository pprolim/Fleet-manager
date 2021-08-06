// const { MongoClient } = require("mongoo");

// // Connection URI
// const uri = "mongodb+srv://admin:Mx7wmXrLtzZ6jJK@clusterfleet.0y4pg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

var vehicle = required('../models/vehicle')

exports.test = (req, res) => {
    res.send('Olá! Teste ao Controller');
}
