/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-12 15:23:11
 * @LastEditTime: 2022-01-05 16:05:12
 */

export interface TokenProps {
  tokenImageUrl?: string;
  tokenName: string;
  tokenAddress: string;
}

export type ProofStatus = "Verified True" | "Verified False" | "Verifing" | "";
