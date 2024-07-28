// -- == [[ TYPES ]] == -- \\

// Blog Article Comments

type Comment = {

    _id: string;                        // Handled by MongoDB (CommentID)

    blog_id: string;                    // BlogID of the blog the comment belongs to
    author_id: string;                     // UserID of the person who created the comment

    body: string;                       // Body text of the comment (Min 3 chars, max 1000)
    likedBy: string[];                  // An array of UserIDs that point to who liked the comment

}



// -- == [[ EXPORTS ]] == -- \\

export {

    Comment

}