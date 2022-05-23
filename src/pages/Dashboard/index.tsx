/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 13:47:46
 * @LastEditTime: 2022-05-23 15:12:05
 */
import React, { useEffect, useState } from "react";
import Activities from "./Activities";
import Poap from "./Poap";
import ZkID from "./ZkID";
import Empty from "../../components/Empty";
import banner from "../../images/banner.webp";
import { useWeb3React } from "@web3-react/core";
import { getPoapId } from "../../services/api";
import Button from "../../components/Button";

import "./index.scss";

interface IProps {
  handleOpenConnect: () => void;
}

const Dashboard: React.FC<IProps> = ({ handleOpenConnect }) => {
  const { account } = useWeb3React();
  const [poapId, setPoapId] = useState("");
  const [nftId, setNftId] = useState("");

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

  const jumpTozkID = () => {
    window.open("https://zkid.app/#/");
  };

  useEffect(() => {
    getPoapIdByAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className="dashboard">
      <div className="banner">
        <div className="banner-desc">
          Wanna try the guide again ?
          {/* {poapId
            ? "Wanna try the guide again ?"
            : "Wanna try the guide again ?"} */}
        </div>
        <div className="banner-btn">
          {poapId ? (
            <Button onClick={jumpTozkID}>
              REPLAY <i className="iconfont shuaxin"></i>
            </Button>
          ) : (
            <Button onClick={jumpTozkID}>
              Get start<i className="iconfont icon_1 icon-right-arrow"></i>
            </Button>
          )}
        </div>
        <img src={banner} alt="" />
      </div>
      {account ? (
        <>
          <Poap nftId={nftId} poapId={poapId} />
          <ZkID />
          <Activities />
        </>
      ) : (
        <Empty
          type="notConnected"
          description="Your zkID will appear here."
          handleConnect={handleOpenConnect}
          className="not-connected"
        />
      )}
    </div>
  );
};
export default Dashboard;
