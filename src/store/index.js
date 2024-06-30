import {configureStore} from "@reduxjs/toolkit";

import roomArea from "../components/calculator/roomArea/roomAreaSlice";
import roomWorks from "../components/calculator/roomWorks/roomWorksSlice";
import totalCost from "../components/calculator/totalCost/totalCostSlice";
import settings from "../components/admin/settings/settingsSlice";
import login from "../components/admin/login/loginSlice";

const store = configureStore({
    reducer: {roomArea, roomWorks, totalCost, login, settings},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;