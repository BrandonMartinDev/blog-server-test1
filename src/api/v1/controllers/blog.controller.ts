// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Utils

import { CatchErr } from '@v1/utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1/services/Response.service';
import { GetUserByID } from '@v1services/user.service';
import { CreateBlogArticle, GetBlogByID } from '@v1/services/blog.service';



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

        const sanitizedBlog: any = blog;        // Checkout user.controller.ts @line 59

        sanitizedBlog.__v = undefined;
        sanitizedBlog.updatedAt = undefined;


        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: (`Successfully retrieved blog ${blog_id}`),
                data: blog
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



// -- == [[ EXPORTS ]] == -- \\

export {

    PostBlog,
    GetBlog

}