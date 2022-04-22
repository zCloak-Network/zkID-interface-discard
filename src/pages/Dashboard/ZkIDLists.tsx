/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-20 10:39:14
 * @LastEditTime: 2022-04-22 16:42:09
 */
import React from "react";
import ListItem from "./ZkIDListItem";
import Empty from "../../components/Empty";

import "./ZkIDLists.scss";

interface Props {
  data: any;
  jumpToIpfs: (id: string) => void;
}

export default function Lists({ data, jumpToIpfs }: Props): JSX.Element {
  return (
    <div className="zkId-lists">
      {data && data.length > 0 && (
        <>
          <div className="proof-lists-content-wrapper">
            <div className="zkId-lists-header">
              <span />
              <span>Program Name</span>
              <span className="proof-lists-header-item">Claim alias</span>
              <span>Data type</span>
              <span className="proof-lists-header-item">Proof CID</span>
              <span>Status</span>
              <span className="proof-lists-header-item">Time</span>
              <span />
            </div>
            <div className="zkId-lists-content">
              {data?.map((item, index) => (
                <div key={`${item.proofCid}-${index}`} className="proof-list">
                  <ListItem
                    data={item}
                    jumpToIpfs={jumpToIpfs}
                    index={index + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {data && data.length === 0 && (
        <Empty description="Your zkID will appear here." />
      )}
    </div>
  );
}
