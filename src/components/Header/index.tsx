/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2021-12-17 15:50:14
 */
import React from "react";
import { useActiveWeb3React } from "../../hooks/web3";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { Image } from "@davatar/react";

import { shortenAddress } from "../../utils";

import "./index.scss";

interface Props {
  handleOpenConnect: () => void;
}

export default function Header({
  handleOpenConnect,
}: Props): React.ReactElement {
  let inner;
  const { error, account } = useWeb3React();
  // const { error, account } = useActiveWeb3React();

  console.log(122288, error, account);
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
        <div className="acc-img">
          <Image address={account} size={30} />
        </div>
        {shortenAddress(account)}
      </div>
    );
  } else {
    inner = (
      <div className="btn" onClick={handleOpenConnect}>
        Connect wallet
      </div>
    );
  }

  return <div className="header">{inner}</div>;
}
