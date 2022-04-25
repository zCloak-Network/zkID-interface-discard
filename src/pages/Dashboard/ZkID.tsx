/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:49:55
 * @LastEditTime: 2022-04-25 17:55:13
 */
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Lists from "./ZkIDLists";
import { useWeb3React } from "@web3-react/core";
import { IPFSURL } from "../../constants";
import Empty from "../../components/Empty";
import { getProofs } from "../../services/api";
import { useInterval } from "ahooks";
import { ProofStatus } from "../../types/index";

const { STATUSING } = ProofStatus;

import "./ZkID.scss";

const TIME = 12000;

const ZkID: React.FC = () => {
  const { account } = useWeb3React();
  const [allProofs, setAllProofs] = useState(null);
  const [interval, setInterval] = useState(TIME);
  const [loading, setLoading] = useState(false);
  const [verifingProof, setVerifingProof] = useState([]);

  const jumpToIpfs = (id) => {
    const url = `${IPFSURL}${id}`;
    window.open(url);
  };

  const queryData = (isFirst = false) => {
    if (!account) return;

    getProofs({
      dataOwner: account,
      programHash: verifingProof.map((it) => it.programHash),
    }).then((res) => {
      if (res.data.code === 200) {
        const data = res.data.data;
        const verifingData = data.filter((it) => it.statusCode === STATUSING);

        if (!allProofs || allProofs?.length === 0 || isFirst) {
          // 首次发送请求时，存下全部proofs

          setAllProofs([
            // TOOD
            ...data,
          ]);
        } else {
          // 后续请求，更新verifing状态的数据
          const allUpdateId = data.map((it) => it.proofCid);
          const dataAll = allProofs?.map((item) => {
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

        setLoading(false);
      }
    });
  };

  useInterval(() => {
    queryData();
  }, interval);

  const getFirstData = async () => {
    if (!account) return;
    await setLoading(true);
    await queryData(true);
  };

  useEffect(() => {
    getFirstData();
  }, [account]);

  return (
    <div className="dashboard-zkid">
      <a className="title" href="#zkID" id="zkID">
        Proof
      </a>

      {allProofs?.length === 0 ? (
        <Empty description="Your proof will appear here." />
      ) : (
        <div className="content">
          {allProofs && !loading && account && (
            <div className="proof-content">
              <Lists data={allProofs} jumpToIpfs={jumpToIpfs} />
            </div>
          )}
          {loading && <Loading className="zkid-loading" />}
        </div>
      )}
    </div>
  );
};
export default ZkID;
