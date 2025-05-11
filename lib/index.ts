import jwt from "@elysiajs/jwt";
import swagger from "@elysiajs/swagger";
import { SQL } from "bun";
import Elysia, { t } from "elysia";
import usersRoutes from './users/routes';

// !!!!!!!!!! PROJECT WISHLIST
// needs to be a restful API with
// creating, updating, deleting and searching (one or multiple)
// needs authentication (JWT), documenting (Swagger) and testing
// TO-DO: setup docker
// TO-DO: implement authentication in methods
// TO-DO: create new file and folder to put the request methods

if (Bun.env.DB_URL == null || Bun.env.JWT_SECRET == null) {
    throw new Error("Missing .env information");
}

const dbInitFile = await Bun.file('init.psql').text();
await `${dbInitFile}`;

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
    .use(jwt({
        secret: Bun.env.JWT_SECRET,
        name: 'jwt'
        }))
    .use(usersRoutes)
    .get('/getAllWishlistItems/:tied_user', async ({ params }) => {
        const { tied_user } = params;
        const items = await db`SELECT * FROM items WHERE tied_user = ${tied_user}`;
        return { items };
    })
    .get('/getWishlistItemById/:uuid', async ({params}) => {
        const { uuid } = params;
        const item = await db`SELECT * FROM items WHERE uuid = ${uuid}`;
        return { item };
    })
    .post('/createNewWishlistItem/', async ({ body }) => {
        const { itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user } = body;

        await db`INSERT INTO items ( itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user ) VALUES ( ${itemname}, ${itemurl}, ${imgurl}, ${itemprice}, ${itemcolor}, ${itembrand}, ${itemsize}, ${itemcurrency}, ${tied_user} )`;
    }, 
    {
        body: t.Object({
            itemname: t.String(),
            itemurl: t.String(),
            imgurl: t.String(),
            itemprice: t.String(),
            itemcolor: t.String(),
            itembrand: t.String(),
            itemsize: t.String(),
            itemcurrency: t.Number(),
            tied_user: t.String()
        })
    })
    .put('/updateWishlistItem/:uuid', async ({ params, body }) => {
        const { uuid } = params;
        const { itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user } = body;

        await db`UPDATE items SET itemname = ${itemname}, itemurl = ${itemurl}, imgurl = ${imgurl}, itemprice = ${itemprice}, itemcolor = ${itemcolor}, itembrand = ${itembrand}, itemsize = ${itemsize}, itemcurrency = ${itemcurrency}, tied_user = ${tied_user} WHERE uuid = ${uuid}`;
    },
    {
        body: t.Object({
            itemname: t.String(),
            itemurl: t.String(),
            imgurl: t.String(),
            itemprice: t.String(),
            itemcolor: t.String(),
            itembrand: t.String(),
            itemsize: t.String(),
            itemcurrency: t.Number(),
            tied_user: t.String()
        })
    })
    .delete('/deleteWishlistItem/:uuid', async ({ params }) => {
        const { uuid } = params;
        await db`DELETE FROM items WHERE uuid = ${uuid}`;
    })
    .post('/login', async ({ body, jwt }) => {
        const { username, password } = body;
        const userHashedPass = userDatabaseMatch[0][1];
        

        const passCheck = await Bun.password.verify(password, userHashedPass);
        if (passCheck) {
            return jwt.sign({
                password
            });
        }
    }, {
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    })
    .listen(5000, () => console.log("API is running"));



