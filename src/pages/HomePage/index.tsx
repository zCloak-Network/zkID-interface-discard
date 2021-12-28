/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-30 16:38:02
 * @LastEditTime: 2021-12-24 18:01:15
 */
import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Popups from "../../components/Popups";
import ErrorModal from "../../components/ErrorModal";
import Header from "../../components/Header";
import Transfer from "../Transfer";
import Proof from "../Proof";
import Zk from "../Zk";
import Activities from "../Activities";
import RegulatedTransfer from "../Transfer/RegulatedTransfer";
import Connect from "../Connect";

import {
  useToggleErrorModal,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";

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
  const location = useLocation();
  const [module, setModule] = useState(MODOLE[0].key);
  const { error } = useWeb3React();

  const toggleErrorModal = useToggleErrorModal();
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleOpenConnect = () => {
    if (error) {
      toggleErrorModal();
    } else {
      toggleConnectWalletModal();
    }
  };

  useEffect(() => {
    if (location.pathname) {
      const module = MODOLE.find((it) =>
        location.pathname.includes(it.url)
      )?.key;
      if (module) setModule(module);
    }
  }, [location]);

  return (
    <div className="homePage">
      <div className="sider">
        <img src={logo} alt="zcloak" className="logo" onClick={handleGoHome} />
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
      <Connect />
      <ErrorModal />
    </div>
  );
}

export default React.memo(HomePage);
