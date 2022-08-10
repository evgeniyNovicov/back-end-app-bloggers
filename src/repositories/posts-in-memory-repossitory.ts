import { bloggers } from "./bloggers-in-memory-repository"

const posts : Array<post> = []

type post = {
    id : number,
    title : string,
    shortDescription : string,
    content : string,
    bloggerId : number,
    bloggerName : string
}

export const postsRepository = {
    async addNewPost (newPost: post): Promise<post | null> {
            const bloggerIndex = bloggers.findIndex((element) => element.id === newPost.bloggerId)
            if(bloggerIndex !== -1) {
                posts.push(newPost)
                return newPost
            }
            return null
    },
    async getAllPost() {
        return posts
    },
    async findPost(id : number) : Promise<post | null> {
        const curentPost = posts.find((element) => element.id === id)
        if(curentPost) {
            return curentPost
        }
        return null
    },
    async updatePost(
        id: number,
        title : string,
        shortDescription : string,
        content : string,
        bloggerId : number
    ) {
        const curentUpdatePost = posts.find((element) => element.id === id)
        const curentBloggersId = bloggers.find((element) => element.id === bloggerId)
        if(curentUpdatePost && curentBloggersId) {
            curentUpdatePost.title = title
            curentUpdatePost.shortDescription = shortDescription
            curentUpdatePost.content = content
            curentUpdatePost.bloggerId = bloggerId
            return curentUpdatePost
        }
        if (!curentBloggersId) {
            return "not found blogger id"
        }
        return false
    },
    async deletePost(
        id: number,
    ) {
        const curentPostIndex = posts.findIndex((element) => element.id === id)
        if(curentPostIndex !== -1){
            const deletePost = posts[curentPostIndex]
            posts.splice( curentPostIndex, 1)
            return deletePost
        }
        return false
    }
}