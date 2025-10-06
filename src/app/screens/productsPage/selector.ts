import {createSelector} from 'reselect';
import {AppRootState} from "../../../lib/data/types/screen"

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaraunt = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.restaraunt
);

export const retrieveChosenProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.products
);