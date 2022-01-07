/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2022-01-07 14:53:55
 */
import React from "react";
import { useActiveWeb3React } from "../../hooks/web3";
import { useNavigate } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Image } from "@davatar/react";
import Menu from "../Menu";

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

  let inner;
  const { error, account } = useWeb3React();
  // const { error, account } = useActiveWeb3React();

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

  return (
    <div className="header-component">
      <img src={Logo} alt="logo" className="logo" onClick={handleGoHome} />
      <Menu />
      {inner}
    </div>
  );
}
