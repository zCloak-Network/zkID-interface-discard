/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 17:09:59
 * @LastEditTime: 2021-12-21 19:52:20
 */
import { createSlice } from '@reduxjs/toolkit'

export enum ApplicationModal {
    WALLET,
    CONNECT_WALLET,
    SELECT_TOKEN,
    ERROR,
    SUBMIT_PROOF
}

export interface ApplicationState {
    readonly openModal: ApplicationModal | null
  }

const initialState: ApplicationState = {
    openModal: null,
  }
  

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
      setOpenModal(state, action) {
        state.openModal = action.payload
      },
    },
  })
  

export const { setOpenModal } = applicationSlice.actions
export default applicationSlice.reducer

