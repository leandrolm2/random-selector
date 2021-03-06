import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../model/categories'

class TagsController{
    public async create(req: Request, res: Response, next: NextFunction){
        const { tag, category } = req.body
        const userId = res.locals.jwt.id
        try{
            const foundCategory = await Category
                .findOne({user_id: userId, categoryName: category})

            if(!foundCategory) return res.status(404).send({message:'Category not found'})

            for (const tags of foundCategory.tags){
                if(tags === tag) return res.status(400).send({message:'Tag already exist'})
            }

            foundCategory.tags.push(tag)
            await foundCategory.save()
            return res.status(200).send({message: `new Tag: ${tag} created`})
        }catch(err){
            return res.status(500).send({message: 'something went wrong'})
        }
    }

    public async tagsList(req: Request, res: Response, next: NextFunction){
        const { category } = req.params
        const userId = res.locals.jwt.id

        try{
            const foundCategory = await Category
            .findOne({user_id: userId, categoryName: category})
            if(!foundCategory) return res.status(404).send({message: `category from tags not found`})
            if(foundCategory!.tags.length < 0) return res.status(404).send({message:'This Category has no tags added to it'})

            return res.status(200).send(foundCategory?.tags)
        }catch(err){
            return res.status(404).send({message: 'Tags not found or does not exist'})
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction){
        const { tag, category } = req.params
        const userId = res.locals.jwt.id
        let amount = 0 

        try{
            const foundCategory = await Category
            .findOne({user_id: userId, categoryName: category})
            if(foundCategory!.tags.length < 0) return res.status(404).send({
                message:'This Category has no tags added to it'
            })

            for(const tags of foundCategory!.tags){
                if(tags === tag){
                    foundCategory!.tags.splice(amount, 1)
                    await foundCategory!.save()
                    return res.status(200).send({message:`tag  ${tag} deleted`})
                }
                amount += 1
                console.log(amount)
            }
            return res.status(404).send({message: 'tag not found'});
        }catch(err){
            console.log(err)
            return res.status(400).send({message: 'somenthing went wrong'})
        }
    }

    public async randomSelector(req: Request, res: Response, next: NextFunction){
        const {category} = req.params
        const userId = res.locals.jwt.id
        try{
            const cat = await Category.findOne({user_id: userId, categoryName: category})
            const randomTag = Math.floor(Math.random() * Number(cat!.tags.length))
            
            if(!cat) return res.status(404).json({message: 'category not found'})
            
            return res.status(200).send({message: `drawn tag: ${cat.tags[randomTag]}`})
        }catch(err){
            return res.status(500).send({message: 'somenthing went wrong'})
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        const { category, tag, newTag } = req.body
        const userId = res.locals.jwt.id

        try{
            const cat = await Category.findOne({user_id: userId, categoryName: category})
            
            if(!cat) return res.status(404).json({message: 'category not found'})
            
            for(let i = 0; i < cat.tags.length; i++){
                if(cat.tags[i] === tag){
                    cat.tags.splice(i, 1, newTag)
                    cat.save()
                    return res.status(204).send({message: `${tag} changed to ${newTag}`})
                }
            }

            return res.status(404).send({message: `tag ${tag} not found`})

        }catch(err){
            return res.status(500).send({message: 'somenthing went wrong'})
        }
    }
}

export default new TagsController()