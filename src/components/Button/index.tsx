/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-29 16:15:23
 * @LastEditTime: 2022-01-11 11:24:23
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
  onClick?: () => void;
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

  const handleClick = () => {
    if (disabled) return;
    onClick();
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
