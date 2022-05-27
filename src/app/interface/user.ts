import { Document } from 'mongoose'

export default interface Iuser extends Document {
    _id: string,
    username: string,
    email: string,
    password?: string
    dateCreated: number
}