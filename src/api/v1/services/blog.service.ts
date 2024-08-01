// -- == [[ IMPORTS ]] == -- \\

// Models

import { Article } from "@v1types/blog-types";
import { ArticleModel } from "@v1models/blog.model";
import { GetUserByID } from "./user.service";



// -- == [[ SERVICE METHODS ]] == -- \\

async function GetBlogByID(id: string) {
    return await ArticleModel.findById(id);
}


async function GetFeaturedBlogsFromDB() {

    const test = ArticleModel.find({}).limit(10);

    return test;

}


async function CreateBlogArticle(author_id: string, blogInfo: Article) {

    // Gets the user from the author_id provided

    const user = await GetUserByID(author_id);
    if (!user) throw new Error(`There was an error getting a user with the id: ${author_id}`);


    // Adds the user's _id to the blogInfo provided

    blogInfo.author_id = user._id.toString();


    // Creates a new blog

    const createdBlog = await ArticleModel.create(blogInfo);
    if (!createdBlog) throw new Error("Something went wrong creating blog");


    // Adds the new blog's _id to the user's createdBlogArticles array and saves it

    user.createdBlogArticles?.push(createdBlog._id);
    await user.save();


    // Returns the createdBlog

    return createdBlog;

}


// -- == [[ EXPORTS ]] == -- \\

export {

    GetBlogByID,
    GetFeaturedBlogsFromDB,
    CreateBlogArticle,

}