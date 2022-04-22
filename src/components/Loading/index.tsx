/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-07 14:08:18
 * @LastEditTime: 2022-04-21 17:08:14
 */
import React from "react";
import classNames from "classnames";
import loading from "../../images/loading_1.gif";

import "./index.scss";

interface Props {
  className?: string;
}

export default function Loading({ className }: Props): JSX.Element {
  const classes = classNames("loading-components", className);

  return (
    <div className={classes}>
      <img src={loading} alt="loading" />
    </div>
  );
}
