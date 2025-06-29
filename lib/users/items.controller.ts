import jwt from "@elysiajs/jwt";
import { findAllUsersService, findUserByUsername, handleLogin, handleRegister } from "./items.service";

// handles the request
export async function registerNewUser(username:string, password:string) {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }
    
    const user = await findUserByUsername(username);
    if (user.length > 0) {
         throw new Error("Username already exists");
    }

    await handleRegister(username, password);

    return { message: "User registered successfully" };
}

export async function loginUser(username: string, password:string) {
    const passwordMatch = await handleLogin(username, password);
    if (passwordMatch) {
        return passwordMatch;
    } else {
        throw new Error("Password doesn't match");
    }
    
}

export async function findAllUsersController() {
    const users = await findAllUsersService();
    return users;
}