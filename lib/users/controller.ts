import { findUserByUsername, handleRegister } from "./service";

// handles the request
export async function registerNewUser(username:string, password:string) {
    if (!username || !password) {
        throw new Error("Username and password are required");
    }
    
    const user = await findUserByUsername(username);
    if (user.length > 0) {
        throw new Error("Username already exists");
    }

    handleRegister(username, password);

    return { message: "User registered successfully" };
}