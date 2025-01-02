// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';

import { User } from '@v1/types/user-types';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1services/Response.service';
import { GetUserByID } from '@v1services/user.service';
import { SanitizeUser } from '@v1/services/sanitize.service';
import { GetBlogByID } from '@v1/services/blog.service';
import { AddUserArticleLike, RemoveUserArticleLike } from '@v1/services/likes.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function GetUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets id from request parameters

        const { id } = req.params;
        if (!id) throw new Error("Could not get 'id' parameter!");


        // Gets user from id

        const user = await GetUserByID(id);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `A user with an id of ${id} could not be found!`
                }

            });

            return;

        }


        // Sanitizes user to be sent to client safely

        const sanitizedUser = SanitizeUser(user as unknown as User);


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved user info",
                data: sanitizedUser

            }

        })

    } catch (err) {

        CatchErr(err, "ERROR GETTING USER")

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting the user requested"
            }

        });

    }

}

async function GetLoggedInUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Checks if a logged in user exists in the session

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: (`Not logged in`)
                }

            })

            return;

        }


        // Gets user from id

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `Logged in user could not be found!`
                }

            });

            return;

        }


        // Sanitizes user to be sent to client safely

        const sanitizedUser: User = SanitizeUser(user as unknown as User);


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved logged in user info",
                data: sanitizedUser

            }

        })

    } catch (err) {

        CatchErr(err, "ERROR GETTING LOGGED IN USER")

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting the current logged in user"
            }

        });

    }

}



async function GetUserArticleLikes(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets id from request parameters

        const { id } = req.params;
        if (!id) throw new Error("Could not get 'id' parameter!");


        // Gets user from id

        const user = await GetUserByID(id);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `A user with an id of ${id} could not be found!`
                }

            });

            return;

        }


        // Gets liked blog articles from user

        const userLikes = user.likedBlogArticles;

        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved user likes",
                data: userLikes

            }

        })

    } catch (err) {

        CatchErr(err, "ERROR GETTING USER LIKES")

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting the user's likes"
            }

        });

    }

}

async function GetCurrentUserArticleLikes(req: Request, res: Response, next: NextFunction) {

    try {

        // Checks if a logged in user exists in the session

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: (`Not logged in`)
                }

            })

            return;

        }


        // Gets user from id

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `Logged in user could not be found!`
                }

            });

            return;

        }


        // Gets liked blog articles from current user

        const userLikes = user.likedBlogArticles;

        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved current user likes",
                data: userLikes

            }

        })

    } catch (err) {

        CatchErr(err, "ERROR GETTING CURRENT USER LIKES")

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error getting the current user's likes"
            }

        });

    }

}



async function AddArticleLike(req: Request, res: Response, next: NextFunction) {

    try {

        // Get blog_id from request parameters

        const { blog_id } = req.body;

        if (!blog_id) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    message: "Missing 'blog_id' on request body."
                }

            })

            return;
        };


        // Checks if a logged in user exists in the session

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: (`Not logged in`)
                }

            })

            return;

        }


        // Gets user from id

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `Logged in user could not be found!`
                }

            });

            return;

        }


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


        // Adds like to article

        await AddUserArticleLike(blog_id, userId);

        RespondToClient(res, {
            statusCode: 201,
            responseJson: {
                message: (`Successfully added like to '${blog_id}'`)
            }
        });

    } catch (err) {

        CatchErr(err, "ERROR ADDING LIKE TO ARTICLE");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error liking the article"
            }

        });

    }

}

async function RemoveArticleLike(req: Request, res: Response, next: NextFunction) {

    try {

        // Get blog_id from request parameters

        const { blog_id } = req.body;

        if (!blog_id) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    message: "Missing 'blog_id' on request body."
                }

            })

            return;
        };


        // Checks if a logged in user exists in the session

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: (`Not logged in`)
                }

            })

            return;

        }


        // Gets user from id

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `Logged in user could not be found!`
                }

            });

            return;

        }


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


        // Removes like from article

        await RemoveUserArticleLike(blog_id, userId);

        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: (`Successfully removed like from '${blog_id}'`)
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR REMOVING LIKE FROM ARTICLE");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error removing the like from the article"
            }

        });

    }

}

// -- == [[ EXPORTS ]] == -- \\

export {

    GetUser,
    GetLoggedInUser,
    GetUserArticleLikes,
    GetCurrentUserArticleLikes,

    AddArticleLike,
    RemoveArticleLike

}