// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import mongoose from "mongoose";
import { UserSchema } from "@v1models/user.model";
import { ArticleSchema } from "@v1models/blog.model";



// -- == [[ SCHEMAS ]] == -- \\

const CommentSchema = new mongoose.Schema({
    
    author_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    blog_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Article",
        required: true,
    },

    body: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 1000,
        required: true
    },

    likedBy: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false
    }

}, {
    timestamps: true
})



// -- == [[ MODELS ]] == -- \\

const CommentModel = mongoose.model("Comment", CommentSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    CommentSchema,

    CommentModel

}