/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2022-01-12 15:46:42
 */
import React, { useState, useEffect, useMemo, useContext } from "react";
import { message } from "antd";
import { useWeb3React } from "@web3-react/core";
import Submit from "../Submit";
import InputAddress from "./InputAddress";
import InputBalance from "./InputBalance";
import SelectToken from "../SelectToken";
import TransferBtn from "./transferBtn";

import {
  useModalOpen,
  useToggleErrorModal,
  useToggleSelectTokenModal,
  useToggleSubmitProofModal,
} from "../../state/application/hooks";
import { useAddPopup } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";

import useBalance from "../../hooks/useBalance";
// import useApprove from "../../hooks/useApprove";
import useSymbol from "../../hooks/useSymbol";
import useDecimals from "../../hooks/useDecimals";

import MyContext from "../../components/Context";

import abi from "../../constants/contract/contractAbi/RegulatedTransfer";
import sampleTokenAbi from "../../constants/contract/contractAbi/SampleToken";
import {
  KiltProofsAdddress,
  RegulatedTransferAdddress,
} from "../../constants/contract/address";

import {
  queryToken,
  queryDetailByToken,
  queryQualification,
} from "../../services/api";

import { shortenAddress } from "../../utils";
import { ProofStatus } from "../../types/index";

import arrowDownImg from "../../images/icon_arrow_down.svg";

import "./RegulatedTransfer.scss";

type contextProps = {
  web3: any;
};

const { STATUSTRUE, STATUSFALSE, STATUSNULL } = ProofStatus;

