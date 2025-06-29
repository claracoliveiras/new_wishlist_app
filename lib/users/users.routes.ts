import Elysia, { t } from "elysia";
import { findAllUsersController, loginUser, registerNewUser } from "./users.controller";
import jwt from "@elysiajs/jwt";

export default new Elysia(
    {
        prefix: '/users',
        tags: ['users']
    }
)
    .use(jwt({
        secret: Bun.env.JWT_SECRET ?? "default_secret",
        name: 'jwt'
        }))
    .post('/register', async ({ body }) => {
        const { username, password } = body;
        return await registerNewUser(username, password);
    },
    {
        body: t.Object({
            username: t.String(),
            password: t.String()
        }),
    },
)
    .post('/login', async ({body, jwt, cookie: { auth }}) => {
        const { username, password } = body;
        const passwordMatchResults = await loginUser(username, password);
        if(passwordMatchResults) {
            const value = await jwt.sign({ username });

            auth.set({
                value,
                maxAge: 7 * 86400,
            })

            return { message: "User logged in successfully" }
        }
        
    },
    {
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    } 
)
    .get('/getAllUserList', async () => {
        return await findAllUsersController();
    });