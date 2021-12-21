/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-16 14:08:05
 * @LastEditTime: 2021-12-17 17:34:40
 */
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId, ALL_SUPPORTED_CHAIN_IDS } from '../constants/chains'
import { NetworkConnector } from './NetworkConnector'

export const injected = new InjectedConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})
  
export const gnosisSafe = new SafeAppConnector()

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MOONBASEALPHA]: 'https://rpc.testnet.moonbeam.network',
}

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1287,
})