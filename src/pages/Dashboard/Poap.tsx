/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:49:14
 * @LastEditTime: 2022-04-24 15:37:07
 */
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { getImg } from "../../utils/poap";
import { getPoapId } from "../../services/api";
import Empty from "../../components/Empty";
import { hexToNumber } from "@polkadot/util";
import { stripHexPrefix, numberToHex, padLeft } from "web3-utils";
import BN from "bn.js";

import "./Poap.scss";

const Poap: React.FC = () => {
  const [poapId, setPoapId] = useState(null);
  const [nftId, setNftId] = useState(null);
  const { account } = useWeb3React();

  const getPoapIdByAccount = async () => {
    if (account) {
      const res = await getPoapId({ who: account });

      if (res.data.code === 200) {
        if (res.data.data) {
          const { poapId, nftId } = res.data.data;
          setPoapId(poapId);
          setNftId(nftId);
        } else {
          setPoapId(null);
          setNftId(null);
        }
      }
    }
  };

  const formatNum = (num) => {
    const numId = hexToNumber(
      stripHexPrefix(numberToHex(new BN(num))).slice(32)
    );

    return stripHexPrefix(padLeft(numId, 6, "0"));
  };

  useEffect(() => {
    getPoapIdByAccount();
  }, [account]);

  return (
    <div className="dashboard-poap">
      <a className="title" href="#poap" id="poap">
        POAP
      </a>
      <div className="content">
        {poapId ? (
          <div className="content-item">
            <img src={getImg(poapId)} alt="" className="poap-img" />
            <div className="poap-num">
              {nftId ? formatNum(String(nftId)) : "-"}
            </div>
          </div>
        ) : (
          <Empty description="Your POAP will appear here." />
        )}
      </div>
    </div>
  );
};
export default Poap;
