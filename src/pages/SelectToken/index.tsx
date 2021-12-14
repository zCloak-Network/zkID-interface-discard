/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2021-12-08 21:18:34
 */
import React from "react";
import { Modal } from "antd";
import TokenItem from "./TokenItem";

import closeImg from "../../images/close.png";

import "./index.scss";

interface Props {
  visible: boolean;
  // TODO
  allTokens: any;
  handleCancel: () => void;
  handleSelectToken: (token) => void;
}

export default function Submit({
  visible,
  allTokens,
  handleCancel,
  handleSelectToken,
}: Props) {
  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      wrapClassName="selectTokenModal"
      closeIcon={
        <span className="close-btn">
          <img src={closeImg} />
        </span>
      }
    >
      <div>
        <div className="title">Select a token</div>
        <input
          type="text"
          placeholder="Search name or paste address"
          className="search-input"
        />
        <div className="sub-title">Token Name</div>
        <ul className="token-list">
          {allTokens.map((it) => (
            <li
              key={it.tokenAddress}
              className="token-list-item"
              onClick={() => handleSelectToken(it)}
            >
              <TokenItem data={it} />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
