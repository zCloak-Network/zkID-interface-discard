/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 17:03:58
 * @LastEditTime: 2021-12-21 19:03:52
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
  