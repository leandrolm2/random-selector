
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../model/user'
import signJWT from '../../function/singJWT'
import bcrypt from "bcrypt";
import Category from '../model/categories'
class UserController {
    public async create(req: Request, res: Response){
        const {username, password, email} = req.body
        // const isUser = await User.findOne({username: username})

        if (await User.findOne({ username })) return res.status(400).send({message: `User ${username} alware exist`})

        try{
            const newUser = await new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                password,
                email
            }).save();
            
            newUser.password = undefined
            
            return res.status(200).send(newUser)
        }catch(err){

            return res.status(400).send({err: 'error', message: 'somenthing went wrong'})
        }

    }

    public async login(req: Request, res: Response){
        const { username, password } = req.body;
        const user =  await User.findOne({username}).select(["+password"])

        if (!user) return res.status(404).json({err: 'error', message:'user not found'});

        if(!(await bcrypt.compare(password, user.password!))) return res.status(401).json({ message: 'Password Mismatch'})

        signJWT(user, (_error, token) => {
            if (_error) {
                return res.status(500).json({
                    message: _error.message,
                    error: _error
                });
            } else if (token) {
                user.password = undefined
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    user: user
                });
            }
        });

    }

    public async update(req: Request, res: Response){
        const body = req.body;
        const userId = res.locals.jwt.id
        const user = await User.findOne({ _id: userId });

        if(!user) return res.status(404).json({ message: 'user not found'})

        user!.username = body.username;
        await user.save()

        return res.status(200).send(user)
    }

    public async delete(req: Request, res: Response){
        const userId = res.locals.jwt.id
        const user = await User.findOne({ _id: userId });

        if(!user) return res.status(404).json({ message: 'user not found'})

        try{
            await Category.deleteMany({user_id: userId})
            await user.delete()

            return res.status(200).send({message: `the user ${user.username} deleted`})
        }catch(err){
            return res.status(500).json({ message:'somenthing went wrong'})
        }        
    }

    public async logout(req: Request, res: Response){

    }
}

export default new UserController();