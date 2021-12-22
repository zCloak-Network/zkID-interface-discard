/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-22 16:46:55
 */
import React, { useEffect, useState, ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import Search from "../../components/Search";

import { queryActivities } from "../../services/api";
import { shortenAddress } from "../../utils";

import noExistImg from "../../images/icon_not_exist.png";

import { timeFormat } from "../../constants";

import "./index.scss";

export default function Activities(): ReactElement {
  const [activities, setActivities] = useState([]);

  const { account } = useWeb3React();

  useEffect(() => {
    queryActivities({ dataOwner: account }).then((res) => {
      if (res.data.code === 200) {
        setActivities(res.data.data);
      }
    });
  }, [account]);

  return (
    <div>
      <Search />
      <ul className="activities">
        {activities.map((it, index) => (
          <li key={index}>
            <span className="token">
              <img
                src={
                  it.tokenDetails.tokenImageUrl
                    ? it.tokenDetails.tokenImageUrl
                    : noExistImg
                }
                alt={it.tokenDetails.tokenName}
              />
              {it.tokenDetails.tokenName}
            </span>
            <span>
              <span className="label">Sender</span>
              <br />
              {shortenAddress(it.from)}
            </span>
            <span>
              <span className="label">Receivier</span>
              <br />
              {shortenAddress(it.to)}
            </span>
            <span>
              <span className="label">Amount</span>
              <br />
              {/* //TODO */}
              {it.amount / Math.pow(10, Number(18))}
            </span>
            <span className="program">
              <span className="label">Program</span>
              <br />
              {it.programDetails.programHashName}
            </span>
            <span>
              <span className="label">Time</span>
              <br />
              {dayjs(it.transferTime).format(timeFormat.dateTime)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
