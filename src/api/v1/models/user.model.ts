// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import mongoose from "mongoose";


// Schemas

import { ArticleSchema } from "@v1models/blog.model";



// -- == [[ SCHEMAS ]] == -- \\

const UserSchema = new mongoose.Schema({

    displayName: {
        type: mongoose.SchemaTypes.String,
        min: 3,
        max: 23,
        required: true,
    },

    username: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 23,
        required: true,
        lowercase: true
    },

    password: {
        type: mongoose.SchemaTypes.String,
        minLength: 8,
        maxLength: 150,
        required: true
    },



    createdBlogArticles: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false
    },

    createdComments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false
    }

}, {
    timestamps: true
});




// -- == [[ MODELS ]] == -- \\

const UserModel = mongoose.model("User", UserSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    UserSchema,

    UserModel

}