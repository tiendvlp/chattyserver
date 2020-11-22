const db = require('../../../data/mongodb/ConnectMongodb')
const GridFsStorage = require('multer-gridfs-storage')
let gridfsStorage

function createStoryGridFsStorage () {
    gridFsStorage = new GridFsStorage({
      db: db.get(),
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err)
            }
            let s = "ádad sds nsdjsnd jnsdsd d   "
            console.log("trim: " + s.replace(/\s/g,''))
            const filename = buf.toString("hex")+"_"+(file.originalname.replace(/\s/g,''))
            console.log("crypto: " +filename)
            const fileInfo = {
              filename: filename,
              bucketName: "story"
            }
            resolve(fileInfo)
          });
        });
    }})
  }
  

function get () {
    return gridfsStorage
}

module.exports = {
    createStoryGridFsStorage,
    get
}
