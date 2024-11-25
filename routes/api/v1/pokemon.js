
const router = require('express').Router()

const {getCollection, ObjectId} = require('../../../db-connection')

const getPokemonCollection = getCollection('PokemonAPI')
const getPokemon = getPokemonCollection('Pokemon')
//const getBadges = getPokemonCollection('Badges')


router.get('/', async (_, response) => {
    const collection = await getPokemon()
    const count = await collection.countDocuments()
    const number = Math.floor(Math.random() * count) + 1
    const found = await collection.findOne({ number })

    if (!found) response.send({ error: `Cannot find pokemon number: ${number}`})
        else response.send(found)
})

router.get('/pokemon/:number', async (request, response) => {
    const { number } = request.params // remember number is a string!!!

    const collection = await getPokemon()
    const found = await collection.findOne({ number: parseInt(number) })

    if (!found) response.send({ error: `Cannot find pokemon number: ${number}`})
        else response.send(found)
})

router.get('/pokemon/id/:id', async (request, response) => {
    const { id } = request.params // remember number is a string!!!

    const collection = await getPokemon()
    const found = await collection.findOne({ _id: new ObjectId(id) })

    if (!found) response.send({ error: `Cannot find pokemon number with id: ${id}`})
        else response.send(found)
})




router.post('/pokemon/add', async (request, response) => {
    const { number, name, types } = request.body
    const collection = await getPokemon()
    const result = await collection.insertOne({ number, name, types })
    response.send(result)

})

module.exports = router