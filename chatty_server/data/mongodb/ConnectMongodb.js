let mongoDb
let storyBucket
let gridFsStorage // use as a support-engine for multer to work with mongodb
let client
const crypto = require('crypto')
const GridFSStorage = require('multer-gridfs-storage')

function connect (callBack) {
  const mongo = require('mongodb')
  const MongoClient = mongo.MongoClient;
  const uri = "mongodb+srv://tiendvlp:tiendeveloper@cluster0.8yq3x.mongodb.net/chatty?retryWrites=true&w=majority";
  client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    mongoDb = client.db("chatty")
    storyBucket = new mongo.GridFSBucket(mongoDb, {bucketName: "resource"})
    createGridFsStoryStorage()
    console.log('Chatty: Connected(main_db)')
    callBack(err)
  });
}

function createGridFsStoryStorage () {
  gridFsStorage = new GridFSStorage({
    db: mongoDb,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = buf.toString("hex")+"_"+(file.originalname.replace(/\s/g,''))
          console.log("crypto: " +filename)
          const fileInfo = {
            filename: filename,
            bucketName: "resource"
          }
          resolve(fileInfo)
        });
      });
  }})
}

function get () {
  return mongoDb;
}

function getGridFsStorage () {
  return gridFsStorage
}

function getBucket () {
  return storyBucket
}

function close () {
  mongoDb.close()
}

function getMongoDbClient () {
  return client
}

module.exports = {
  connect,
  get,
  getBucket,
  getMongoDbClient,
  getGridFsStorage,
  close
}
