/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 16:42:39
 * @LastEditTime: 2022-01-05 10:24:55
 */
import React from "react";
import { TokenProps } from "../../types";

import noExistImg from "../../images/icon_not_exist.png";

import "./TokenItem.scss";

interface Props {
  data: TokenProps;
  classNames?: string;
}

export default function TokenItem({ data, classNames }: Props): JSX.Element {
  return (
    <div className={`token-item ${classNames}`}>
      <img src={data.tokenImageUrl || noExistImg} alt={data.tokenName} />
      {data.tokenName}
    </div>
  );
}
