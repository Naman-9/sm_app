import mongoose, { Schema } from "mongoose";
import User from "./User";

export interface IPost extends Document {
    content: string;
    image: string;
    likes: number;
    comments: {
        commentedBy: mongoose.Types.ObjectId;
        comment: string;
    }[];
    postedBy: mongoose.Types.ObjectId;
}


const PostSchema: Schema<IPost> = new Schema({
    content: {
        type: String, 
    },
    image: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            commentedBy: {
                type: mongoose.Schema.ObjectId,
                ref: User,
            },
            comments: {
                type: String,
            }
        }
    ],
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: User,
    }
    
},{timestamps:true});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
