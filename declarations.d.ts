/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-08-16 19:01:12
 * @LastEditTime: 2021-12-27 22:41:09
 */
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

declare interface Window {
    ethereum: {
        on: (a: string, b:(accounts: any) => void) => void,
        isMetaMask: boolean,
        request: (request: { method: string, params?: Array<any> }) => Promise<any>
    }
}