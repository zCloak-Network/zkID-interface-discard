/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-31 18:10:33
 */
import React, { useEffect, useState, ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import dayjs from "dayjs";
import Search from "../../components/Search";

import { queryActivities } from "../../services/api";
import { shortenAddress } from "../../utils";

import arrowDownImg from "../../images/icon_arrow_down.svg";

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
      <ul className="activities">
        {activities.map((it, index) => (
          <li key={index}>
            <span className="from">{shortenAddress(it.from)}</span>
            <img src={arrowDownImg} alt="" className="arrow-icon" />
            <span className="to">{shortenAddress(it.to)}</span>
            <span className="program">{it.programDetails.programHashName}</span>
            <span>
              {/* TODO */}
              <span className="amount">
                -{it.amount / Math.pow(10, Number(18))}
                {it.tokenDetails.tokenName}
              </span>
              <br />
              <span className="time">
                {dayjs(it.transferTime).format(timeFormat.dateTime)}{" "}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
