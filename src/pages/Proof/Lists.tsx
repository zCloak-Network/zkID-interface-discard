/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-03 16:35:07
 * @LastEditTime: 2022-01-18 16:48:22
 */
import React, { useMemo, useState } from "react";
import { Pagination } from "antd";
import ListItem from "./ListItem";

import Empty from "../../components/Empty";

import "./Lists.scss";

const pageSize = 10;

interface Props {
  data: any;
  jumpToIpfs: (id: string) => void;
}

export default function Lists({ data, jumpToIpfs }: Props): JSX.Element {
  const [currentNum, setCurrentNum] = useState(1);

  const handelPagination = (page) => {
    setCurrentNum(page);
  };

  const currData = useMemo(() => {
    return data?.slice((currentNum - 1) * pageSize, currentNum * pageSize);
  }, [currentNum, pageSize]);

  return (
    <div className="proof-lists">
      {currData && currData.length > 0 && (
        <>
          <div className="proof-lists-content-wrapper">
            <div className="proof-lists-header">
              <span />
              <span>Program Name</span>
              <span className="proof-lists-header-item">Claim alias</span>
              <span>Data type</span>
              <span className="proof-lists-header-item">Proof CID</span>
              <span>Status</span>
              <span className="proof-lists-header-item">Time</span>
              <span />
            </div>
            {currData?.map((item, index) => (
              <div key={`${item.proofCid}-${index}`} className="proof-list">
                <ListItem data={item} jumpToIpfs={jumpToIpfs} />
              </div>
            ))}
          </div>
          <Pagination
            current={currentNum}
            pageSize={pageSize}
            total={data?.length}
            onChange={handelPagination}
          />
        </>
      )}

      {currData && currData.length === 0 && (
        <Empty description="Your zkID will appear here." />
      )}
    </div>
  );
}
