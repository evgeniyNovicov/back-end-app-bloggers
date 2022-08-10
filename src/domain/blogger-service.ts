import  {blogerRepository} from '../repositories/bloggers-in-memory-repository'
import { bloggerType } from "../repositories/bloggers-in-memory-repository"

export const bloggerService = {
    async getAllBlogger (title : string | null) {
        return await blogerRepository.getAllBlogger(title)
    },
    async getBloggerId (id : number) : Promise<bloggerType | undefined> {
        return await blogerRepository.getBloggerId(id)
    },
    async addNewBlogger (
        name : string,
        youtubeUrl : string
    ) : Promise<bloggerType | null> {
        const newBlogger = {
            id : +(Date.now()),
            name : name,
            youtubeUrl : youtubeUrl
        }
        return await blogerRepository.addNewBlogger(newBlogger)
    },
    async updateBlogger (id : number, name : string, youtubeUrl : string) {
        return await blogerRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBlogger (id : number) {
        return await blogerRepository.deleteBlogger(id)
    }
}