import Elysia, { t } from "elysia";
import { findAllUsersController, loginController, registerController } from "./users.controller";
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
        return await registerController(username, password);
    },
    {
        body: t.Object({
            username: t.String(),
            password: t.String()
        }),
    },
)
    .post('/login', async ({body, jwt, cookie: { auth, usernameCookie }})  => {
        const { username, password } = body;
        const passwordMatchResults = await loginController(username, password);
        if(passwordMatchResults) {
            const value = await jwt.sign({ username });

            auth.set({
                value,
            });

            usernameCookie.set({
                value: username,
            });

            return { message: "User logged in successfully" }
        }
        
    },
    {
        cookie: t.Cookie({
            usernameCookie: t.Optional(t.String())
        }),
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    } 
)
    .get('/getAllUserList', async () => {
        return await findAllUsersController();
    }
);