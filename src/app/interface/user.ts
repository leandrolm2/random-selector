import { Document, Types } from 'mongoose'

export default interface Iuser extends Document {
    _id: string,
    username: string,
    email: string,
    password?: string
    category_nameId: Types.Array<string>;
    dateCreated: number
}