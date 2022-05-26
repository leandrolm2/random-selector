import { Document } from 'mongoose'

export default interface Icategory extends Document {
    _id: string,
    user_id: string,
    tags: string[],
}