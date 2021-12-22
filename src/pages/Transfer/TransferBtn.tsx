/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 13:51:08
 * @LastEditTime: 2021-12-22 16:15:58
 */
import React, { ReactElement } from "react";
import { UnsupportedChainIdError } from "@web3-react/core";
import classnames from "classnames";

import {
  useToggleErrorModal,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";

import { STATUSFALSE, STATUSING } from "../../constants";
interface Props {
  token: {
    tokenName: string;
    tokenAddress: string;
  };
  approveStatus: boolean;
  ruleStatus: string;
  account: string;
  amount: string;
  receivierAddr: string;
  disabled: boolean;
  error: Error;
  onClick: () => void;
  handleApprove: () => void;
  handleSubmitProof: () => void;
}

export default function transferBtn({
  ruleStatus,
  approveStatus,
  account,
  receivierAddr,
  amount,
  token,
  disabled,
  error,
  onClick,
  handleApprove,
  handleSubmitProof,
}: Props): ReactElement {
  const toggleErrorModal = useToggleErrorModal();
  const toggleConnectWalletModal = useToggleConnectWalletModal();

  const handleOpenConnect = () => {
    if (error) {
      toggleErrorModal();
    } else {
      toggleConnectWalletModal();
    }
  };

  if (error) {
    return (
      <div className="btn">
        {error instanceof UnsupportedChainIdError ? (
          <span onClick={toggleErrorModal}>You are on the wrong network</span>
        ) : (
          "Error"
        )}
      </div>
    );
  }
  if (!account) {
    return (
      <div className="btn" onClick={handleOpenConnect}>
        Connect wallet
      </div>
    );
  }
  if (account && approveStatus && ruleStatus === STATUSFALSE) {
    return (
      <div className="btn no-proof-btn" onClick={handleSubmitProof}>
        Sorry, found no proof. Submit your proof.
      </div>
    );
  }
  if (account && approveStatus && ruleStatus === STATUSING) {
    return (
      <div className="btn">
        Sorry, your proof is being verified, please wait.
      </div>
    );
  }
  if (account && !approveStatus && token.tokenAddress) {
    return (
      <div className="btn" onClick={handleApprove}>
        Allow zkPass to use your {token.tokenName}.
      </div>
    );
  }
  if (!token.tokenAddress) {
    return <div className="btn btn-transfer disabled">Select a token</div>;
  }

  if (Number(amount) === 0) {
    return <div className="btn btn-transfer disabled">Enter an amount</div>;
  }

  if (!receivierAddr) {
    return <div className="btn btn-transfer disabled">Enter a receivier</div>;
  }
  return (
    <div
      onClick={onClick}
      className={classnames("btn btn-transfer", {
        disabled: disabled,
      })}
    >
      Transfer
    </div>
  );
}
