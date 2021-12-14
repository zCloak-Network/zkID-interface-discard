/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-30 16:38:02
 * @LastEditTime: 2021-12-14 14:07:08
 */
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import store from "store";
import Web3 from "web3";
import Header from "../../components/Header";
import Transfer from "../Transfer";
import Proof from "../Proof";
import Zk from "../Zk";
import Activities from "../Activities";
import RegulatedTransfer from "../Transfer/RegulatedTransfer";
import Connect from "../Connect";
import { NETWORKID } from "../../constant";
import logo from "../../images/logo.png";
import transferImg from "../../images/transfer.png";
import transferActiveImg from "../../images/transfer_active.png";
import proofImg from "../../images/proof.png";
import proofActiveImg from "../../images/proof_active.png";
// import zkEntities from "../../images/zkEntities.png";
// import zkEntitiesActiveImg from "../../images/zkEntities_active.png";

import "./index.scss";

const MODOLE = [
  {
    title: "Transfer",
    key: "transfer",
    url: "/transfer",
    img: transferImg,
    activeImg: transferActiveImg,
  },
  {
    title: "zk PASS",
    key: "proof",
    url: "/zkPASS",
    img: proofImg,
    activeImg: proofActiveImg,
  },
  // {
  //   title: "zk Entities",
  //   key: "zk",
  //   url: "/zk",
  //   img: zkEntities,
  //   activeImg: zkEntitiesActiveImg,
  // },
];

function HomePage() {
  const navigate = useNavigate();
  const [isErrorNetwork, setIsErrorNetwork] = useState(false);
  const [visible, setVisible] = useState(false);
  const [module, setModule] = useState(MODOLE[0].key);
  const [currentAccount, setCurrentAccount] = useState();

  const web3 = new Web3(Web3.givenProvider);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  const handleOpenConnect = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      setVisible(false);
      store.set("zCloak_active_account", accounts[0]);
    }
  };

  const handleConnect = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  };

  const getChainId = async () => {
    const id = await web3.eth.getChainId();
    if (NETWORKID !== id) {
      setIsErrorNetwork(true);
    }
  };

  useEffect(() => {
    getChainId();
  }, []);

  useEffect(() => {
    const activeAccount = store.get("zCloak_active_account");
    if (activeAccount) {
      setCurrentAccount(activeAccount);
    }
  }, []);

  return (
    <div className="homePage">
      <div className="sider">
        <img src={logo} alt="zcloak" className="logo" />
        <ul className="menu" onClick={handleClick}>
          {MODOLE.map((it) => (
            <li
              key={it.key}
              data-id={it.key}
              data-url={it.url}
              className={module === it.key ? "active" : ""}
            >
              <img
                src={module === it.key ? it.activeImg : it.img}
                alt={it.title}
                className="menu-icon"
              />
              {it.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <Header
          isErrorNetwork={isErrorNetwork}
          handleOpenConnect={handleOpenConnect}
          account={currentAccount}
        />
        <Routes>
          <Route path="/" element={<Navigate replace to="/transfer" />} />
          <Route path="/transfer" element={<Transfer />}>
            <Route
              index
              element={
                <RegulatedTransfer
                  account={currentAccount}
                  isErrorNetwork={isErrorNetwork}
                />
              }
            />
            <Route
              path="/transfer/activities"
              element={<Activities account={currentAccount} />}
            />
          </Route>
          <Route path="/zk" element={<Zk />} />
          <Route path="/zkPASS" element={<Proof account={currentAccount} />} />
        </Routes>
      </div>
      <Connect
        visible={visible}
        handleCancel={handleCancel}
        handleConnect={handleConnect}
      />
    </div>
  );
}

export default React.memo(HomePage);
