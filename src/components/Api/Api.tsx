import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import type { InjectedExtension } from "@polkadot/extension-inject/types";
import { Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import types from "../../types.json";
import "./Api.scss";
import { ApiProvider } from "./apiContext";
import { ApiProps, ApiState } from "./types";
// export interface ApiState {
//   apiDefaultTx: SubmittableExtrinsicFunction;
//   apiDefaultTxSudo: SubmittableExtrinsicFunction;
//   hasInjectedAccounts: boolean;
//   isApiReady: boolean;
//   isDevelopment: boolean;
//   isEthereum: boolean;
//   systemChain: string;
//   systemName: string;
//   systemVersion: string;
// }

// export interface ApiProps {
//   api: ApiPromise;
//   apiError: string | null;
//   extensions?: InjectedExtension[];
//   isApiConnected: boolean;
//   isApiInitialized: boolean;
//   isWaitingInjected: boolean;
// }

// 传入的数据定义
interface Props {
  children: React.ReactNode; // 暂时理解为传入的组件
  url?: string; // 要连接的链的url信息
  // store?:
}

// 注入的外部account定义(例, 来自extension)
interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
    whenCreated: number;
  };
}
// 链信息
interface ChainData {
  injectedAccounts: InjectedAccountExt[]; // 获取extension的account
  // properties: ChainProperties; // 链属性 定义来自 @polkadot/types/interfaces
  systemChain: string; //
  systemName: string;
  systemVersion: string;
}

let api: ApiPromise;

export { api };

async function getInjectedAccounts(
  injectedPromise: Promise<InjectedExtension[]>
): Promise<InjectedAccountExt[]> {
  try {
    await injectedPromise;
    const accounts = await web3Accounts();
    return accounts.map(
      ({ address, meta }, whenCreated): InjectedAccountExt => ({
        address,
        meta: {
          ...meta,
          name: `${meta.name || "unknown"} (${
            meta.source === "polkadot-js" ? "extension" : meta.source
          })`,
          whenCreated,
        },
      })
    );
  } catch (error) {
    console.error("web3Enable", error);
    return [];
  }
}

async function retrieve(
  api: ApiPromise,
  injectedPromise: Promise<InjectedExtension[]>
): Promise<ChainData> {
  const [systemChain, systemName, systemVersion, injectedAccounts] =
    await Promise.all([
      // api.rpc.system.properties(),
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      getInjectedAccounts(injectedPromise),
    ]);

  return {
    injectedAccounts,
    // properties,
    systemChain: (systemChain || "<unknown>").toString(),
    // systemChainType,
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString(),
  };
}

function Api({ children, url }: Props): React.ReactElement<Props> | null {
  const [state, setState] = useState<ApiState>({} as unknown as ApiState);

  const [isApiConnected, setIsApiConnected] = useState(false);
  const [isApiInitialized, setIsApiInitialized] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [extensions, setExtensions] = useState<
    InjectedExtension[] | undefined
  >();

  const value = useMemo<ApiProps>(
    () => ({
      ...state,
      api,
      apiError,
      extensions,
      isApiConnected,
      isApiInitialized,
      isWaitingInjected: !extensions,
    }),
    [apiError, extensions, isApiConnected, isApiInitialized]
  );

  useEffect((): void => {
    (async () => {
      const provider = new WsProvider(url);
      api = await ApiPromise.create({ provider, types });
      const injectedPromise = web3Enable("POC");
      injectedPromise
        .then(async (res) => {
          if (res && res.length > 0) {
            const res = await retrieve(api, injectedPromise);
            setState(res);
            setIsApiInitialized(true);
            setIsApiConnected(true);
          }
          setExtensions(res);
        })
        .catch((err) => {
          setApiError(err);
        });
    })();
  }, []);

  if (!isApiInitialized) {
    return (
      <div className="loading">
        <div className="connecting">
          <Spin
            size="large"
            tip="Waiting to make a connection to the zCloak-node and finishing API initialization."
          />
        </div>
        {children}
      </div>
    );
  }

  return <ApiProvider value={value}>{children}</ApiProvider>;
}

export default React.memo(Api);
