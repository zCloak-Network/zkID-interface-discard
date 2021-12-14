import { ApiPromise } from '@polkadot/api';

export interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}

export interface ApiProps extends ApiState {
  api: ApiPromise; // 具体的api对象
  apiError: string | null; // 错误信息
  isApiConnected: boolean; // 是否已经连接至链
  isApiInitialized: boolean; // 是否已经初始化完成, 初始化完成是指获取所需要的链上数据
  isWaitingInjected: boolean; // 是否等待数据注入
  injectedAccounts?: InjectedAccountExt[];
}

/*
 * 通过api获取的一些信息, 存储为状态信息
 */
export interface ApiState {
  // apiDefaultTx: SubmittableExtrinsicFunction; //默认的tx函数
  systemChain: string; // 链
  systemName: string; // 名称
  systemVersion: string; // 版本信息
}
