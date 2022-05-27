
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../model/user'
import logging from '../../config/logging';
import signJWT from '../../function/singJWT'
import bcrypt from "bcrypt";
const NAMESPACE = 'User';
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

    public async validateToken(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACE, 'Token validated, user authorized.');
    
        return res.status(200).json({
            message: 'Token(s) validated'
        });
    };

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
}

export default new UserController();