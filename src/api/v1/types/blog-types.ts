// -- == [[ TYPES ]] == -- \\

import { User } from "./user-types";


// Blog Article

type Article = {

    _id: string;                        // Handled by MongoDB (BlogID)

    author: string | User;              // UserID of the author or author info
    createdAt: Date;                    // Date timestamp of when the article was created

    title: string;                      // Title of the blog article (min 3 chars, max 100 chars)
    body: string;                       // The body of the blog article

    comments: Comment[];                // An array of comments on the blog

    likedBy: string[];                  // An array of UserIDs that point to who liked the blog

}



// -- == [[ EXPORTS ]] == -- \\

export {
    Article
}