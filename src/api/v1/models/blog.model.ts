// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import mongoose from "mongoose";



// -- == [[ SCHEMAS ]] == -- \\

const ArticleSchema = new mongoose.Schema({

    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    coverImage: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 1000,
        required: true
    },

    title: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 100,
        required: true
    },

    body: {
        type: String,
        minLength: 5,
        maxLength: 25000,
        required: true,
        _id: false,
        id: false
    },

    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    },

    likedBy: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    }

}, {
    timestamps: true
})



// -- == [[ MODELS ]] == -- \\

const ArticleModel = mongoose.model("Article", ArticleSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    ArticleSchema,
    ArticleModel

}