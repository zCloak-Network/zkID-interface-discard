/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-21 14:34:08
 * @LastEditTime: 2022-01-05 14:42:00
 */
import { configureStore } from "@reduxjs/toolkit";

import application from "./application/reducer";
import transactions from "./transactions/reducer";

const store = configureStore({
  reducer: {
    application,
    transactions,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
