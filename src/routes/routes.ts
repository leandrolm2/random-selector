import express, { Request, Response, Router } from 'express'
import UserController  from '../app/controller/userController'
const router = express.Router()

router.get('/ping', (req: Request ,res: Response) => {
    return res.send('pong')
})

router.post('/create_user', UserController.create)

export default router 