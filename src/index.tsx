/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-06 11:23:24
 * @LastEditTime: 2022-01-11 17:16:56
 */

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import store from "./state";
import App from "./pages/App";
import MyContext from "./components/Context";
import Web3ReactManager from "./components/Web3ReactManager";

import getLibrary from "./utils/getLibrary";

import { NetworkContextName } from "./constants";

import "antd/dist/antd.css";
import "./styles/index.scss";
const web3 = new Web3(Web3.givenProvider);
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function Root(): React.ReactElement {
  return (
    <StrictMode>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <MyContext.Provider value={{ web3: web3 }}>
                <Router>
                  <App />
                </Router>
              </MyContext.Provider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </Provider>
    </StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
