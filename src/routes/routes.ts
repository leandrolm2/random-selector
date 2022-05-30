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
router.post('/create_user',UserController.create)
router.post('/login_user', UserController.login)
router.put('/update_user', extractJWT , UserController.update)
router.delete('/delete_user', extractJWT , UserController.delete)

/**
 * middleware
 */
router.use(extractJWT)

/**
 * category routes
 */
router.post('/create_category', CategoryController.createCategory)
router.delete('/delete_category/:category', CategoryController.deleteCategory)
router.get('/get_categories' ,CategoryController.getCategories)
router.put('/get_categories' ,CategoryController.update)

/**
 * tags routes
 */
router.post('/create_tag', TagsController.create)
router.delete('/delete_tag/:tag/:category', TagsController.delete)
router.get('/get_tags/:category', TagsController.tagsList)
router.put('/get_tags/:category', TagsController.update)

export default router 
