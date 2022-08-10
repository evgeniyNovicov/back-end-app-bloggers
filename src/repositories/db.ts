import { MongoClient } from "mongodb"

export type bloggerType = {
    id : number,
    name : string,
    youtubeUrl : string
}

export type postType = {
    id : number,
    title : string,
    shortDescription : string,
    content : string,
    bloggerId : number,
    bloggerName : string
}

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const client = new MongoClient(mongoUri)
const db = client.db('social-network')
export const bloggersCollection = db.collection<bloggerType>('bloggers')
export const postsCollection = db.collection<postType>('posts')

export async function runDB() {
    try {
        await client.connect()
        await client.db('social-network').command({ping: 1})
        console.log('Connected seccsessfully')
    }
    catch {
        console.log('Connected falled')
        await client.close()
    }
}