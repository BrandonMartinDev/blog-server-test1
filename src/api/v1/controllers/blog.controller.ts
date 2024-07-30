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
import { CreateBlogArticle } from '@v1/services/blog.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

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
                error: (`Successfully created blog ${newBlog._id}`)
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

    PostBlog

}