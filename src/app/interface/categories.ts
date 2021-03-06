import { Document, Types } from 'mongoose'

export default interface Icategory extends Document {
    _id: string,
    user_id: string
    categoryName: string;
    tags: Types.Array<string>;
}
