/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-14 01:36:06
 */
import React, { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { useInterval } from "ahooks";

import Cards from "./Cards";
import Lists from "./Lists";
import Search from "../../components/Search";

import btnList from "../../images/btn_list.png";
import btnListActive from "../../images/btn_list_active.png";
import btnCard from "../../images/btn_card.png";
import btnCardActive from "../../images/btn_card_active.png";

import { timeFormat, STATUSING } from "../../constant";
import { queryProofsByAddr } from "../../services/api";
import { getStatus } from "../../utils";

import "./index.scss";

interface Props {
  account: string;
}

export default function Proof({ account }: Props) {
  const [allProofs, setAllProofs] = useState([]);
  const [verifingProof, setVerifingProof] = useState([]);
  const [showType, setShowType] = useState("card");
  const [interval, setInterval] = useState(12000);

  const handleShowType = (type) => {
    setShowType(type);
  };

  const formatData = (data) => {
    return data.map((it, index) => ({
      ...it,
      index: index + 1,
      time: dayjs(it.date).format(timeFormat.dateTime),
      statusCode: it.status,
      // statusCode: getStatus(it.status?.ifFinishVerify, it.status?.verifyResult),
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
          setAllProofs(data);
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
      <Search />
      <div className="proof-header">
        <span className="proof-header-title">My Passes</span>
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
      </div>
      <div className="proof-content">
        {isShowCard ? <Cards data={allProofs} /> : <Lists data={allProofs} />}
      </div>
    </div>
  );
}
