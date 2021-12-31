/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-30 16:38:02
 * @LastEditTime: 2021-12-28 18:44:50
 */
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Popups from "../../components/Popups";
import Header from "../../components/Header";
import Transfer from "../Transfer";
import Proof from "../Proof";
import Zk from "../Zk";
import Activities from "../Activities";
import RegulatedTransfer from "../Transfer/RegulatedTransfer";
import Modals from "../Modals";

import {
  useToggleErrorModal,
  useToggleConnectWalletModal,
  useToggleAccountDetailsModal,
} from "../../state/application/hooks";

import "./index.scss";

function HomePage() {
  const { account, error } = useWeb3React();

  const toggleErrorModal = useToggleErrorModal();
  const toggleAccountDetailsModal = useToggleAccountDetailsModal();
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleOpenConnect = () => {
    if (error) {
      toggleErrorModal();
    } else if (account) {
      toggleAccountDetailsModal();
    } else {
      toggleConnectWalletModal();
    }
  };

  return (
    <div className="homePage">
      <div className="main">
        <Popups />
        <Header handleOpenConnect={handleOpenConnect} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/transfer" />} />
          <Route path="/transfer" element={<Transfer />}>
            <Route index element={<RegulatedTransfer />} />
            <Route path="/transfer/activities" element={<Activities />} />
          </Route>
          <Route path="/zk" element={<Zk />} />
          <Route path="/zkPASS" element={<Proof />} />
        </Routes>
      </div>
      <Modals />
    </div>
  );
}

export default React.memo(HomePage);
