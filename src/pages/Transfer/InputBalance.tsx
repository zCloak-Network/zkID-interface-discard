/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-02 15:06:01
 * @LastEditTime: 2021-12-22 16:37:30
 */
import React, { ReactElement } from "react";

import "./InputBalance.scss";

interface Props {
  label: string;
  value: string;
  canSelect?: boolean;
  handleChange: (e) => void;
}

export default function InputAddress({
  value,
  label,
  handleChange,
}: Props): ReactElement {
  const handleInputChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      handleChange(value);
    }
  };
  return (
    <div className="input-balance">
      <div className="input-label">{label}</div>
      <input
        className="input"
        value={value}
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
}
