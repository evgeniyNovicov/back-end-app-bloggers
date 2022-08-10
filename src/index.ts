import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { bloggerRouter } from './routers/bloggersRouter';
import { postRouter } from './routers/postsRouter';
import { authMiddleware } from './midlewares/authMiddleware';
import { runDB } from './repositories/db';
const app = express()
const port = process.env.PORT || 3001

export let counter : number= 0
// const autorizationMiddleware = (req: Request, res: Response, next : NextFunction) => {
//   counter++
//   next()
// }
// app.use(autorizationMiddleware)
app.use(bodyParser())
app.use(cors())

app.use('/bloggers', bloggerRouter)

app.use('/posts', postRouter)
const startApp = async () => {
  // await runDB()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
startApp()


