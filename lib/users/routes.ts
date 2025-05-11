import Elysia, { t } from "elysia";
import { registerNewUser } from "./controller";

// setup the elysia routes here (app.get and wtv)
export default new Elysia(
    {
        prefix: '/users',
        tags: ['users']
    }
)
    .post('/register', async ({ body }) => {
        const { username, password } = body;
        registerNewUser(username, password);
    },
    {
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    });