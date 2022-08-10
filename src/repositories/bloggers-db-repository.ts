import { bloggersCollection } from './db'
export type bloggerType = {
    id : number,
    name : string,
    youtubeUrl : string
}
export const blogerRepository = {
    async getAllBlogger (title : string) {
        const filter : any = {}
        if(title) {
            filter.title = title
        }
        return await bloggersCollection.find(filter,{projection: {_id: 0}}).toArray()
    },
    async getBloggerId (id : number) : Promise<bloggerType | null> {
        const curentBlogger : bloggerType | null = await bloggersCollection.findOne({id: id}, {projection: {_id: 0}})
        return curentBlogger
    },
    async addNewBlogger ( newBlogger : bloggerType) : Promise<bloggerType | null> {
        const result = await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },
    async updateBlogger (id : number, name : string, youtubeUrl : string) {
        const curentBlogger = await bloggersCollection.updateOne({id : id}, {$set: {name : name, youtubeUrl : youtubeUrl}})
        if(curentBlogger.matchedCount) {
            return curentBlogger
        }
        return false
    },
    async deleteBlogger (id : number) {
        const deleteBloggerId = await bloggersCollection.deleteOne({id : id})
        if(deleteBloggerId.deletedCount) {
            return true
        }
        return false
    }
}