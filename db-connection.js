
const { MongoClient, ObjectId } = require('mongodb')

const { url } = require('./secrets/dbcon.json')

const client = new MongoClient(url)

const getCollection = dbName => collectionName => async() => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

module.exports = {getCollection, ObjectId}