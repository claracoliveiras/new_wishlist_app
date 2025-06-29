import { deleteWishlistItemModel, insertWishlistItemModel, selectWishlistItemPerIdModel, selectWishlistItemsPerUserModel, updateWishlistItemModel } from "./items.model";

export async function insertWishlistItemService(itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string, tied_user: string) {
    try {
        return await insertWishlistItemModel(itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user);
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}

export async function selectWishlistItemsPerUserService(tied_user: string) {
    try {
        const query = await selectWishlistItemsPerUserModel(tied_user);
        const items: any[] = [];

        query.map((result: any) => items.push(result));
        return items;
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}

export async function selectWishlistItemPerIdService(uuid: string) {
    try {
        const query = await selectWishlistItemPerIdModel(uuid);

        const item = query[0];
        return item;
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}

export async function updateWishlistItemService(uuid: string, itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string) {
    try {
        await updateWishlistItemModel(uuid, itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency);
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}

export async function deleteWishlistItemService(uuid: string) {
    try {
        return await deleteWishlistItemModel(uuid);
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}