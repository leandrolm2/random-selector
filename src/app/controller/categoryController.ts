import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../model/categories'

class CategoryController {
    public async createCategory(req: Request, res: Response) {
        const { categorie } = req.body
        
    }
}

export default new CategoryController();