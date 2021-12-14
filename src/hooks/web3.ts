/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-12-14 13:35:16
 * @LastEditTime: 2021-12-14 14:01:16
 */
// import { Web3Provider } from '@ethersproject/providers'
// import { useWeb3React } from '@web3-react/core'
// import { useEffect } from 'react'

// import { gnosisSafe, injected } from '../connectors'

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
// export function useInactiveListener(suppress = false) {
//   const { active, error, activate } = useWeb3React()

//   useEffect(() => {
//     const { ethereum } = window

//     if (ethereum && ethereum.on && !active && !error && !suppress) {
//       const handleChainChanged = () => {
//         // eat errors
//         activate(injected, undefined, true).catch((error) => {
//           console.error('Failed to activate after chain changed', error)
//         })
//       }

//       const handleAccountsChanged = (accounts: string[]) => {
//         if (accounts.length > 0) {
//           // eat errors
//           activate(injected, undefined, true).catch((error) => {
//             console.error('Failed to activate after accounts changed', error)
//           })
//         }
//       }

//       ethereum.on('chainChanged', handleChainChanged)
//       ethereum.on('accountsChanged', handleAccountsChanged)

//       return () => {
//         if (ethereum.removeListener) {
//           ethereum.removeListener('chainChanged', handleChainChanged)
//           ethereum.removeListener('accountsChanged', handleAccountsChanged)
//         }
//       }
//     }
//     return undefined
//   }, [active, error, suppress, activate])
// }
