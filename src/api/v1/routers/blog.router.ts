// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Modules/Packages

import express from 'express';


// Validators

import { ValidateUserIsLoggedIn } from '@v1validators/login.validator';
import { ValidateCanPostBlog } from '@v1validators/blog.validator';


// Controllers

// import { LoginUser } from '@v1controllers/login.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE BLOG ROUTER ]] == -- \\

const BlogRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

BlogRouter.route('/')
    // POST /api/v1/blog
    .post(ValidateUserIsLoggedIn, ValidateCanPostBlog)
    // GET /api/v1/blog
    .get((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: "/api/v1/blog is OK"
            }

        });

    })



// -- == [[ EXPORTS ]] == -- \\

export default BlogRouter;