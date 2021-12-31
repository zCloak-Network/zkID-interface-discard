/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 14:56:01
 * @LastEditTime: 2021-12-31 15:36:57
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import transferImg from "../../images/transfer.png";
import transferActiveImg from "../../images/transfer_active.png";
import proofImg from "../../images/proof.png";
import proofActiveImg from "../../images/proof_active.png";
// import zkEntities from "../../images/zkEntities.png";
// import zkEntitiesActiveImg from "../../images/zkEntities_active.png";

import "./index.scss";

const MODOLE = [
  {
    title: "Transfer",
    key: "transfer",
    url: "/transfer",
    img: transferImg,
    activeImg: transferActiveImg,
  },
  {
    title: "zk PASS",
    key: "proof",
    url: "/zkPASS",
    img: proofImg,
    activeImg: proofActiveImg,
  },
  // {
  //   title: "zk Entities",
  //   key: "zk",
  //   url: "/zk",
  //   img: zkEntities,
  //   activeImg: zkEntitiesActiveImg,
  // },
];

export default function Menu() {
  const navigate = useNavigate();
  const [module, setModule] = useState(MODOLE[0].key);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    navigate(e.target?.dataset.url);
  };

  useEffect(() => {
    if (location.pathname) {
      const module = MODOLE.find((it) =>
        location.pathname.includes(it.url)
      )?.key;
      if (module) setModule(module);
    }
  }, [location]);

  return (
    <ul className="menu-components" onClick={handleClick}>
      {MODOLE.map((it) => (
        <li
          key={it.key}
          data-id={it.key}
          data-url={it.url}
          className={module === it.key ? "active" : ""}
        >
          {/* <img
            src={module === it.key ? it.activeImg : it.img}
            alt={it.title}
            className="menu-icon"
          /> */}
          {it.title}
        </li>
      ))}
    </ul>
  );
}
