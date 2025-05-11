import { insertNewUser, findUser } from "./model";

// modify the stuff from the model route (business logic)
export async function handleRegister(username: string, password:string) {
    try {
        const hashedPassword = await Bun.password.hash(password);
        await insertNewUser(username, hashedPassword);

        return { message: "User registered successfully"};
    } catch (e) {
        console.log("Error in handleRegister", e);
        throw new Error("Failed to register user");
    } 
}

export async function findUserByUsername(username: string) {
    try {
        const user = findUser(username);

        return user || [];
    } catch (e) {
        console.error("Error in findUserByUsername:", e);
        throw new Error("Failed to find user");
    }
}