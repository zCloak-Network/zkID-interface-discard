/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2021-12-21 19:24:19
 */
import React from "react";
import {
  useModalOpen,
  useToggleSelectTokenModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import Modal from "../../components/Modal";
import TokenItem from "./TokenItem";

import "./index.scss";

interface Props {
  visible: boolean;
  // TODO
  allTokens: any;
  handleCancel: () => void;
  handleSelectToken: (token) => void;
}

export default function Submit({ allTokens, handleSelectToken }: Props) {
  const toggleSelectTokenModal = useToggleSelectTokenModal();

  const selectTokenModalOpen = useModalOpen(ApplicationModal.SELECT_TOKEN);

  // useEffect(() => {
  //   if (account && !previousAccount && walletModalOpen) {
  //     toggleWalletModal();
  //   }
  // }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  return (
    <Modal
      title="Select a token"
      visible={selectTokenModalOpen}
      onCancel={toggleSelectTokenModal}
      wrapClassName="selectTokenModal"
    >
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
    </Modal>
  );
}
