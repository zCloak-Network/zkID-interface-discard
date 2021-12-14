/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 11:07:37
 * @LastEditTime: 2021-12-10 15:50:50
 */
import React from "react";
import { Image } from "@davatar/react";

import { shortenAddress } from "../../utils";

import "./index.scss";

interface Props {
  account: string;
  isErrorNetwork: boolean;
  handleOpenConnect: () => void;
}

export default function Header({
  account,
  isErrorNetwork,
  handleOpenConnect,
}: Props) {
  let inner;

  if (isErrorNetwork) {
    inner = (
      <div className="btn error" onClick={handleOpenConnect}>
        You are on the wrong network
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
