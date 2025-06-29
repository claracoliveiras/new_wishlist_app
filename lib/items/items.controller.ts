import { deleteWishlistItemService, insertWishlistItemService, selectWishlistItemPerIdService, selectWishlistItemsPerUserService, updateWishlistItemService } from "./items.service";

export async function newWishlistItemController(itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string, tied_user: string) {
    try {
        return await insertWishlistItemService(itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user);
    } catch (e) {
        console.log("Error thrown in controller", e);
        throw e;
    }
}

export async function selectWishlistItemsPerUserController(tied_user: string) {
    try {
        return await selectWishlistItemsPerUserService(tied_user);
    } catch (e) {
        console.log("Error thrown in controller", e);
        throw e;
    }
}

export async function selectWishlistItemPerIdController(uuid: string) {
    try {
        return await selectWishlistItemPerIdService(uuid);
    } catch (e) {
        console.log("Error thrown in controller", e);
        throw e;
    }
}

export async function updateWishlistItemController(uuid: string, itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string) {
    try {
        return await updateWishlistItemService(uuid, itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency);
    } catch (e) {
        console.log("Error thrown in controller", e);
        throw e;
    }
}

export async function deleteWishlistItemController(uuid: string) {
    try {
        return await deleteWishlistItemService(uuid);
    } catch (e) {
        console.log("Error thrown in service", e);
        throw e;
    }
}