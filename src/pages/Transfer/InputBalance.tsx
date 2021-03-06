/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 15:06:01
 * @LastEditTime: 2022-01-10 18:26:56
 */
import React from "react";
import classNames from "classnames";
import TokenItem from "../SelectToken/TokenItem";

import arrowImg from "../../images/icon_arrow.svg";
import arrowDownInactiveImg from "../../images/icon_arrow_inactive.png";

import "./InputBalance.scss";

interface Props {
  token: {
    tokenName: string;
    tokenAddress: string;
  };
  error?: boolean;
  symbol?: string;
  balance?: number;
  value: string;
  canSelect?: boolean;
  handleChange: (e) => void;
  handleOpenToken: (e) => void;
}

interface SelectTokenProps {
  token: {
    tokenName: string;
    tokenAddress: string;
  };
  handleOpenToken: (e) => void;
}

function SelectToken({ token, handleOpenToken }: SelectTokenProps) {
  return (
    <div
      className={`select-btn ${token.tokenAddress ? "selected" : ""}`}
      onClick={handleOpenToken}
    >
      {token.tokenAddress ? (
        <>
          <TokenItem data={token} classNames="token-item-balance" />
          <img src={arrowDownInactiveImg} />
        </>
      ) : (
        <>
          Select a token
          <img src={arrowImg} />
        </>
      )}
    </div>
  );
}

export default function InputAddress({
  value,
  token,
  symbol,
  error = false,
  balance,
  handleChange,
  handleOpenToken,
}: Props): JSX.Element {
  const classes = classNames("input-balance", {
    selected: token.tokenAddress,
    error: error,
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    // TODO;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      handleChange(value);
    }
  };

  return (
    <div className={classes}>
      <div className="amount-wrapper">
        <input
          className="input"
          value={value}
          type="text"
          placeholder="0.0"
          onChange={handleInputChange}
        />
        <SelectToken handleOpenToken={handleOpenToken} token={token} />
      </div>
      <span className="balance">
        transferrable {balance} {symbol}
      </span>
    </div>
  );
}
