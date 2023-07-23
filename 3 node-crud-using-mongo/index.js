const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb://0.0.0.0:27017'

// File System Operations
function getAllData(collectionName, callback) {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true })
    .then((client) => {
      let db = client.db('raw-node')
      let collection = db.collection(collectionName)

      collection
        .find()
        .toArray()
        .then((data) => {
          callback(null, data)

          client.close()
        })
        .catch((error) => callback(error, null))
    })
    .catch((error) => callback(error, null))
}

getAllData('users', (error, data) => {
  if (error) {
    console.log({ error })
  } else {
    console.log({ data })
  }
})
