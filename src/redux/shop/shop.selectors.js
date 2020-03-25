import {createSelector} from 'reselect';



const shopCollections = state => state.shop;

export const selectShopCollections = createSelector(
    [shopCollections],
    shop => shop.collections
);

export const selectCollectionsPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
);