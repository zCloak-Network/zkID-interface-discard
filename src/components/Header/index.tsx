/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-01-19 16:54:54
 */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Image } from "@davatar/react";
import classNames from "classnames";
import { useClickAway } from "ahooks";
import Menu from "../Menu";
import Button from "../Button";

import Logo from "../../images/logo.svg";

import { shortenAddress } from "../../utils";

import "./index.scss";

interface Props {
  handleOpenConnect: () => void;
}

export default function Header({
  handleOpenConnect,
}: Props): React.ReactElement {
  const navigate = useNavigate();
  const ref = useRef();
  const [menuStatus, setMenuStatus] = useState(false);

  let inner;
  const { error, account } = useWeb3React();

  useClickAway(() => {
    setMenuStatus(false);
  }, ref);

  if (error) {
    inner = (
      <div className="btn error" onClick={handleOpenConnect}>
        {error instanceof UnsupportedChainIdError
          ? "You are on the wrong network"
          : "Error"}
      </div>
    );
  } else if (account) {
    inner = (
      <div className="btn connected" onClick={handleOpenConnect}>
        {shortenAddress(account)}
        <div className="acc-img">
          <Image address={account} size={16} />
        </div>
      </div>
    );
  } else {
    inner = (
      <div className="btn" onClick={handleOpenConnect}>
        Connect wallet
      </div>
    );
  }

  const handleGoHome = () => {
    navigate("/");
  };

  const openMenu = (e) => {
    e.stopPropagation();
    setMenuStatus(!menuStatus);
  };

  return (
    <div className="header-component">
      <img src={Logo} alt="logo" className="logo" onClick={handleGoHome} />
      <div
        className={classNames("header-menu-wrapper", {
          open: menuStatus,
        })}
        ref={ref}
      >
        <Menu className="header-menu" />
      </div>
      <div className="header-right">
        {inner}
        <Button className="menu-btn" onClick={openMenu}>
          Menu
        </Button>
      </div>
    </div>
  );
}
