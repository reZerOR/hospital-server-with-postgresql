import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { userRouter } from "./app/modules/User/user.route";
import { adminRoutes } from "./app/modules/Admin/admin.route";

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
app.use('/api/v1/admin', adminRoutes)
export default app