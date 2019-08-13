const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://demoniik111:7dnf7op7k@cluster0-3gpur.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices")
  .then(db => console.log('DB conectada'))
  .catch(err => console.log(error));
});