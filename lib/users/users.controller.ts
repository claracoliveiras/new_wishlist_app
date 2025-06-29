import jwt from "@elysiajs/jwt";
import { findAllUsersService, findUserByUsernameService, loginService, registerService } from "./users.service";

// handles the request
export async function registerController(username:string, password:string) {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }
    
    const user = await findUserByUsernameService(username);
    if (user.length > 0) {
         throw new Error("Username already exists");
    }

    await registerService(username, password);

    return { message: "User registered successfully" };
}

export async function loginController(username: string, password:string) {
    const passwordMatch = await loginService(username, password);
    if (passwordMatch) {
        return passwordMatch;
    } else {
        throw new Error("Password doesn't match");
    }
    
}

export async function findAllUsersController() {
    const users = await findAllUsersService();

    if (users.length == 0) {
        throw new Error("Couldn't find any users.")
    }
    return users;
}