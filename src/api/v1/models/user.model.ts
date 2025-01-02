// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import mongoose from "mongoose";



// -- == [[ SCHEMAS ]] == -- \\

const UserPermissionsSchema = new mongoose.Schema({

    canPostBlog: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: false
    },

    canLikeBlog: {
        type: mongoose.SchemaTypes.Boolean,
        default: true,
        required: false
    },

    canPostComments: {
        type: mongoose.SchemaTypes.Boolean,
        default: true,
        required: false
    },

    canLikeComments: {
        type: mongoose.SchemaTypes.Boolean,
        default: true,
        required: false
    },

})


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


    permissions: {

        type: UserPermissionsSchema,

        default: {
            canPostBlog: false,
            canLikeBlog: true,
            canPostComments: true,
            canLikeComments: true,
        },

        required: false,
        _id: false,
        id: false

    },

    createdBlogArticles: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    },

    createdComments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    },

    likedBlogArticles: {

        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    },

    likedComments: {

        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false,
        _id: false,
        id: false
    },

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