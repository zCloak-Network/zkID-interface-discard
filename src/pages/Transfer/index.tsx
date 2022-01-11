/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2022-01-10 18:32:38
 */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

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

export default function Transfer(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [module, setModule] = useState(MENU[0].key);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  useEffect(() => {
    if (location.pathname) {
      const module = MENU.find((it) => location.pathname === it.url)?.key;
      if (module) setModule(module);
    }
  }, [location]);

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
