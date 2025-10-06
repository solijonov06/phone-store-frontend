import {createSlice} from "@reduxjs/toolkit";
import {ProductsPageState} from "../../../lib/data/types/screen";

const initialState: ProductsPageState = {
    STORE: null,
    chosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {
        setSTORE: (state, action) => {
            state.STORE = action.payload
        },
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
    },
});

export const {setSTORE, setChosenProduct, setProducts} =
productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;