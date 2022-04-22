/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 14:56:01
 * @LastEditTime: 2022-04-19 18:20:23
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import transferImg from "../../images/transfer.png";
import transferActiveImg from "../../images/transfer_active.png";
import proofImg from "../../images/proof.png";
import proofActiveImg from "../../images/proof_active.png";
// import zkEntities from "../../images/zkEntities.png";
// import zkEntitiesActiveImg from "../../images/zkEntities_active.png";

import "./index.scss";

interface Props {
  className?: string;
}

const MODOLE = [
  {
    title: "Dashboard",
    key: "Dashboard",
    url: "/dashboard",
    img: transferImg,
    activeImg: transferActiveImg,
  },
  // {
  //   title: "Transfer",
  //   key: "transfer",
  //   url: "/transfer",
  //   img: transferImg,
  //   activeImg: transferActiveImg,
  // },
  {
    title: "zkID",
    key: "zkID",
    id: "zkID",
    url: "/#zkID",
    img: proofImg,
    activeImg: proofActiveImg,
  },
  {
    title: "POAP",
    key: "poap",
    id: "poap",
    url: "/#poap",
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

export default function Menu({ className }: Props): JSX.Element {
  const navigate = useNavigate();
  const [module, setModule] = useState(MODOLE[0].key);

  const classes = classNames("menu-components", className);

  const handleClick = (e) => {
    setModule(e.target?.dataset.id);
    // navigate(e.target?.dataset.url);
    // window.location.hash = e.target?.dataset.url;
    document.getElementById(e.target?.dataset.id).scrollIntoView();
  };

  useEffect(() => {
    if (location.hash) {
      const module = MODOLE.find((it) => location.hash.includes(it.url))?.key;
      if (module) setModule(module);
    }
  }, []);

  return (
    <ul className={classes} onClick={handleClick}>
      {MODOLE.map((it) => (
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
  );
}
