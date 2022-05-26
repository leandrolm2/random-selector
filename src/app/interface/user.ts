import { Document } from 'mongoose'

export default interface Iuser extends Document {
    _id: string,
    name: string,
    password?: string
}