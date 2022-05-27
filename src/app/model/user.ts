import {Schema, model} from "mongoose";
import Iuser from '../interface/user'
import bcrypt from "bcrypt";

const userSchema: Schema<Iuser> = new Schema<Iuser>(
    {
        _id: String,
        username: {
            type: String,
            required: true
        },        
        email: {
            type: String,
            required: true
        },
        password: { 
            type: String, 
            required: true,
            select: false
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if (this === undefined || !this.password) {
        next();
    }
    const hash = await bcrypt.hash(this.password!, 8);
    this.password = hash;
    next();
});

export default model<Iuser>('User', userSchema)