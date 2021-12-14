/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-03 16:34:58
 * @LastEditTime: 2021-12-13 22:10:50
 */
import React, { useState, useMemo } from "react";
import { Image } from "@davatar/react";

import dropdownImg from "../../images/icon_dropdown.png";

import { STATUS } from "../../constant";
import { shortenHash } from "../../utils";

import "./Cards.scss";

interface Props {
  data: any;
}

interface CardProps {
  //TODO
  dataItem: {
    programDetails: {
      programHashName: string;
    };
    statusCode: string;
    claimAlias: string;
    proofCid: string;
    fieldName: string;
    time: string;
    expectResult: string;
    cTypeHash: string;
    programHash: string;
    rootHash: string;
  };
}

function Card({ dataItem }: CardProps) {
  const [visible, toggleVisible] = useState(false);

  const handleClick = () => {
    toggleVisible(!visible);
  };

  return (
    <li className="card-item">
      <div>
        <div className="card-header">
          <div className="card-img">
            <Image size={44} address={dataItem.rootHash} />
          </div>
          <div>
            <div className="card-header-label">Program Name</div>
            <div className="card-name">
              {dataItem.programDetails?.programHashName}
            </div>
          </div>
        </div>
        <div className="card-detail">
          <span className="card-label">Claim alias:</span>
          <span>{dataItem.claimAlias}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">Proof CID:</span>
          <span>{shortenHash(dataItem.proofCid)}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">Time:</span>
          <span>{dataItem.time}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">Data type:</span>
          <span>{dataItem.fieldName}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">Status: </span>
          <span
            style={{
              color: `${
                STATUS.find((it) => it.title === dataItem.statusCode)?.color
              }`,
            }}
          >
            {dataItem.statusCode}
          </span>
        </div>
      </div>
      <div onClick={handleClick} className="card-divider">
        {visible ? "Hide" : "Details"}
        <img
          className={`card-divider-img ${!visible ? "up" : "down"}`}
          src={dropdownImg}
          alt=""
        />
      </div>
      <div className={`bottom ${!visible ? "fold" : "unfold"}`}>
        <div className="card-detail">
          <span className="card-label">output:</span>
          <span>{String(dataItem.expectResult)}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">Ctype hash:</span>
          <span>{shortenHash(dataItem.cTypeHash)}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">program hash:</span>
          <span>{shortenHash(dataItem.programHash)}</span>
        </div>
        <div className="card-detail">
          <span className="card-label">rootHash:</span>
          <span>{shortenHash(dataItem.rootHash)}</span>
        </div>
      </div>
    </li>
  );
}

export default function Cards({ data }: Props) {
  const [type, setType] = useState(null);
  const handleClick = (e) => {
    setType(e.target?.dataset.type || null);
  };

  const dataSelected = useMemo(() => {
    if (!type) return data;
    return data.filter((it) => it.statusCode === type);
  }, [data, type]);

  return (
    <div className="proof-cards">
      <ul onClick={handleClick} className="cards-menu">
        <li className={type ? "" : "active"}>All</li>
        {STATUS.map((it) => (
          <li
            key={it.title}
            data-type={it.title}
            className={type === it.title ? "active" : ""}
          >
            {it.title}
          </li>
        ))}
      </ul>
      <ul className="cards-main">
        {dataSelected.map((it, index) => (
          <Card key={index} dataItem={it} />
        ))}
      </ul>
    </div>
  );
}
