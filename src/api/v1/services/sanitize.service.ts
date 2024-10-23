// -- == [[ IMPORTS ]] == -- \\

// Types

import { User } from "@v1/types/user-types";
import { Article } from "@v1/types/blog-types";



// -- == [[ SERVICE METHODS ]] == -- \\


function SanitizeUser(user: User) {

    const sanitizedUser: any = user;        // I knowwww I hate using any too, but this will have to do for now ~ 7/31/2024

    sanitizedUser.__v = undefined;          // I would have preferred to use the 'delete' syntax, but this will have to do :(
    sanitizedUser.password = undefined;
    sanitizedUser.updatedAt = undefined;
    sanitizedUser.permissions = undefined;

    return sanitizedUser;

}


function SanitizeBlog(blog: Article) {

    const sanitizedBlog: any = blog;

    if (typeof blog.author !== "string") {
        sanitizedBlog.author = SanitizeUser(blog.author);
    }

    sanitizedBlog.__v = undefined;
    sanitizedBlog.updatedAt = undefined;

    return sanitizedBlog;

}


// -- == [[ EXPORTS ]] == -- \\

export {

    SanitizeBlog,
    SanitizeUser

}