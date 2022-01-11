/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 13:51:08
 * @LastEditTime: 2022-01-11 10:22:11
 */
import React from "react";
import { UnsupportedChainIdError } from "@web3-react/core";
import Button from "../../components/Button";

import {
  useToggleErrorModal,
  useToggleConnectWalletModal,
} from "../../state/application/hooks";

import { ProofStatus } from "../../types/index";

interface Props {
  token: {
    tokenName: string;
    tokenAddress: string;
  };
  loading: boolean;
  approveStatus: boolean;
  ruleStatus: string;
  account: string;
  amount: string;
  symbol?: string;
  isInsufficient?: boolean;
  receivierAddr: string;
  error: Error;
  onClick: () => void;
  handleApprove: () => void;
  handleSubmitProof: () => void;
}

const { STATUSFALSE, STATUSING } = ProofStatus;

export default function TransferBtn({
  ruleStatus,
  approveStatus,
  account,
  receivierAddr,
  amount,
  token,
  error,
  symbol,
  isInsufficient = false,
  onClick,
  loading,
  handleApprove,
  handleSubmitProof,
}: Props): JSX.Element {
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
      <Button loading={loading} type="primary">
        {error instanceof UnsupportedChainIdError ? (
          <span onClick={toggleErrorModal}>You are on the wrong network</span>
        ) : (
          "Error"
        )}
      </Button>
    );
  }
  if (!account) {
    return (
      <Button loading={loading} type="primary" onClick={handleOpenConnect}>
        Connect wallet
      </Button>
    );
  }
  if (account && approveStatus && ruleStatus === STATUSFALSE) {
    return (
      <Button loading={loading} type="primary" onClick={handleSubmitProof}>
        Sorry, found no proof. Submit your proof.
      </Button>
    );
  }
  if (account && approveStatus && ruleStatus === STATUSING) {
    return (
      <Button loading={loading} type="primary">
        Sorry, your proof is being verified, please wait.
      </Button>
    );
  }
  if (account && !approveStatus && token.tokenAddress) {
    return (
      <Button loading={loading} type="primary" onClick={handleApprove}>
        Allow zkID to use your {token.tokenName}.
      </Button>
    );
  }

  if (isInsufficient) {
    return (
      <Button disabled={true} loading={loading} type="info">
        Insufficient {symbol} balance
      </Button>
    );
  }

  if (!token.tokenAddress) {
    return (
      <Button disabled={true} loading={loading} type="info">
        Select a token
      </Button>
    );
  }

  if (Number(amount) === 0) {
    return (
      <Button disabled={true} loading={loading} type="info">
        Enter an amount
      </Button>
    );
  }

  if (!receivierAddr) {
    return (
      <Button disabled={true} loading={loading} type="info">
        Enter a receivier
      </Button>
    );
  }

  return (
    <Button loading type="primary" onClick={onClick}>
      Transfer
    </Button>
  );
}
