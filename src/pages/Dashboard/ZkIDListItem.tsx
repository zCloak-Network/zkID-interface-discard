/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-30 16:51:36
 * @LastEditTime: 2022-04-24 16:13:21
 */
import React, { useState } from "react";
import classNames from "classnames";
import { Tooltip } from "antd";
import { shortenHash } from "../../utils";
// import { toHex, hexToUtf8 } from "web3-utils";

import { ProofStatus } from "../../types/index";

import arrowImg from "../../images/icon_arrow_2.svg";

import "./ZkIDListItem.scss";

interface Props {
  index: number;
  data: {
    programDetails: {
      programHash: string;
      programName: string;
      programFieldName: string;
    };
    percent: string;
    status: string;
    claimAlias: string;
    proofCid: string;
    // fieldNames: string;
    time: string;
    expectResult: string;
    cTypeHash: string;
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

export default function ListItem({
  data,
  jumpToIpfs,
  index,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  const {
    time,
    percent,
    cTypeHash,
    rootHash,
    // fieldNames,
    proofCid,
    claimAlias,
    status,
    expectResult,
    programDetails: { programName, programHash, programFieldName },
  } = data;
  const handleToggle = () => {
    setOpen(!open);
  };

  // const formatFiled = (fileds) => {
  //   const filedsArr = fileds
  //     .split(",")
  //     .map((it) => hexToUtf8(toHex(String(it))));
  //   return filedsArr.join(",");
  // };

  // const fieldNameFormat = useMemo(() => formatFiled(fieldNames), [fieldNames]);

  return (
    <div
      className={classNames("zkId-list-item", {
        open: open,
      })}
    >
      <div className="zkId-list-main" onClick={handleToggle}>
        <div className="zkId-list-main-index">{index}</div>
        <div>
          <Tooltip placement="bottomLeft" title={programName}>
            {programName}
          </Tooltip>
        </div>
        <div className="zkId-list-main-item">
          <Tooltip placement="bottomLeft" title={claimAlias}>
            {claimAlias}
          </Tooltip>
        </div>
        <div>
          <Tooltip placement="bottomLeft" title={programFieldName}>
            {programFieldName}
          </Tooltip>
        </div>
        <div
          className="zkId-list-main-item"
          // onClick={() => jumpToIpfs(proofCid)}
        >
          <Tooltip placement="bottomLeft" title={proofCid}>
            {proofCid}
          </Tooltip>
        </div>
        <div className="zkId-list-main-progress">
          <Progress status={status} percent={Number(percent)} />
        </div>
        <div className="zkId-list-main-item  zkId-list-main-time ">
          {time || "-"}
        </div>
        <div>
          <img src={arrowImg} alt="down" className="btn" />
        </div>
      </div>
      <div className="zkId-list-detail">
        <div className="output">
          <span className="label">output:</span>
          <br />
          <span>{String(expectResult)}</span>
        </div>
        <div className="zkId-list-detail-item">
          <span className="label ">Claim alias:</span>
          <br />
          <span>{claimAlias}</span>
        </div>
        <div className="zkId-list-detail-item">
          <span className="label" onClick={() => jumpToIpfs(proofCid)}>
            Proof CID:
          </span>
          <br />
          <span>
            <Tooltip placement="bottomLeft" title={proofCid}>
              {shortenHash(proofCid)}
            </Tooltip>
          </span>
        </div>
        <div>
          <span className="label">Ctype hash:</span>
          <br />
          <span>
            <Tooltip placement="bottomLeft" title={cTypeHash}>
              {shortenHash(cTypeHash)}{" "}
            </Tooltip>
          </span>
        </div>
        <div>
          <span className="label">program hash:</span>
          <br />
          <span>
            <Tooltip placement="bottomLeft" title={programHash}>
              {shortenHash(programHash)}
            </Tooltip>
          </span>
        </div>
        <div>
          <span className="label">rootHash:</span>
          <br />
          <span>
            <Tooltip placement="bottomLeft" title={rootHash}>
              {shortenHash(rootHash)}
            </Tooltip>
          </span>
        </div>
        <div className="zkId-list-detail-item">
          <span className="label">time:</span>
          <br />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
