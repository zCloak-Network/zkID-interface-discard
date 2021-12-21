/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2021-12-20 14:48:33
 */
import React, { useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Modal } from "antd";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import closeImg from "../../images/close.png";

import "./index.scss";

interface Props {
  visible: boolean;
  handleCancel: () => void;
}

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
  LEGAL: "legal",
};

export default function Connect({ visible, handleCancel }: Props) {
  const { active, account, connector, activate, error } = useWeb3React();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >();
  const [pendingError, setPendingError] = useState<boolean>();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = "";
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    console.log(909090, connector, activate(connector, undefined, true));
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount();
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true);
          }
        });
  };

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
          {Object.keys(SUPPORTED_WALLETS).map((key) => {
            const option = SUPPORTED_WALLETS[key];
            return (
              <li
                key={key}
                onClick={() => {
                  option.connector === connector
                    ? setWalletView(WALLET_VIEWS.ACCOUNT)
                    : !option.href && tryActivation(option.connector);
                }}
              >
                <img src={option.iconURL} className="wallet-img" />
                <span className="wallet-name">{option.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
}
