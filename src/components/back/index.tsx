/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 15:47:14
 * @LastEditTime: 2021-08-30 17:43:35
 */
import React from "react";
import classnames from "classnames";
import backImg from "../../images/back.svg";

import "./index.scss";

interface Props {
  className?: string;
}

function Back({ className = "" }: Props): React.ReactElement {
  const classes = classnames("back-components", className);
  return (
    <div className={classes}>
      <img src={backImg} alt="back" className="img" />
      <span>BACK</span>
    </div>
  );
}

export default Back;
