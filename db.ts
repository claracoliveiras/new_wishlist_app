import { SQL } from "bun";

export const db = new SQL({
    url: Bun.env.DB_CONN_STRING,
    onconnect: client => {
        console.log("Connected to database");
    },
    onclose: client => {
        console.log("Connection closed");
    }
});
