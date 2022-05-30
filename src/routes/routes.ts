import express, { Request, Response, Router } from 'express'
import extractJWT from '../app/middleware/extratJWT'
import UserController  from '../app/controller/userController'
import CategoryController from '../app/controller/categoryController'
import TagsController from '../app/controller/tagsController'
const router = express.Router()

router.get('/ping', (req: Request ,res: Response) => {
    return res.send('pong')
})

/**
 * user routes
 */
router.post('/user',UserController.create)
router.post('/user/login', UserController.login)
router.put('/user', extractJWT , UserController.update)
router.delete('/user', extractJWT , UserController.delete)

/**
 * middleware
 */
router.use(extractJWT)

/**
 * category routes
 */
router.post('/category', CategoryController.createCategory)
router.delete('category/:category', CategoryController.deleteCategory)
router.get('/category' ,CategoryController.getCategories)
router.put('/category/:category' ,CategoryController.update)

/**
 * tags routes
 */
router.post('/tag', TagsController.create)
router.delete('/tag/:tag/:category', TagsController.delete)
router.get('/tag/:category', TagsController.tagsList)
router.put('/tag/:category', TagsController.update)
router.get('/ramdomTag/:category', TagsController.randomSelector)

export default router 
