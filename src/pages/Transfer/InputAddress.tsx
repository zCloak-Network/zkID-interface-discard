/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 15:06:01
 * @LastEditTime: 2021-12-31 15:43:52
 */
import React from "react";
import { Tooltip } from "antd";
import { isAddress, shortenAddress } from "../../utils";
import classnames from "classnames";

import "./InputAddress.scss";

interface Props {
  label: string;
  value?: string;
  rule?: string;
  ellipsis?: boolean;
  showRule?: boolean;
  showError?: boolean;
  handleInputChange?: (e) => void;
}

export default function InputAddress({
  rule,
  value,
  label,
  handleInputChange,
  ellipsis = false,
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
      <div className="wrapper">
        <div className="input-label">{label}</div>
        <input
          onChange={(e) => handleInputChange(e)}
          className="input"
          type="text"
          value={getAddress()}
        />
      </div>
      <div>
        {showRule &&
          (rule ? (
            <Tooltip title={rule}>
              <div className="program-hash">{rule}</div>
            </Tooltip>
          ) : (
            <span className="no-rule">Requirement</span>
          ))}
      </div>
    </div>
  );
}
