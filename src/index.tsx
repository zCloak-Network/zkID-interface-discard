/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-06 11:23:24
 * @LastEditTime: 2021-12-21 19:10:17
 */

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import {
  useWeb3React,
  createWeb3ReactRoot,
  Web3ReactProvider,
} from "@web3-react/core";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { useActiveWeb3React } from "./hooks/web3";
import store from "./state";
import HomePage from "./pages/HomePage";
import MyContext from "./components/Context";
import Web3ReactManager from "./components/Web3ReactManager";

import getLibrary from "./utils/getLibrary";

import { NetworkContextName } from "./constants";
// import Event from "./components/Notification";

import "./styles/index.scss";
import "antd/dist/antd.css";

const web3 = new Web3(Web3.givenProvider);
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

// if (window.ethereum) {
//   window.ethereum.autoRefreshOnNetworkChange = false;
// }

function App(): React.ReactElement {
  const { error, account } = useWeb3React();

  return (
    <StrictMode>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <MyContext.Provider value={{ web3: web3 }}>
                <Router>
                  <HomePage />
                </Router>
              </MyContext.Provider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </Provider>
    </StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
