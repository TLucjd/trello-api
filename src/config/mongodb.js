import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
    })

export const connectToDatabase = async () => {
    await client.connect();
    trelloDatabaseInstance = client.db(env.DATABASE_NAME)
}   

export const getTrelloDatabase = () => {
    if (!trelloDatabaseInstance) {
        throw new Error('Trello database not initialized. Call connectToDatabase first.')
    }
    return trelloDatabaseInstance
}

export const closeDatabaseConnection = async () => {
    if (client) {
        await client.close()
    }
}