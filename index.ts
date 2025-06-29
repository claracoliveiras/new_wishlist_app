import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import { SQL } from "bun";
import Elysia, { t } from "elysia";
import usersRoutes from './lib/users/items.routes';
import itemsRoutes from './lib/items/items.routes';
import { db } from "./db";

// !!!!!!!!!! PROJECT WISHLIST
// TO-DO: needs testing
// TO-DO: setup docker
// TO-DO: implement authentication in methods

if (Bun.env.DB_CONN_STRING == null || Bun.env.JWT_SECRET == null) {
    throw new Error("Missing .env information");
}

await db.file('init.psql');

const app = new Elysia()
    .use(swagger({
            documentation: {
                info: {
                    title: 'Wishlist API',
                    description: 'API for managing a wishlist website',
                    version: '1.0.0'
                }
            }
        }))
    .use(usersRoutes)
    .use(itemsRoutes)
    .listen(5000, () => console.log("API is running"));



