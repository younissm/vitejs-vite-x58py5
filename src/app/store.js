import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
import networkSlice from "./features/networkSlice";
import signupSlice from "./features/signupSlice";
import averageRatingSlice from "./features/averageRatingSlice";
import compareSlice from "./features/compareSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistWishlistConfig = {
  key: "wishlist",
  storage,
};

const persistCompareConfig = {
  key: "compare",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);
const persistedWishlist = persistReducer(persistWishlistConfig, wishlistSlice);
const persistedCompare = persistReducer(persistCompareConfig, compareSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    signup: signupSlice,
    login: loginSlice,
    averageRating: averageRatingSlice,
    cart: persistedCart,
    wishlist: persistedWishlist,
    compare: persistedCompare,
  },
});

export const persistor = persistStore(store);
