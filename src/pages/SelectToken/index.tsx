/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-01-05 10:53:33
 */
import React, { useState, useMemo } from "react";
import {
  useModalOpen,
  useToggleSelectTokenModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import Modal from "../../components/Modal";
import TokenItem from "./TokenItem";

import { TokenProps } from "../../types";

import "./index.scss";

interface Props {
  allTokens: TokenProps[];
  handleSelectToken: (token) => void;
}

export default function Submit({
  allTokens,
  handleSelectToken,
}: Props): JSX.Element {
  const [input, setInput] = useState("");
  const toggleSelectTokenModal = useToggleSelectTokenModal();
  const selectTokenModalOpen = useModalOpen(ApplicationModal.SELECT_TOKEN);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // useEffect(() => {
  //   if (account && !previousAccount && walletModalOpen) {
  //     toggleWalletModal();
  //   }
  // }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  const currData = useMemo(() => {
    const inputNew = input.toLocaleLowerCase();

    return allTokens.filter(
      (it) =>
        it.tokenName.toLocaleLowerCase().includes(inputNew) ||
        it.tokenAddress.toLocaleLowerCase().includes(inputNew)
    );
  }, [input, allTokens]);

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
        onChange={handleChange}
      />
      <div className="sub-title">Token Name</div>
      <ul className="token-list">
        {currData.map((it) => (
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
