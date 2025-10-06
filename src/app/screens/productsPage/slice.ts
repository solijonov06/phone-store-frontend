import {createSlice} from "@reduxjs/toolkit";
import {ProductsPageState} from "../../../lib/data/types/screen";

const initialState: ProductsPageState = {
    restaraunt: null,
    chosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setRestaraunt: (state, action) => {
            state.restaraunt = action.payload
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
    },
});

export const {setRestaraunt, setChosenProduct, setProducts} =
productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;