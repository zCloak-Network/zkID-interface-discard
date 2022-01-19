/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-01-18 16:38:52
 */
import React, { useState } from "react";
import classNames from "classnames";
import { shortenHash } from "../../utils";

import { ProofStatus } from "../../types/index";

import arrowImg from "../../images/icon_arrow_2.svg";

import "./ListItem.scss";

interface Props {
  data: {
    index: number;
    programDetails: {
      programHashName: string;
    };
    percent: string;
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
  jumpToIpfs: (id: string) => void;
}

interface ProgressProps {
  status: string;
  percent: number;
}

const { STATUSTRUE, STATUSFALSE, STATUSING } = ProofStatus;

function Progress({ status, percent = 0 }: ProgressProps): JSX.Element {
  const classes = classNames("progress-outer", {
    "progress-success": status === STATUSTRUE,
    "progress-fail": status === STATUSFALSE,
    "progress-ing": status === STATUSING,
  });

  let content;
  if (status === STATUSTRUE) {
    content = STATUSTRUE;
  }

  if (status === STATUSFALSE) {
    content = STATUSFALSE;
  }

  if (status === STATUSING) {
    content = <span>{STATUSING}</span>;
  }

  const innerStyle = {
    width: status === STATUSING ? `${percent * 100}%` : "100%",
  };

  return (
    <div className={classes}>
      <div className="progress-inner">
        <div className="progress-bg" style={innerStyle}></div>
        {content}
      </div>
    </div>
  );
}

export default function ListItem({ data, jumpToIpfs }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  const {
    time,
    index,
    percent,
    cTypeHash,
    rootHash,
    programHash,
    fieldName,
    proofCid,
    claimAlias,
    statusCode,
    expectResult,
    programDetails: { programHashName },
  } = data;

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      className={classNames("proof-list-item", {
        open: open,
      })}
    >
      <div className="proof-list-main" onClick={handleToggle}>
        <div>{index}</div>
        <div>{programHashName}</div>
        <div className="proof-list-main-item">{claimAlias}</div>
        <div>{fieldName}</div>
        <div
          className="proof-list-main-item"
          onClick={() => jumpToIpfs(proofCid)}
        >
          {shortenHash(proofCid)}
        </div>
        <div>
          <Progress status={statusCode} percent={Number(percent)} />
        </div>
        <div className="proof-list-main-item">{time}</div>
        <div>
          <img src={arrowImg} alt="down" className="btn" />
        </div>
      </div>
      <div className="proof-list-detail">
        <div className="output">
          <span className="label">output:</span>
          <br />
          <span>{String(expectResult)}</span>
        </div>
        <div className="proof-list-detail-item">
          <span className="label ">Claim alias:</span>
          <br />
          <span>{claimAlias}</span>
        </div>
        <div className="proof-list-detail-item">
          <span className="label" onClick={() => jumpToIpfs(proofCid)}>
            Proof CID:
          </span>
          <br />
          <span>{shortenHash(proofCid)}</span>
        </div>
        <div>
          <span className="label">Ctype hash:</span>
          <br />
          <span>{shortenHash(cTypeHash)}</span>
        </div>
        <div>
          <span className="label">program hash:</span>
          <br />
          <span>{shortenHash(programHash)}</span>
        </div>
        <div>
          <span className="label">rootHash:</span>
          <br />
          <span>{shortenHash(rootHash)}</span>
        </div>
        <div className="proof-list-detail-item">
          <span className="label">time:</span>
          <br />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
