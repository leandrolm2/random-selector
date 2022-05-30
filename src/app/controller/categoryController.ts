import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../model/categories'
import User from '../model/user'

class CategoryController {
    public async createCategory(req: Request, res: Response, next: NextFunction) {
        const { category } = req.body
        const userId = res.locals.jwt.id

        try{
            const cat = await User.findOne({_id: userId})

            const newCategory = new Category({
                _id: new mongoose.Types.ObjectId(),
                user_id: userId,
                categoryName: category
            })

            cat?.category_nameId.push(newCategory.categoryName)

            await newCategory.save()
            await cat!.save()
            return res.status(200).json({message: `new category ${category} created`})
        }catch(err){
            return res.status(400).send({
                message: 'somethign went wrong'
            })
        }
    }

    public async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const { category } = req.params
        const userId = res.locals.jwt.id

        try{
            const user = await User.findOne({_id: userId});
            let count = 0

            if(!user) return res.status(404).json({message:'Category not found'});

            for(let userCat of user.category_nameId){
                if(userCat === category) {
                    user.category_nameId.splice(count, 1)
                    const cat = await Category.findOne({user_id: userId, categoryName: category})
                    await cat!.delete()
                    await user.save()
                    return res.status(200).json({message:`${category} deleted`}) 
                }
                count += 1
            }
            
            return res.status(404).json({message:`${category} not found`})
        }catch(err){
            return res.status(400).json({message:'somenthing went wrong'})
        }

    }

    public async getCategories(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.jwt

        try{
           const cat = await User.findOne({_id: userId.id});
           
           if(!cat) return res.status(404).json({message: 'category not found'})
        
           return res.status(200).json({message: cat?.category_nameId})
        }catch(err){
            return res.status(404).send({message: 'category not found'})
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        const { category } = req.body
        const userId = res.locals.jwt.id

        try{
            const cat = await Category.findOne({user_id: userId, categoryName: category})
            if(!cat) return res.status(404).json({message: 'category not found'})
            cat.categoryName = category
            cat.save()
            return res.status(200).send({message: `category name change to ${category}`})

        }catch(err){
            return res.status(500).send({message: 'somenthing went wrong'})
        }
    }
}

export default new CategoryController();