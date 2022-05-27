import express, { Request, Response, Router } from 'express'
import extractJWT from '../app/middleware/extratJWT'
import UserController  from '../app/controller/userController'
const router = express.Router()

router.get('/ping', (req: Request ,res: Response) => {
    return res.send('pong')
})

router.post('/create_user',UserController.create)
router.post('/login_user', UserController.login)
// router.post('/delete_user', UserController.delete)
router.get('/validate_user', extractJWT,UserController.validateToken)
router.post('/create_user', UserController.create)
router.post('/create_user', UserController.create)
router.post('/create_user', UserController.create)

export default router 