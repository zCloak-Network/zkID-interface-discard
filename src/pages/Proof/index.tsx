/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2022-01-05 14:28:41
 */
import React, { useState, useMemo, useEffect, ReactElement } from "react";
import dayjs from "dayjs";
import { useWeb3React } from "@web3-react/core";
import { useInterval } from "ahooks";

import Cards from "./Cards";
import Lists from "./Lists";
import Search from "../../components/Search";

import btnList from "../../images/btn_list.png";
import btnListActive from "../../images/btn_list_active.svg";
import btnCard from "../../images/btn_card.png";
import btnCardActive from "../../images/btn_card_active.svg";

import { timeFormat, STATUSING } from "../../constants";
import { queryProofsByAddr } from "../../services/api";

import "./index.scss";

export default function Proof(): ReactElement {
  const [allProofs, setAllProofs] = useState([]);
  const [verifingProof, setVerifingProof] = useState([]);
  const [showType, setShowType] = useState("card");
  const [interval, setInterval] = useState(12000);

  const { account } = useWeb3React();

  const handleShowType = (type) => {
    setShowType(type);
  };

  const formatData = (data) => {
    return data.map((it, index) => ({
      ...it,
      index: index + 1,
      time: dayjs(it.date).format(timeFormat.dateTime),
      statusCode: it.status,
      //TODO
      claimAlias: "zCloak Primary Access",
    }));
  };

  const queryData = () => {
    if (!account) return;

    queryProofsByAddr({
      dataOwner: account,
      programHash: verifingProof.map((it) => it.programHash),
    }).then((res) => {
      if (res.data.code === 200) {
        const data = formatData(res.data.data);
        const verifingData = data.filter((it) => it.statusCode === STATUSING);

        if (allProofs.length === 0) {
          // 首次发送请求时，存下全部proofs
          setAllProofs([
            // TOOD
            ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
            // ...data,
          ]);
        } else {
          // 后续请求，更新verifing状态的数据
          const allUpdateId = data.map((it) => it.proofCid);
          const dataAll = allProofs.map((item) => {
            if (allUpdateId.includes(item.proofCid)) {
              return data?.find((it) => it.proofCid === item.proofCid);
            }

            return item;
          });
          setAllProofs(dataAll);
        }

        if (verifingData.length > 0) {
          setVerifingProof(verifingData);
        } else {
          setInterval(undefined);
        }
      }
    });
  };

  useInterval(() => {
    queryData();
  }, interval);

  useEffect(() => {
    queryData();
  }, [account]);

  const isShowCard = useMemo(() => showType === "card", [showType]);

  return (
    <div className="proof">
      <div className="proof-header">
        <span>
          <img
            src={isShowCard ? btnCardActive : btnCard}
            alt="card"
            className="proof-header-img"
            onClick={() => {
              handleShowType("card");
            }}
          />
          <img
            src={isShowCard ? btnList : btnListActive}
            alt="list"
            className="proof-header-img"
            onClick={() => {
              handleShowType("list");
            }}
          />
        </span>
        <Search />
      </div>
      <div className="proof-content">
        {isShowCard ? <Cards data={allProofs} /> : <Lists data={allProofs} />}
      </div>
    </div>
  );
}
