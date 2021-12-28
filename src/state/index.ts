/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 14:34:08
 * @LastEditTime: 2021-12-24 15:09:45
 */
import { configureStore } from '@reduxjs/toolkit'

import application from './application/reducer'
import transactions from './transactions/reducer'



const store = configureStore({
  reducer: {
    application,
    transactions,
  },
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch