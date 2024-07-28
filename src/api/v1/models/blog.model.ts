// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import mongoose from "mongoose";



// -- == [[ SCHEMAS ]] == -- \\

const ImageSchema = new mongoose.Schema({

    appearsBeforeText: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: false
    },

    url: {
        type: mongoose.SchemaTypes.String,
        max: 1000,
        required: true,
    },

});


const TextSectionSchema = new mongoose.Schema({

    body: {
        type: mongoose.SchemaTypes.String,
        minLength: 5,
        maxLength: 1500,
        required: true
    },

    image: {
        type: ImageSchema,
        required: false
    }

});


const ArticleSectionSchema = new mongoose.Schema({

    heading: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 100,
        required: true
    },

    textSections: {
        type: [TextSectionSchema],
        default: [],
        required: true
    }

})



const ArticleSchema = new mongoose.Schema({

    author_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: mongoose.SchemaTypes.String,
        minLength: 3,
        maxLength: 100,
        required: true
    },

    sections: {
        type: [ArticleSectionSchema],
        default: [],
        required: true
    },

    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        required: false
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

const ArticleModel = mongoose.model("Article", ArticleSchema);



// -- == [[ EXPORTS ]] == -- \\

export {

    ImageSchema,
    TextSectionSchema,
    ArticleSectionSchema,
    ArticleSchema,

    ArticleModel

}