export default function RegulatedTransfer(): JSX.Element {
  const { error, account } = useWeb3React();
  const [amount, setAmount] = useState(undefined);
  const [allTokens, setAllTokens] = useState([]);
  const [ruleStatus, setRuleStatus] = useState<ProofStatus>(STATUSNULL);
  const [receivierAddr, setReceivierAddr] = useState("");
  const [currRule, setCurrtRule] = useState({
    programHash: "",
    cTypeHash: "",
    programDetails: {
      programDetail: "",
      programHashName: "",
      programFieldName: "",
    },
  });
  const [token, setToken] = useState({
    tokenName: "",
    tokenAddress: "",
  });
  const [approveStatus, setApproveStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const approveStatus = useApprove(account);
  const balance = useBalance(account, token.tokenAddress);
  const symbol = useSymbol(token.tokenAddress);
  const decimals = useDecimals(token.tokenAddress);

  const addPopup = useAddPopup();
  const toggleErrorModal = useToggleErrorModal();
  const toggleSubmitProofModal = useToggleSubmitProofModal();
  const toggleSelectTokenModal = useToggleSelectTokenModal();
  const selectTokenModalOpen = useModalOpen(ApplicationModal.SELECT_TOKEN);
  const submitProofModalOpen = useModalOpen(ApplicationModal.SUBMIT_PROOF);

  const { web3 } = useContext(MyContext) as contextProps;

  const handleOpenToken = () => {
    if (!account) {
      message.info("Please connect your wallet first.");
      return;
    }
    if (error) {
      toggleErrorModal();
    } else {
      toggleSelectTokenModal();
    }
  };

  const handleSelectToken = (data) => {
    setToken(data);
    setIsLoading(true);
    queryDetailByToken({ tokenAddress: data.tokenAddress }).then((res) => {
      if (res.data.code === 200 && res.data.data.programHash) {
        setCurrtRule(res.data.data);
        queryQualification({
          dataOwner: account,
          programHash: res.data.data.programHash,
        }).then((res2) => {
          const { data } = res2.data;
          setIsLoading(false);
          if (data.programHash > 0) {
            const { status } = data;

            setRuleStatus(status);
          } else {
            setRuleStatus(STATUSFALSE);
          }
        });
      }
    });
    toggleSelectTokenModal();
  };

  const handleReceivierAddr = (e) => {
    setReceivierAddr(e.target.value);
  };

  const isNotTrue = useMemo(
    () => ruleStatus && ruleStatus !== STATUSTRUE,
    [ruleStatus]
  );

  const isInsufficient = useMemo(
    () => balance && amount && balance < Number(amount),
    [balance, amount]
  );

  const handleTransfer = () => {
    if (isNotTrue) return;

    const myContract = new web3.eth.Contract(abi, RegulatedTransferAdddress, {
      from: account,
    });

    myContract.methods
      .rTransfer(
        KiltProofsAdddress,
        token.tokenAddress,
        receivierAddr,
        String(Number(amount) * Math.pow(10, decimals)),
        currRule.cTypeHash,
        currRule.programHash
      )
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log("Transfer", receipt);

        addPopup(
          {
            txn: {
              hash: receipt.transactionHash,
              success: true,
              title: "Transfer Success",
              summary: `You have transferred ${Number(
                amount
              )} ${symbol} to ${shortenAddress(receivierAddr)} successfully.`,
            },
          },
          receipt.transactionHash
        );
      });
  };

  const handleApprove = () => {
    setIsLoading(true);
    const contract = new web3.eth.Contract(sampleTokenAbi, token.tokenAddress, {
      from: account,
    });
    contract.methods
      .approve(RegulatedTransferAdddress, String(Math.pow(10, 20) - 1))
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log("Approvereceipt", receipt);
        setIsLoading(false);

        addPopup(
          {
            txn: {
              hash: receipt.transactionHash,
              success: true,
              title: "Approve Success",
              summary: `Approve zkID to use your ${token.tokenName} successfully.`,
            },
          },
          receipt.transactionHash
        );
        getApproveStatus();
      });
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const getApproveStatus = async () => {
    if (account) {
      const contract = new web3.eth.Contract(
        sampleTokenAbi,
        token.tokenAddress
      );
      const statusData = await contract.methods
        .allowance(account, RegulatedTransferAdddress)
        .call();

      await setApproveStatus(Boolean(Number(statusData)));
      await setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token.tokenAddress) return;
    getApproveStatus();
  }, [token, account]);

  useEffect(() => {
    queryToken().then((res) => {
      if (res.data.code === 200) {
        setAllTokens(res.data.data);
      }
    });
  }, []);

  return (
    <div className="regulatedTransfer">
      <div className="sender-input">
        <InputAddress
          showRule
          ellipsis
          showError={isNotTrue}
          value={account}
          label="From"
          rule={currRule.programDetails.programHashName}
        />
      </div>
      <div className="exchange-icon">
        <img src={arrowDownImg} alt="" />
      </div>
      <div className="receivier-input">
        <InputAddress
          value={receivierAddr}
          label="To"
          handleInputChange={handleReceivierAddr}
        />
      </div>
      <div className="amount-input">
        <InputBalance
          value={amount}
          token={token}
          symbol={symbol}
          balance={balance}
          error={isInsufficient}
          handleOpenToken={handleOpenToken}
          handleChange={handleAmountChange}
        />
      </div>
      <TransferBtn
        loading={isLoading}
        ruleStatus={ruleStatus}
        approveStatus={approveStatus}
        error={error}
        account={account}
        token={token}
        amount={amount}
        symbol={symbol}
        isInsufficient={isInsufficient}
        receivierAddr={receivierAddr}
        onClick={handleTransfer}
        handleApprove={handleApprove}
        handleSubmitProof={toggleSubmitProofModal}
      />
      {/*  Fix modal content not updating */}
      {selectTokenModalOpen && (
        <SelectToken
          allTokens={allTokens}
          handleSelectToken={handleSelectToken}
        />
      )}
      {/*  Fix Submit modal content not updating */}
      {submitProofModalOpen && (
        <Submit
          account={account}
          cTypeHash={currRule.cTypeHash}
          fieldName={currRule.programDetails.programFieldName}
          proHash={currRule.programHash}
          programDetail={currRule.programDetails.programDetail}
          proName={currRule.programDetails.programHashName}
        />
      )}
    </div>
  );
}
