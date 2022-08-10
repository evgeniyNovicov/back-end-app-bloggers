import { blogerRepository } from "../repositories/bloggers-in-memory-repository"
import { postsRepository } from "../repositories/posts-in-memory-repossitory"

const posts : Array<postType> = []

export type postType = {
    id : number,
    title : string,
    shortDescription : string,
    content : string,
    bloggerId : number,
    bloggerName : string
}

export const postsService = {
    async addNewPost (
        title : string,
        shortDescription : string,
        content : string,
        bloggerId : number): Promise<postType | null> {
            const bloggerIndexDb = await blogerRepository.getBloggerId(bloggerId)
            if(bloggerIndexDb) {
                const newPost = {
                    id: +(Date.now()),
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId,
                    bloggerName: "Evgeniy"
                }
                return postsRepository.addNewPost(newPost)
            }
            return null
    },
    async getAllPost () {
        return postsRepository.getAllPost()
    },
    async findPost(id : number) : Promise<postType | null> {
        return postsRepository.findPost(id)
    },
    async updatePost(
        id: number,
        title : string,
        shortDescription : string,
        content : string,
        bloggerId : number
    ) {
        const resultBloggerId = await blogerRepository.getBloggerId(bloggerId)
        if(resultBloggerId) {
            return postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
        }
        if (!resultBloggerId) {
            return "not found blogger id"
        }
    },
    async deletePost(
        id: number,
    ) {
        const resultDeletePost = postsRepository.deletePost(id)
        return resultDeletePost
    }
}