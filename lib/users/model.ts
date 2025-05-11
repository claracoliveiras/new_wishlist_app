// where the raw sql goes

import { db } from "../db";

export async function insertNewUser(username: string, hashedPassword: string) {
    try {
            const result = await db`INSERT INTO users ( username, password ) VALUES ( ${username}, ${hashedPassword})`;
            return result[0];
        } catch (e) {
            console.log("Error in insertNewUser:", e);
            throw e;
        }
}

export async function findUser(username: string) {
    try {
        const userDatabaseMatch = await db`SELECT * FROM users WHERE username = ${username}`.values();
        return userDatabaseMatch.length > 0 ? userDatabaseMatch[0] : null;
    } catch (e) {
        console.log("Error in findUser:", e);
        throw new Error("Failed to find user");
    }

}