/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2021-12-22 11:17:08
 */
import { useCallback } from 'react'
import { AppState } from '../index'
import { useAppDispatch, useAppSelector } from '../hooks'
import {  ApplicationModal, setOpenModal } from './reducer'

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
  