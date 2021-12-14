/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-10 13:51:08
 * @LastEditTime: 2021-12-10 15:41:40
 */
import React from "react";
import classnames from "classnames";

interface Props {
  token: string;
  account: string;
  amount: string;
  receivierAddr: string;
  disabled: boolean;
  isErrorNetwork: boolean;
  onClick: () => void;
}

export default function transferBtn({
  account,
  receivierAddr,
  amount,
  token,
  disabled,
  isErrorNetwork,
  onClick,
}: Props) {
  if (isErrorNetwork) {
    return <div className="btn">You are on the wrong network</div>;
  }
  if (!account) {
    return <div className="btn">Connect wallet</div>;
  }
  if (!token) {
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
