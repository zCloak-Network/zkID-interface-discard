/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-12 17:36:40
 */
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import "./index.scss";

const MENU = [
  {
    title: "Regulated Transfer",
    key: "transfer",
    url: "/transfer",
  },
  {
    title: "Activities",
    key: "activities",
    url: "/transfer/activities",
  },
];

export default function Transfer() {
  const navigate = useNavigate();
  const [module, setModule] = useState(MENU[0].key);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  return (
    <div className="transfer">
      <ul className="menu" onClick={handleClick}>
        {MENU.map((it) => (
          <li
            key={it.key}
            data-id={it.key}
            data-url={it.url}
            className={module === it.key ? "active" : ""}
          >
            {it.title}
          </li>
        ))}
      </ul>
      <div className="tx-main">
        <Outlet />
      </div>
    </div>
  );
}
