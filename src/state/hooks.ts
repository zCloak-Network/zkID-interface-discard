/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-21 14:41:52
 * @LastEditTime: 2021-12-21 18:20:12
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector