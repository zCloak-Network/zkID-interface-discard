/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2021-12-06 15:34:53
 */
import React from "react";
import { Modal } from "antd";

import closeImg from "../../images/close.png";
import logoMetamask from "../../images/logo_metamask.png";

import "./index.scss";

interface Props {
  visible: boolean;
  handleCancel: () => void;
  handleConnect: () => void;
}

const WALLETS = [
  {
    name: "MetaMask",
    img: logoMetamask,
  },
];

export default function Connect({
  visible,
  handleCancel,
  handleConnect,
}: Props) {
  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      wrapClassName="walletModal"
      closeIcon={
        <span className="close-btn">
          <img src={closeImg} />
        </span>
      }
    >
      <div>
        <div className="title">Connect a wallet</div>
        <ul className="wallets">
          {WALLETS.map((it) => (
            <li key={it.name} onClick={handleConnect}>
              <img src={it.img} className="wallet-img" />
              <span className="wallet-name">{it.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
