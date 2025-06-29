import { insertWishlistItemModel, selectWishlistItemPerIdModel, selectWishlistItemsPerUserModel } from "./items.model";

export async function insertWishlistItemService(itemname: string, itemurl: string, imgurl: string, itemprice: Number, itemcolor: string, itembrand: string, itemsize: string, itemcurrency: string, tied_user: string) {
    return await insertWishlistItemModel(itemname, itemurl, imgurl, itemprice, itemcolor, itembrand, itemsize, itemcurrency, tied_user);
}

export async function selectWishlistItemsPerUserService(tied_user: string) {
    const query = await selectWishlistItemsPerUserModel(tied_user);
    const items: any[] = [];

    query.map((result: any) => items.push(result));
    return items;
}

export async function selectWishlistItemPerIdService(uuid: string) {
    const query = await selectWishlistItemPerIdModel(uuid);

    const item = query[0];
    return item;
}