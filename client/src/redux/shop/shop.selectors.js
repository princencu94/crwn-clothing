import {createSelector} from 'reselect';



const shopCollections = state => state.shop;

export const selectShopCollections = createSelector(
    [shopCollections],
    shop => shop.collections
);

export const selectCollectionsPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFetching = createSelector (
    [shopCollections],
    shop => shop.isFetching
);

export const selectisCollectionLoaded = createSelector (
    [shopCollections],
    shop => !!shop.collections
)


