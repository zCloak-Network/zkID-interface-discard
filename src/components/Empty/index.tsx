/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-01-07 10:15:41
 * @LastEditTime: 2022-01-07 14:42:13
 */
import React from "react";
import classNames from "classnames";
import NotFound from "../../images/not_found.png";

import "./index.scss";

interface Props {
  image?: string;
  description?: string;
  className?: string;
}

export default function Empty({
  image,
  description,
  className,
}: Props): JSX.Element {
  const classes = classNames("empty-components", className);

  return (
    <div className={classes}>
      <img src={image ?? NotFound} alt="empty" />
      <div>{description}</div>
    </div>
  );
}
