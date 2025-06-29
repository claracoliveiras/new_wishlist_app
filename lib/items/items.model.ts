import { db } from "../../db";

export async function insertWishlistItemModel(itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string, tied_user: string) {
    try {
        return await db`INSERT INTO items ( itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user ) VALUES ( ${itemname}, ${itemurl}, ${imgurl}, ${itemprice}, ${itemcolor}, ${itembrand}, ${itemsize}, ${itemcurrency}, ${tied_user} )`;
    } catch (e) {
        console.log("Error thrown in model: ", e);
        throw e;
    }
}

export async function selectWishlistItemsPerUserModel(tied_user: string) {
    try {
        return await db`SELECT * FROM items WHERE tied_user = ${tied_user}`;
    } catch (e) {
        console.log("Error thrown in model", e);
        throw e;
    }
}

export async function selectWishlistItemPerIdModel(uuid: string) {
    try {
        const query = await db`SELECT * FROM items WHERE id = ${uuid}`.values();
        console.log(query);
        return query;
    } catch (e) {
        console.log("Error thrown in model", e);
        throw e;
    }
}