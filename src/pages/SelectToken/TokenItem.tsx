/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 16:42:39
 * @LastEditTime: 2021-12-14 02:23:06
 */
import React from "react";
import noExistImg from "../../images/icon_not_exist.png";

import "./TokenItem.scss";

interface Props {
  data: {
    tokenImageUrl?: string;
    tokenName: string;
    tokenAddress: string;
  };
  classNames?: string;
}

export default function TokenItem({ data, classNames }: Props) {
  return (
    <div className={`token-item ${classNames}`}>
      <img src={data.tokenImageUrl || noExistImg} alt={data.tokenName} />
      {data.tokenName}
    </div>
  );
}
