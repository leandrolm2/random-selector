import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../model/categories'

class TagsController{
    public async create(req: Request, res: Response, next: NextFunction){
        const { tag, category } = req.body
        const userId = res.locals.jwt.id
        try{
            const foundCategory = await Category
                .findOne({user_id: userId})
                // .findOne({categories: [{categoryName: category}]})

            return res.status(200).send({message: `new Tag: ${tag} created`})
        }catch(err){
            return res.status(500).send({message: 'something went wrong'})
        }
    }
}

export default new TagsController()