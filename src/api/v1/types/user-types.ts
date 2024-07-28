// -- == [[ TYPES ]] == -- \\

type User = {

    user_id: string;                    // UserID of the user

    blogArticles: string[];             // The article_ids the user has created

    createdAt: Date;                    // Date timestamp of when the user was created

}



// -- == [[ EXPORTS ]] == -- \\

export {
    User
}