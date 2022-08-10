import { postsCollection, postType } from './db'
import { bloggersCollection } from './db'

const posts : Array<postType> = []



export const postsRepository = {
    async addNewPost (newPost : postType): Promise<postType | null> {
        const resultPost = await postsCollection.insertOne(newPost)
        return newPost
    },
    async getAllPost () {
        return postsCollection.find({}).toArray()
    },
    async findPost(id : number) : Promise<postType | null> {
        const curentPost : postType | null = await postsCollection.findOne({id: id})
        return curentPost
    },
    async updatePost(
        id: number,
        title : string,
        shortDescription : string,
        content : string
    ) {
        const result = await postsCollection.updateOne({id : id},
            {$set : {
                title: title,
                shortDescription: shortDescription,
                content : content
            }}
        )
        return result.matchedCount === 1
    },
    async deletePost(
        id: number,
    ) {
        const resultDeletePost = await postsCollection.deleteOne({id : id})
        return resultDeletePost.deletedCount === 1
    }
}