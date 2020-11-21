let mongoDb

function connect (callBack) {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://tiendvlp:tiendeveloper@cluster0.8yq3x.mongodb.net/Chatty_Auth?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    mongoDb = client.db("chatty")
    // perform actions on the collection object
    console.log("Connected")
    callBack(err)
  });
}

function get () {
  return mongoDb;
}

function close () {
  mongoDb.close();
}

module.exports = {
  connect,
  get,
  close
}
