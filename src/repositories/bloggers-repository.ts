type bloggerType = {
    id : number,
    name : string,
    youtubeUrl : string
}
const bloggers : Array<bloggerType> = [
    {id: 0, name: "Parker", youtubeUrl: "https://www.youtube.com/"},
    {id: 1, name: "Smith", youtubeUrl: "https://www.youtube.com/"}
]

export const blogerRepository = {
    getAllBlogger () {
        return bloggers
    },
    getBloggerId (id : number) {
        const curentBlogger = bloggers.find((element) => element.id === id)
        return curentBlogger
    },
    addNewBlogger (
        name : string,
        youtubeUrl : string
    ) {
        const newBlogger = {
            id : +(Date.now()),
            name : name,
            youtubeUrl : youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    updateBlogger (id : number, name : string, youtubeUrl : string) {
        const curentBlogger = bloggers.find((element) => element.id === id)
        if(curentBlogger) {
            curentBlogger.name = name
            curentBlogger.youtubeUrl = youtubeUrl
            return curentBlogger
        }
        return false
    },
    deleteBlogger (id : number) {
        const deleteBloggerId = bloggers.findIndex((element) => element.id === id)
        if(deleteBloggerId + 1) {
            const deleteBlogger = bloggers[deleteBloggerId]
            bloggers.splice( deleteBloggerId, 1)
            return bloggers
        }
    }
}