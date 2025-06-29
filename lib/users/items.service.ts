import { insertNewUser, findUser, findAllUsers } from "./items.model";

// modify the stuff from the model route (business logic)
export async function handleRegister(username: string, password:string) {
    if (password.length < 8) {
        return { message: "Password needs to be at least 8 characters"}
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

export async function handleLogin(username:string, password:string) {
    const user = await findUserByUsername(username);
    const hashedPassword = user[1];

    const passCheck = await Bun.password.verify(password, hashedPassword);
    return passCheck;
}

export async function findUserByUsername(username: string) {
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