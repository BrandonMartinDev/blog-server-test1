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
import { ValidateCanPostBlog, ValidateGetBlog } from '@v1validators/blog.validator';


// Controllers

import { PostBlog, GetBlog, GetFeaturedBlogs } from '@v1controllers/blog.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE BLOG ROUTER ]] == -- \\

const BlogRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

BlogRouter.route('/featured')
    // GET /api/v1/blog/featured
    .get(GetFeaturedBlogs)



BlogRouter.route('/:blog_id')
    // GET /api/v1/blog/{BLOG_ID}
    .get(ValidateGetBlog, GetBlog)



BlogRouter.route('/')
    // POST /api/v1/blog
    .post(ValidateUserIsLoggedIn, ValidateCanPostBlog, PostBlog)
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