/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:53:30
 * @LastEditTime: 2022-04-26 15:35:59
 */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useWeb3React } from "@web3-react/core";
import Empty from "../../components/Empty";
import { MOONSCANTX } from "../../constants/index";
import { getActivities } from "../../services/api";
import Loading from "../../components/Loading";

import "./Activities.scss";
type Activity = {
  operateType: string;
  transactionHash: string;
  time: string;
};

type ListItemProps = {
  index: number;
  data: Activity;
};

const OPERATETYPE = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Claim POAP",
    value: "Claim POAP",
  },
  {
    label: "Add proof",
    value: "Add proof",
  },
];

const ListItem: React.FC<ListItemProps> = ({ index, data }) => {
  return (
    <div className="activity-list">
      <span className="activity-list-index">{index}</span>
      <span>{data.operateType}</span>
      <span className="activity-list-details">
        <a
          target="_blank"
          className="activity-list-link"
          href={`${MOONSCANTX}${data.transactionHash}`}
          rel="noreferrer"
        >{`${MOONSCANTX}${data.transactionHash}`}</a>
      </span>
      <span className="activity-list-time">{data.time || "-"}</span>
    </div>
  );
};

const Activities: React.FC = () => {
  const { account } = useWeb3React();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [operateType, setOperateType] = useState("All");

  const getData = async () => {
    if (!account) return;
    const res = await getActivities({ dataOwner: account });

    if (res.data.code === 200) {
      setData(res.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [account]);

  const currData = data?.filter((it) => {
    if (operateType === "All") return true;
    return it.operateType === operateType;
  });

  return (
    <div className="dashboard-activities">
      <a className="title">Activities</a>

      {data && data?.length === 0 ? (
        <Empty description="Your activities will appear here." />
      ) : (
        <div className="content">
          {!loading && (
            <div className="activities-content">
              <div className="header">
                <span />
                <span className="header-item">
                  {OPERATETYPE.map((it) => (
                    <span
                      className={classNames("operate-type", {
                        "operate-type-active": it.value === operateType,
                      })}
                      key={it.label}
                      onClick={() => {
                        setOperateType(it.value);
                      }}
                    >
                      {it.label}
                    </span>
                  ))}
                </span>
                <span className="header-item">Details</span>
                <span className="header-item">Time</span>
                <span />
              </div>
              <div className="activity-content">
                {currData?.map((item, index) => (
                  <div key={item.transactionHash}>
                    <ListItem data={item} index={index + 1} />
                  </div>
                ))}
                {currData?.length == 0 && (
                  <Empty description="Your activities will appear here." />
                )}
              </div>
            </div>
          )}

          {loading && <Loading className="activities-loading" />}
        </div>
      )}
    </div>
  );
};
export default Activities;
