/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-08-16 19:01:12
 * @LastEditTime: 2021-12-06 15:38:34
 */
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

declare interface Window {
    ethereum: {
        on: (a: string, b:(accounts: any) => void) => void,
        request: ( {method: string} )=> any
    }
}