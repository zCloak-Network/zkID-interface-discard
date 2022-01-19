/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-29 16:15:23
 * @LastEditTime: 2022-01-19 16:54:37
 */
import React from "react";
import classNames from "classnames";

import Loading from "../../images/loading.gif";

import "./index.scss";

interface Props {
  type?: any;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
}

// TODO
// const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');

export default function Button({
  type = "default",
  disabled = false,
  loading,
  onClick,
  className,
  children,
}: Props): JSX.Element {
  const classes = classNames(
    "button-components",
    {
      disabled: disabled,
      [`button-components-${type}`]: type,
    },
    className
  );

  const handleClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  if (loading) {
    return (
      <div className="button-components loading">
        Loading
        <img src={Loading} />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className={classes}>
      {children}
    </div>
  );
}
