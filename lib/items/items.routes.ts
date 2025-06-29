import Elysia, { t } from "elysia";
import { db } from "../../db";

export default new Elysia(
    {
        prefix: '/items',
        tags: ['items']
    }
).get('/getAllWishlistItems/:tied_user', async ({ params }) => {
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
    });