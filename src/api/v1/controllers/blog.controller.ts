// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';

import { Article } from '@v1/types/blog-types';


// Utils

import { CatchErr } from '@v1/utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1/services/Response.service';
import { GetUserByID } from '@v1services/user.service';
import { SanitizeBlog } from '@v1/services/sanitize.service';

import {
    CreateBlogArticle,
    GetBlogByID,
    GetFeaturedBlogsFromDB
} from '@v1/services/blog.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function GetBlog(req: Request, res: Response, next: NextFunction) {

    try {


        // Get blog_id from request parameters

        const { blog_id } = req.params;
        if (!blog_id) throw new Error("Could not get 'blog_id' parameter!");


        // Get blog info

        const blog = await GetBlogByID(blog_id);

        if (!blog) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: (`Could not find blog with an id of '${blog_id}'`)
                }

            });

            return;

        }


        // Sanitizes blog to be sent to client safely

        const sanitizedBlog = SanitizeBlog(blog as unknown as Article);


        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: (`Successfully retrieved blog ${blog_id}`),
                data: sanitizedBlog
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR GETTING BLOG");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting blog"
            }

        });

    }

}

async function GetFeaturedBlogs(req: Request, res: Response, next: NextFunction) {

    try {


        // Get blog_id from request parameters


        // Get blog info

        const blogList = await GetFeaturedBlogsFromDB();

        if (!blogList) {

            RespondToClient(res, {

                statusCode: 500,

                responseJson: {
                    error: (`Could not get featured blogs`)
                }

            });

            return;

        }


        // Sanitizes blogs to be sent to client safely

        const sanitizedBlogList = blogList.map((blog: unknown) => SanitizeBlog(blog as Article));


        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: (`Successfully retrieved featured blogs`),
                data: sanitizedBlogList
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR GETTING FEATURED BLOGS");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting featured blogs"
            }

        });

    }

}

async function PostBlog(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets logged in userid

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: "Not logged in"
                }

            });

            return;

        }


        // Gets user from userid

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 500,

                responseJson: {
                    error: "There was an error getting the current logged in user"
                }

            });

            return;

        }


        const blogInfo = req.body;


        const newBlog = await CreateBlogArticle(user._id.toString(), blogInfo);

        if (!newBlog) {

            RespondToClient(res, {

                statusCode: 500,

                responseJson: {
                    error: "Something went wrong when creating your blog"
                }

            });

            return;

        }

        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: (`Successfully created blog ${newBlog._id}`)
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR POSTING BLOG");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error posting your blog"
            }

        });

    }

}

async function EditBlog(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets logged in userid

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: "Not logged in"
                }

            });

            return;

        }


        // Gets user from userid

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 500,

                responseJson: {
                    error: "There was an error getting the current logged in user"
                }

            });

            return;

        }


        // Get blog_id from request parameters

        const { blog_id } = req.params;
        if (!blog_id) throw new Error("Could not get 'blog_id' parameter!");


        // Get blog info from db

        const blog = await GetBlogByID(blog_id);

        if (!blog) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: (`Could not find blog with an id of '${blog_id}'`)
                }

            });

            return;

        }


        // Validates blog creator is the same as the current logged in user

        if (blog.author._id.toString() !== user._id.toString()) {

            RespondToClient(res, {

                statusCode: 403,

                responseJson: {
                    error: 'Unauthorized'
                }

            });

            return;

        }


        // Gets new blog info from request body

        const { coverImage, title, body } = req.body;


        // Updates the blog with the new info and saves it

        blog.coverImage = coverImage;
        blog.title = title;
        blog.body = body;

        await blog.save();


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: (`Successfully updated blog ${blog_id}`)
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR UPDATING BLOG");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error updating your blog"
            }

        });

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    PostBlog,
    GetBlog,
    GetFeaturedBlogs,
    EditBlog

}