import {Schema, model} from "mongoose";
import Icategory from "../interface/categories";

const categorySchema: Schema<Icategory> = new Schema<Icategory>(
    {
        _id: String,
        user_id: {
            type: String,
            requeried: true
        },
        category: {
            type: String,
            requeried: true,

        },
        tags: {
            type: [String],
            requeried: true
        }
    },
    {
        timestamps: true,
    }
)

export default model<Icategory>('Category', categorySchema)