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
        return query;
    } catch (e) {
        console.log("Error thrown in model", e);
        throw e;
    }
}

export async function updateWishlistItemModel(uuid: string, itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string) {
    try {
        return await db`UPDATE items SET itemname = ${itemname}, itemurl = ${itemurl}, imgurl = ${imgurl}, itemprice = ${itemprice}, itemcolor = ${itemcolor}, itembrand = ${itembrand}, itemsize = ${itemsize}, itemcurrency = ${itemcurrency} WHERE id = ${uuid}`
    } catch (e) {
        console.log("Error thrown in model", e);
        throw e;
    }
}

export async function deleteWishlistItemModel(uuid: string) {
    try {
        await db`DELETE FROM items WHERE id = ${uuid}`;
    } catch (e) {
        console.log("Error thrown in model", e);
        throw e;
    }
}