/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:49:14
 * @LastEditTime: 2022-04-22 16:23:12
 */
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { PROOFHOSTPREFIX } from "../../constants";
import { getPoapId } from "../../services/api";
import Empty from "../../components/Empty";

import "./Poap.scss";

const Poap: React.FC = () => {
  const [poapId, setPoapId] = useState(null);
  const { account } = useWeb3React();

  const getPoapIdByAccount = async () => {
    if (account) {
      const res = await getPoapId({ who: account });

      if (res.data.code === 200) {
        if (res.data.data) {
          const { poapId } = res.data.data;
          setPoapId(poapId);
        } else {
          setPoapId(null);
        }
      }
    }
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
            <img
              src={`${PROOFHOSTPREFIX}/public/${poapId}.png`}
              alt=""
              className="poap-img"
            />
          </div>
        ) : (
          <Empty description="Your POAP will appear here." />
        )}
      </div>
    </div>
  );
};
export default Poap;
