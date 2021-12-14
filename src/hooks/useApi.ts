/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-07-01 11:27:16
 * @LastEditTime: 2021-08-27 18:03:52
 */
import { useContext } from 'react';
import ApiContext from '../components/Api/apiContext';
import { ApiProps } from '../components/Api/types';

export function useApi(): ApiProps {
  return useContext(ApiContext);
}
