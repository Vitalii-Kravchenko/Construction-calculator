import {configureStore} from "@reduxjs/toolkit";

import roomArea from "../components/calculator/roomArea/roomAreaSlice";

const store = configureStore({
    reducer: {roomArea},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;