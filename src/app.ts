import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { userRouter } from "./app/modules/User/user.route";

const app:Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response)=>{
    res.send({
        message: "Hospital is open"
    })
})


app.use('/api/v1/user', userRouter)
export default app