import { bloggers } from "./bloggers-repository"

const posts : Array<post> = [
    // {id: 0, title: "фыафыафыфыа", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"},
    // {id: 1, title: "фыasdsadыафыфыа", shortDescription: "string", content: "string", bloggerId: 1, bloggerName: "string"}
]

type post = {
    id : number,
    title : string,
    shortDescription : string,
    content : string,
    bloggerId : number,
    bloggerName : string
}

export const postsRepository = {
    addNewPost (
        title : string,
        shortDescription : string,
        content : string,
        bloggerId : number) {
            const bloggerIndex = bloggers.findIndex((element) => element.id === bloggerId)
            if(bloggerIndex !== -1) {
                const newPost = {
                    id: +(Date.now()),
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId,
                    bloggerName: "sadas"
                }
                posts.push(newPost)
                return newPost
            }
            return false
    },
    getAllPost() {
        return posts
    },
    findPost(id : number) {
        const curentPost = posts.find((element) => element.id === id)
        if(curentPost) {
            return curentPost
        }
        return false
    },
    updatePost(
        id: number,
        title : string,
        shortDescription : string,
        content : string,
        bloggerId : number
    ) {
        const curentUpdatePost = posts.find((element) => element.id === id)
        if(curentUpdatePost) {
            curentUpdatePost.title = title
            curentUpdatePost.shortDescription = shortDescription
            curentUpdatePost.content = content
            curentUpdatePost.bloggerId = bloggerId
            return curentUpdatePost
        }
        return false
    },
    deletePost(
        id: number,
    ) {
        const curentPostIndex = posts.findIndex((element) => element.id === id)
        if(curentPostIndex + 1){
            const deletePost = posts[curentPostIndex]
            posts.splice( curentPostIndex, 1)
            return deletePost
        }
        return false
    }
}