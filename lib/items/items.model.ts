import { db } from "../../db";

export async function insertWishlistItemModel(itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string, tied_user: string) {
    try {
        return await db`INSERT INTO items ( itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user ) VALUES ( ${itemname}, ${itemurl}, ${imgurl}, ${itemprice}, ${itemcolor}, ${itembrand}, ${itemsize}, ${itemcurrency}, ${tied_user} )`;
    } catch (e) {
        console.log("Error in the item model: ", e);
        throw e;
    }
}

export async function selectWishlistItemsPerUserModel(tied_user: string) {
    return await db`SELECT * FROM items WHERE tied_user = ${tied_user}`;
}

export async function selectWishlistItemPerIdModel(uuid: string) {
    const query = await db`SELECT * FROM items WHERE id = ${uuid}`.values();
    console.log(query);
    return query;
}