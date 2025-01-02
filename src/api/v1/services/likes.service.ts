// -- == [[ IMPORTS ]] == -- \\

// Services

import mongoose, { mongo } from "mongoose";
import { GetBlogByID } from "./blog.service";
import { GetUserByID } from "./user.service";



// -- == [[ SERVICE METHODS ]] == -- \\

async function GetBlogLikes(blog_id: string) {

    // Finds blog from provided ID and returns its likes

    const blog = await GetBlogByID(blog_id);
    if (!blog) throw new Error(`Could not find blog with an id of '${blog_id}'`);

    return blog.likedBy;

}


async function GetUserArticleLikes(user_id: string) {

    // Finds user from provided ID and returns their likes

    const user = await GetUserByID(user_id);
    if (!user) throw new Error(`Could not find user with an id of '${user_id}'`);

    return user.likedBlogArticles;

}



async function AddUserArticleLike(blog_id: string, user_id: string) {

    // Gets blog and user from provided IDs

    const blog = await GetBlogByID(blog_id);
    if (!blog) throw new Error(`Could not find blog with an id of '${blog_id}'`);

    const user = await GetUserByID(user_id);
    if (!user) throw new Error(`Could not find user with an id of '${user_id}'`);


    // Checks to see if the user has already liked the blog

    const blogLikes = blog.likedBy;
    if (!blogLikes) throw new Error(`There was an error getting blog '${blog_id}' likes.`);

    const userLikes = user.likedBlogArticles;
    if (!userLikes) throw new Error(`There was an error getting user '${user_id}' likes.`);

    if (blogLikes.includes(new mongoose.Types.ObjectId(user_id)) || userLikes.includes(new mongoose.Types.ObjectId(blog_id))) throw new Error(`User '${user_id}' has already liked blog '${blog_id}'`);


    // Adds like to blog and user's likes array

    blogLikes.push(user._id);
    userLikes.push(blog._id);

    await blog.save();
    await user.save();

}

async function RemoveUserArticleLike(blog_id: string, user_id: string) {

    // Gets blog and user from provided IDs

    const blog = await GetBlogByID(blog_id);
    if (!blog) throw new Error(`Could not find blog with an id of '${blog_id}'`);

    const user = await GetUserByID(user_id);
    if (!user) throw new Error(`Could not find user with an id of '${user_id}'`);


    // Checks to see if the user has already liked the blog

    const blogLikes = blog.likedBy;
    if (!blogLikes) throw new Error(`There was an error getting blog '${blog_id}' likes.`);

    const userLikes = user.likedBlogArticles;
    if (!userLikes) throw new Error(`There was an error getting user '${user_id}' likes.`);

    const blogLikeIndex = blogLikes.indexOf(new mongoose.Types.ObjectId(user_id));
    const userLikeIndex = userLikes.indexOf(new mongoose.Types.ObjectId(blog_id));

    if (blogLikeIndex === -1 || userLikeIndex === -1) throw new Error(`User '${user_id}' has not liked blog '${blog_id}'`);


    // Removes like from blog and user's likes array

    blogLikes.splice(blogLikeIndex, 1);
    userLikes.splice(userLikeIndex, 1);

    await blog.save();
    await user.save();

}



// -- == [[ EXPORTS ]] == -- \\

export {

    GetBlogLikes,
    GetUserArticleLikes,
    AddUserArticleLike,
    RemoveUserArticleLike

}