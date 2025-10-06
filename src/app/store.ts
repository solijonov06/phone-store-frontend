import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import {createLogger} from "redux-logger";
import ProductsPageReducer from "./screens/productsPage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";

const logger = createLogger();

export const store = configureStore({
  middleware: (getDefaultMiddleware)=>
//@ts-ignore
    getDefaultMiddleware().concat(logger),
  reducer: {
    homePage: HomePageReducer,
    productsPage:ProductsPageReducer,
    ordersPage: OrdersPageReducer,

  },
});
//@ts-ignore
console.log("middlewares:", store.middleware)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;



//
