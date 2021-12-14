/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 15:06:01
 * @LastEditTime: 2021-12-12 17:53:09
 */
import React, { useMemo } from "react";
import { Tooltip } from "antd";
import { isAddress, shortenAddress } from "../../utils";
import classnames from "classnames";

import "./InputAddress.scss";

interface Props {
  label: string;
  value?: string;
  rule?: string;
  balance?: number;
  symbol?: string;
  ellipsis?: boolean;
  showRule?: boolean;
  showError?: boolean;
  showBalance?: boolean;
  handleInputChange?: (e) => void;
}

export default function InputAddress({
  rule,
  value,
  label,
  symbol,
  balance,
  handleInputChange,
  ellipsis = false,
  showBalance = false,
  showRule = false,
  showError = false,
}: Props) {
  const getAddress = () => {
    if (value && isAddress(value) && ellipsis) {
      return shortenAddress(value);
    }

    if (value && !ellipsis) {
      return value;
    }

    return "";
  };

  return (
    <div
      className={classnames("input-address", {
        error: showError,
        "no-ellipsis": !ellipsis,
      })}
    >
      <div>
        <div className="input-label">{label}</div>
        <input
          onChange={(e) => handleInputChange(e)}
          className="input"
          type="text"
          value={getAddress()}
        />
      </div>
      <div>
        {showBalance && (
          <div className="balance">
            transferrable {balance} {symbol}
          </div>
        )}
        {showRule && (
          <Tooltip title={rule}>
            <div className="program-hash">{rule}</div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
