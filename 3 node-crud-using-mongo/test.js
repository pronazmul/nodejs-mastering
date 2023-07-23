const { error } = require('console')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb://0.0.0.0:27017/raw-node'

MongoClient.connect(dbUrl, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connection Success')
    let db = client.db('raw-node')
    let collection = db.collection('users')

    // Insert New Document
    // let newUser = { _id: new ObjectId(), name: 'nazmul', age: 30 }
    // collection
    //   .insertOne(newUser)
    //   .then((data) => {
    //     console.log('Data inserted')
    //     console.log({ newUser })
    //   })
    //   .catch((error) => {
    //     console.log('FAiled to insert Data')
    //   })

    // Read All DAta
    // collection
    //   .find()
    //   .toArray()
    //   .then((data) => console.log({ data }))
    //   .catch((error) => console.log({ error }))

    // Update Data
    // collection
    //   .updateOne(
    //     { _id: new ObjectId('64b4ceb85ee170359fc17019') },
    //     { $set: { name: 'karim' } }
    //   )
    //   .then((data) => console.log({ data }))
    //   .catch((error) => console.log({ error }))

    // Delete Data
    // collection
    //   .deleteOne({ _id: new ObjectId('64b4ceb85ee170359fc17019') })
    //   .then((data) => console.log({ data }))
    //   .catch((error) => console.log({ error }))
  })
  .catch((error) => {
    console.log({ error })
  })
