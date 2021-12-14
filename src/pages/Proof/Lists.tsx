/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-03 16:35:07
 * @LastEditTime: 2021-12-13 22:07:28
 */
import React, { useState } from "react";
import { Table } from "antd";

import dropdownImg from "../../images/icon_dropdown.png";
import upImg from "../../images/icon_up.png";

import { STATUS } from "../../constant";
import { shortenHash } from "../../utils";
import { STATUSTRUE, STATUSFALSE, STATUSING } from "../../constant";

import "./Lists.scss";

const pageSize = 20;

interface Props {
  data: any;
}

export default function Lists({ data }: Props) {
  const [expandedRowkeys, setExpandedRowkeys] = useState([]);

  const handleExpand = (data) => {
    if (expandedRowkeys.includes(data.proofCid)) {
      const arr = [...expandedRowkeys];
      setExpandedRowkeys(arr.filter((it) => it !== data.proofCid));
    } else {
      setExpandedRowkeys([...expandedRowkeys, data.proofCid]);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      className: "index",
      width: 50,
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "programName",
      width: 150,
      ellipsis: true,
      render: (text, record) => record.programDetails.programHashName,
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      width: 100,
      filters: [
        { text: STATUSTRUE, value: STATUSTRUE },
        { text: STATUSFALSE, value: STATUSFALSE },
        { text: STATUSING, value: STATUSING },
      ],
      render: (text, record) => (
        <span>
          <img
            className="proof-status"
            src={STATUS.find((it) => it.title === record.statusCode).img}
            alt={record.statusCode}
          />
        </span>
      ),
    },
    {
      title: "Claim alias",
      dataIndex: "claimAlias",
      key: "claimAlias",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Data type",
      dataIndex: "dataType",
      key: "dataType",
      width: 100,
      ellipsis: true,
      render: (text, record) => record.programDetails.programFieldName,
    },
    {
      title: "Proof CID",
      dataIndex: "proofCid",
      key: "proofCid",
      width: 230,
      render: (text, record) => shortenHash(record.proofCid),
      className: "proofCid",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: 200,
      ellipsis: true,
      //   sortOrder: "descend",
      sorter: true,
    },
    {
      title: "",
      dataIndex: "operate",
      className: "operate",
      key: "operate",
      width: 120,
      render: (text, record) => (
        <span
          onClick={() => handleExpand(record)}
          className="expand-operate-btn"
        >
          {expandedRowkeys.includes(record.proofCid) ? (
            <div>
              hide
              <img src={upImg} className="expand-icon" />
            </div>
          ) : (
            <div>
              details
              <img src={dropdownImg} className="expand-icon" />
            </div>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="proof-lists">
      <Table
        columns={columns}
        rowKey="proofCid"
        pagination={{ simple: true, pageSize: pageSize }}
        rowClassName={(record, index) =>
          `proof-item ${
            expandedRowkeys.includes(record.proofCid) ? "expanded-row" : ""
          }`
        }
        dataSource={data}
        expandable={{
          expandedRowKeys: expandedRowkeys,
          expandIcon: null,
          expandIconColumnIndex: -1,
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }} className="expand">
              <p className="expand-item">
                <span className="expand-label">output:</span>
                <br />
                {String(record.expectResult)}
              </p>
              <p className="expand-item">
                <span className="expand-label">Ctype hash:</span>
                <br />
                {shortenHash(record.cTypeHash)}
              </p>
              <p className="expand-item">
                <span className="expand-label">program hash:</span>
                <br />
                {shortenHash(record.programHash)}
              </p>
              <p className="expand-item">
                <span className="expand-label">rootHash:</span>
                <br />
                {shortenHash(record.rootHash)}
              </p>
            </p>
          ),
        }}
      />
    </div>
  );
}
