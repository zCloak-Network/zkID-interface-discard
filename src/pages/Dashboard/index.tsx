/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 13:47:46
 * @LastEditTime: 2022-04-28 14:18:50
 */
import React from "react";
import Activities from "./Activities";
import Poap from "./Poap";
import ZkID from "./ZkID";
import Empty from "../../components/Empty";
// import banner from "../../images/banner.svg";
import { useWeb3React } from "@web3-react/core";

import "./index.scss";

type Props = {
  handleOpenConnect: () => void;
};

const Dashboard: React.FC<Props> = ({ handleOpenConnect }) => {
  const { account } = useWeb3React();

  return (
    <div className="dashboard">
      {/* <div className="banner">
        <img src={banner} alt="" />
      </div> */}
      {account ? (
        <>
          <Poap />
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
