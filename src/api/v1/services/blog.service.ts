// -- == [[ IMPORTS ]] == -- \\

// Models

import { Article } from "@v1types/blog-types";
import { ArticleModel } from "@v1models/blog.model";
import { GetUserByID } from "./user.service";



// -- == [[ SERVICE METHODS ]] == -- \\

async function GetBlogByID(id: string) {
    return await ArticleModel.findById(id).populate("author");
}


async function GetFeaturedBlogsFromDB() {
    return await ArticleModel.find({}).limit(10).populate("author");
}


async function CreateBlogArticle(author_id: string, blogInfo: Article) {

    // Gets the user from the author_id provided

    const user = await GetUserByID(author_id);
    if (!user) throw new Error(`There was an error getting a user with the id: ${author_id}`);


    // Verifies user can create blog article

    const canPostBlog = user.permissions?.canPostBlog;
    if (!canPostBlog) throw new Error(`User ${author_id} cannot post blog!`);


    // Adds the user's _id to the blogInfo provided

    blogInfo.author = user._id.toString();


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