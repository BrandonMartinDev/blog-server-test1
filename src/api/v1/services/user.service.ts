// -- == [[ IMPORTS ]] == -- \\

// Models

import { UserModel } from "@v1models/user.model";


// -- == [[ SERVICE METHODS ]] == -- \\

async function GetUserByName(username: string) {

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    return user;

}


async function CreateUser(username: string, password: string) {

    const user = await GetUserByName(username);
    if (user) throw new Error(`A user with the username '${username}' already exists!`);

    const createdUser = await UserModel.create({
        displayName: username,
        username: username.toLowerCase(),
        password: password
    });

    if (!createdUser) throw new Error("There was an error creating the user.");

    return createdUser;

}


// -- == [[ EXPORTS ]] == -- \\

export {

    GetUserByName,
    CreateUser

}