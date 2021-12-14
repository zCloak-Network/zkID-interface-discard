/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-06 14:35:38
 * @LastEditTime: 2021-12-09 20:13:27
 */
import React from "react";
import { Input } from "antd";

import iconSearch from "../../images/icon_search.png";

import "./index.scss";

export default function index() {
  return (
    <div>
      <Input
        placeholder="Search"
        prefix={<img src={iconSearch} className="icon-search" />}
        className="header-search"
      />
    </div>
  );
}
