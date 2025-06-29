import Elysia, { t } from "elysia";
import { db } from "../../db";
import { deleteWishlistItemController, newWishlistItemController, selectWishlistItemPerIdController, selectWishlistItemsPerUserController, updateWishlistItemController } from "./items.controller";

export default new Elysia(
    {
        prefix: '/items',
        tags: ['items']
    }
)
    .get('/selectAllWishlistItemsPerUser/', async ({ cookie }) => {
        const tied_user = cookie.usernameCookie?.value;

        if (!tied_user) {
            throw new Error("No tied_user cookie");
        }

        return selectWishlistItemsPerUserController(tied_user);
    })
    .get('/selectWishlistItemById/:uuid', async ({params}) => {
        const { uuid } = params;
        return await selectWishlistItemPerIdController(uuid);
    })
    .post('/insertWishlistItem/', async ({ body, cookie }) => {
        const { itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency} = body;
        
        const tied_user = cookie.usernameCookie?.value;
        if (!tied_user) {
            throw new Error("Cookie not set");
        }
        
        return await newWishlistItemController(itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user);
    }, 
    {
        body: t.Object({
            itemname: t.String(),
            itemurl: t.String(),
            imgurl: t.String(),
            itemprice: t.Number(),
            itemcolor: t.String(),
            itembrand: t.String(),
            itemsize: t.String(),
            itemcurrency: t.String(),
        })
    })
    .put('/updateWishlistItem/:uuid', async ({ params, body }) => {
        const { uuid } = params;
        const { itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency } = body;

        return await updateWishlistItemController(uuid, itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency);
    },
    {
        body: t.Object({
            itemname: t.String(),
            itemurl: t.String(),
            imgurl: t.String(),
            itemprice: t.Number(),
            itemcolor: t.String(),
            itembrand: t.String(),
            itemsize: t.String(),
            itemcurrency: t.String(),
            tied_user: t.String()
        })
    })
    .delete('/deleteWishlistItem/:uuid', async ({ params }) => {
        const { uuid } = params;
        
        await deleteWishlistItemController(uuid);
        return { message: "Deleted successfully." }
    });