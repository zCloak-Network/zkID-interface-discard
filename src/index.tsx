/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-06 11:23:24
 * @LastEditTime: 2021-12-13 13:56:13
 */

import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { HashRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyContext from "./components/Context";
// import Event from "./components/Notification";

import "./styles/index.scss";
import "antd/dist/antd.css";

const web3 = new Web3(Web3.givenProvider);

function App(): React.ReactElement {
  return (
    <MyContext.Provider value={{ web3: web3 }}>
      {/* <Event /> */}
      <Router>
        <HomePage />
      </Router>
      {/* </Event> */}
    </MyContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
