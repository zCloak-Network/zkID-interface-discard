/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-22 11:25:11
 */
import React, { useState, useEffect, useMemo, useContext } from "react";
import { notification } from "antd";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Submit from "../Submit";
import InputAddress from "./InputAddress";
import InputBalance from "./InputBalance";
import SelectToken from "../SelectToken";
import TransferBtn from "./transferBtn";
import TokenItem from "../SelectToken/TokenItem";

import {
  useModalOpen,
  useToggleErrorModal,
  useToggleSelectTokenModal,
  useToggleSubmitProofModal,
} from "../../state/application/hooks";

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
  // SampleTokenAdddress,
} from "../../constants/contract/address";

import {
  queryToken,
  queryDetailByToken,
  queryQualification,
} from "../../services/api";

import { shortenAddress } from "../../utils";
import { STATUSTRUE, STATUSFALSE } from "../../constants";

import iconCorrect from "../../images/icon_correct.png";
import arrowImg from "../../images/icon_arrow.png";
import arrowDownImg from "../../images/icon_arrow_down.png";
import arrowDownInactiveImg from "../../images/icon_arrow_inactive.png";

import "./RegulatedTransfer.scss";

type contextProps = {
  web3: any;
};

export default function RegulatedTransfer() {
  const { error, account } = useWeb3React();
  const [submitVisible, setSubmitVisible] = useState(false);
  const [amount, setAmount] = useState("0");
  const [allTokens, setAllTokens] = useState([]);
  // TODO 改成enum
  const [ruleStatus, setRuleStatus] = useState("");
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
  // const approveStatus = useApprove(account);
  const balance = useBalance(account, token.tokenAddress);
  const symbol = useSymbol(token.tokenAddress);
  const decimals = useDecimals(token.tokenAddress);

  const toggleErrorModal = useToggleErrorModal();
  const toggleSubmitProofModal = useToggleSubmitProofModal();
  const toggleSelectTokenModal = useToggleSelectTokenModal();

  const { web3 } = useContext(MyContext) as contextProps;

  const handleOpenToken = () => {
    if (error) {
      toggleErrorModal();
    } else {
      toggleSelectTokenModal();
    }
  };

  const handleSelectToken = (data) => {
    setToken(data);
    queryDetailByToken({ tokenAddress: data.tokenAddress }).then((res) => {
      if (res.data.code === 200 && res.data.data.programHash) {
        setCurrtRule(res.data.data);
        queryQualification({
          dataOwner: account,
          programHash: res.data.data.programHash,
        }).then((res2) => {
          const { data } = res2.data;
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

  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
    });
  };

  const handleTransfer = () => {
    if (isNotTrue) return;

    console.log(
      11222223344,
      account,
      KiltProofsAdddress,
      token.tokenAddress,
      receivierAddr,
      amount,
      decimals,
      String(Number(amount) * Math.pow(10, decimals)),
      currRule.cTypeHash,
      currRule.programHash
      // String(Number(amount) * Math.pow(10, decimals))
    );

    const myContract = new web3.eth.Contract(abi, RegulatedTransferAdddress, {
      from: account,
    });

    // const myContract = new web3.eth.Contract(
    //   sampleTokenAbi,
    //   SampleTokenAdddress,
    //   {
    //     from: "0x6f56C250992655f9ca83E3246dcBDC9555A6771F",
    //   }
    // );

    // console.log(111, myContract.methods);
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
        console.log("444444666Approve", receipt);
        openNotification(
          <span>
            <img src={iconCorrect} className="status-img" />
            Transfer Success
          </span>,
          `You have transferred ${Number(amount)} ${symbol} to ${shortenAddress(
            receivierAddr
          )} successfully.`
        );
      });
  };

  const handleApprove = () => {
    const contract = new web3.eth.Contract(sampleTokenAbi, token.tokenAddress, {
      from: account,
    });
    contract.methods
      .approve(RegulatedTransferAdddress, String(Math.pow(10, 20) - 1))
      .send({
        from: account,
      })
      .then(function (receipt) {
        openNotification(
          <span>
            <img src={iconCorrect} className="status-img" />
            Approve Success
          </span>,
          `Approve zkPass to use your ${token.tokenName} successfully.`
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

      setApproveStatus(Boolean(Number(statusData)));
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
      <div
        className={`select-btn ${token.tokenAddress ? "selected" : ""}`}
        onClick={handleOpenToken}
      >
        {token.tokenAddress ? (
          <>
            <TokenItem data={token} classNames="token-item" />
            <img src={arrowDownInactiveImg} />
          </>
        ) : (
          <>
            Select a token
            <img src={arrowImg} />
          </>
        )}
      </div>
      <div className="sender-input">
        <InputAddress
          showRule
          ellipsis
          symbol={symbol}
          balance={balance}
          showBalance={!!token.tokenAddress}
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
          label="Amount"
          value={amount}
          handleChange={handleAmountChange}
        />
      </div>
      <TransferBtn
        ruleStatus={ruleStatus}
        approveStatus={approveStatus}
        error={error}
        account={account}
        token={token}
        amount={amount}
        receivierAddr={receivierAddr}
        disabled={isNotTrue}
        onClick={handleTransfer}
        handleApprove={handleApprove}
        handleSubmitProof={toggleSubmitProofModal}
      />
      <SelectToken
        allTokens={allTokens}
        handleSelectToken={handleSelectToken}
      />
      <Submit
        account={account}
        cTypeHash={currRule.cTypeHash}
        fieldName={currRule.programDetails.programFieldName}
        proHash={currRule.programHash}
        programDetail={currRule.programDetails.programDetail}
        proName={currRule.programDetails.programHashName}
      />
    </div>
  );
}
