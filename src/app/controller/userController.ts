
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../model/user'

class UserController {
    public async create(req: Request, res: Response){
        const {name, password} = req.body
        const isUser = await User.findOne({name: name})

        if (await User.findOne({ name })) return res.status(400).send({message: `User ${isUser} alware exist`})

        const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            password
        }).save();
        
        newUser.password = undefined
        
        return res.status(200).send(newUser)
    }
}

export default new UserController();