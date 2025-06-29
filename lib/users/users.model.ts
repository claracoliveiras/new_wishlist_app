import { db } from "../../db";

export async function insertNewUser(username: string, hashedPassword: string) {
    try {
            const result = await db`INSERT INTO users ( user_username, user_password, user_displayname ) VALUES ( ${username}, ${hashedPassword}, 'test' )`;
            return result[0];
        } catch (e) {
            console.log("Error in insertNewUser:", e);
            throw e;
        }
}

export async function findUser(username: string) {
    try {
        const userDatabaseMatch = await db`SELECT * FROM users WHERE user_username = ${username}`.values();
        return userDatabaseMatch.length > 0 ? userDatabaseMatch[0] : null;
    } catch (e) {
        console.log("Error in findUser:", e);
        throw new Error("Failed to find user");
    }
}

export async function findAllUsers() {
    try{
        const users = await db`SELECT * FROM users`.values();
        return users;
    } catch (e) {
        console.log("Error in finding all users query", e);
        throw new Error("Failed to find users");
    }
}