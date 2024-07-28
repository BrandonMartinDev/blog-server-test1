// -- == [[ TYPES ]] == -- \\

type User = {

    _id: string;                        // Handled by MongoDB (UserID) 

    displayName: string;                // Min 3 chars, Max 23 chars, alphanumeric only
    username: string;                   // The display name, but lowercase
    password: string;                   // Min 8 chars, Max 150 chars
    createdAt: Date;                    // Date timestamp of when the user was created

    createdBlogArticles: string[];      // The BlogIDs the user has created
    createdComments: string[];          // The CommentIDs the user has created

}



// -- == [[ EXPORTS ]] == -- \\

export {
    User
}