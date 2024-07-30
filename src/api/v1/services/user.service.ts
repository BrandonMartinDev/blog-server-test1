// -- == [[ IMPORTS ]] == -- \\

// Models

import { UserModel } from "@v1models/user.model";



// -- == [[ SERVICE METHODS ]] == -- \\

async function GetUserByID(id: string) {
    return await UserModel.findById(id);
}


async function GetUserByName(username: string) {
    return await UserModel.findOne({ username: username.toLowerCase() });
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

    GetUserByID,
    GetUserByName,
    CreateUser

}