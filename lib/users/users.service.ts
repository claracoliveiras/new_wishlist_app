import { insertNewUser, findUser, findAllUsers } from "./users.model";

export async function registerService(username: string, password:string) {
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    
    try {
        const hashedPassword = await Bun.password.hash(password);
        await insertNewUser(username, hashedPassword);

        return { message: "User registered successfully"};
    } catch (e) {
        console.log("Error in handleRegister", e);
        throw new Error("Failed to register user");
    } 
}

export async function loginService(username:string, password:string) {
    const user = await findUserByUsernameService(username);

    if (user == null) {
        throw new Error("User not found.");
    }

    const hashedPassword = user[1];
    const passCheck = await Bun.password.verify(password, hashedPassword);
    
    return passCheck;
}

export async function findUserByUsernameService(username: string) {
    try {
        const user = await findUser(username);

        return user || [];
    } catch (e) {
        console.error("Error in findUserByUsername:", e);
        throw new Error("Failed to find user");
    }
}

export async function findAllUsersService() {
    try {
        const modelQuery = await findAllUsers();
        const users: any[] = [];

        modelQuery.map((results: any) => users.push(results));
        
        return users;
    } catch (e) {
        console.error("Error in findAllUsersService", e);
        throw new Error("Failed to find users");
    }
}