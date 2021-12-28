/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2021-12-24 18:41:14
 */
import { useMemo, useCallback } from 'react'
import { AppState } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../hooks'
import {  ApplicationModal, setOpenModal,  PopupContent, addPopup, removePopup } from './reducer'
import { DEFAULT_TXN_DISMISS_MS } from '../../constants'

export function useModalOpen(modal: ApplicationModal): boolean {
    const openModal = useAppSelector((state: AppState) => state.application.openModal)
    return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
    const open = useModalOpen(modal)
    const dispatch = useAppDispatch()
    return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}
  

export function useToggleSelectTokenModal(): () => void {
    return useToggleModal(ApplicationModal.SELECT_TOKEN)
}
  

export function useToggleErrorModal(): () => void {
    return useToggleModal(ApplicationModal.ERROR)
}

export function useToggleConnectWalletModal(): () => void {
    return useToggleModal(ApplicationModal.CONNECT_WALLET)
}
  
export function useToggleSubmitProofModal(): () => void {
    return useToggleModal(ApplicationModal.SUBMIT_PROOF)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
    const dispatch = useAppDispatch()
  
    return useCallback(
      (content: PopupContent, key?: string, removeAfterMs?: number) => {
        dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS }))
      },
      [dispatch]
    )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
    const dispatch = useDispatch()
    return useCallback(
      (key: string) => {
        dispatch(removePopup({ key }))
      },
      [dispatch]
    )
  }
  
  // get the list of active popups
  export function useActivePopups(): AppState['application']['popupList'] {
    const list = useSelector((state: AppState) => state.application.popupList)
    return useMemo(() => list.filter((item) => item.show), [list])
  }