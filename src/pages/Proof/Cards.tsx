/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-03 16:34:58
 * @LastEditTime: 2022-01-11 10:22:34
 */
import React, { useState, useMemo } from "react";
import classNames from "classnames";

import Empty from "../../components/Empty";

import bgImg from "../../images/card_1.png";
import bgImgBack from "../../images/card_1_2.png";
import dropdownImg from "../../images/icon_arrow_fill.svg";
import verifiedTrueImg from "../../images/icon_verified_true.svg";
import verifiedFalseImg from "../../images/icon_verified_false.svg";

import { ProofStatus } from "../../types/index";

import { shortenHash } from "../../utils";

import "./Cards.scss";

interface ProofProps {
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
}
interface Props {
  data: ProofProps[];
  searchInput: string;
  searchType: string;
  jumpToIpfs: (id: string) => void;
}

interface CardProps {
  dataItem: ProofProps;
  jumpToIpfs: (id: string) => void;
}

const { STATUSTRUE, STATUSFALSE, STATUSING } = ProofStatus;

function Card({ dataItem, jumpToIpfs }: CardProps) {
  const [visible, toggleVisible] = useState(false);

  const handleClick = () => {
    toggleVisible(!visible);
  };

  return (
    <li
      style={{
        backgroundImage: visible ? `url(${bgImgBack})` : `url(${bgImg})`,
      }}
      className={classNames("card-item", {
        show: visible,
      })}
    >
      <div className="main-item">
        <div className="main-item-header">
          <div className="main-item-header-left">
            {dataItem.statusCode === STATUSTRUE && (
              <img src={verifiedTrueImg} alt="true" className="stamp-img" />
            )}
            {dataItem.statusCode === STATUSFALSE && (
              <img src={verifiedFalseImg} alt="false" className="stamp-img" />
            )}
            {dataItem.statusCode === STATUSING && "Verifing"}
          </div>

          <span className="main-item-alias">{dataItem.claimAlias}</span>
        </div>
        <div className="main-item-program-name">
          {dataItem.programDetails?.programHashName}
        </div>
        <div className="main-item-footer">
          <span
            className="main-item-proofCid"
            onClick={() => jumpToIpfs(dataItem.proofCid)}
          >
            {shortenHash(dataItem.proofCid)}
          </span>
          <span className="main-item-footer-right" onClick={handleClick}>
            <span className="main-item-program-field-name">
              {dataItem.fieldName}
            </span>
            <img src={dropdownImg} className="main-item-op-img" />
          </span>
        </div>
      </div>
      <div className="content-item">
        <label className="content-item-img-label" onClick={handleClick}>
          <img src={dropdownImg} className="content-item-op-img" />
        </label>
        <div>
          <span className="label">Program Name:</span>
          <span className="value">
            {dataItem.programDetails?.programHashName}
          </span>
        </div>
        <div>
          <span className="label">output:</span>
          <span className="value">{String(dataItem.expectResult)}</span>
        </div>
        <div>
          <span className="label">Ctype hash:</span>
          <span className="value">{shortenHash(dataItem.cTypeHash)}</span>
        </div>
        <div>
          <span className="label">program hash:</span>
          <span className="value">{shortenHash(dataItem.programHash)}</span>
        </div>
        <div>
          <span className="label">claimHash:</span>
          <span className="value">{shortenHash(dataItem.rootHash)}</span>
        </div>
        <div>
          <span className="label">Date???</span>
          <span className="value">{dataItem.time}</span>
        </div>
      </div>
    </li>
  );
}

export default function Cards({
  data,
  searchInput,
  searchType,
  jumpToIpfs,
}: Props): JSX.Element {
  const dataSelected = useMemo(() => {
    if (!searchType && !searchInput) return data;

    return data.filter(
      (it) =>
        (it.statusCode === searchType || !searchType) &&
        it.programDetails.programHashName.includes(searchInput)
    );
  }, [data, searchType, searchInput]);

  return (
    <div className="proof-cards">
      {dataSelected && dataSelected.length > 0 && (
        <ul className="cards-main">
          {dataSelected?.map((it, index) => (
            <Card key={index} dataItem={it} jumpToIpfs={jumpToIpfs} />
          ))}
        </ul>
      )}
      {dataSelected && dataSelected.length === 0 && (
        <Empty description="Your zkID will appear here." />
      )}
    </div>
  );
}
