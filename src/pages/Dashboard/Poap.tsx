/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:49:14
 * @LastEditTime: 2022-04-25 17:37:09
 */
import React, { useState, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { getImg } from "../../utils/poap";
import { getPoapId } from "../../services/api";
import { hexToNumber } from "@polkadot/util";
import { stripHexPrefix, numberToHex, padLeft } from "web3-utils";
import BN from "bn.js";
import Slider from "react-slick";
import classNames from "classnames";

import "./Poap.scss";

function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="iconfont icon_right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="iconfont icon_left"></i>
    </div>
  );
}

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const formatNum = (num) => {
    const numId = hexToNumber(
      stripHexPrefix(numberToHex(new BN(num))).slice(32)
    );

    return stripHexPrefix(padLeft(numId, 6, "0"));
  };

  const formatePoaps = useMemo(() => {
    const allPoaps = Object.entries(getImg());

    const data = [];

    allPoaps.forEach((it) => {
      if (it[0] === poapId) {
        data.unshift(it);
      } else {
        data.push(it);
      }
    });

    return data;
  }, [poapId]);

  useEffect(() => {
    getPoapIdByAccount();
  }, [account]);

  return (
    <div className="dashboard-poap">
      <a className="title" href="#poap" id="poap">
        POAP
      </a>
      <div className="slick-carousel">
        <Slider {...settings}>
          {formatePoaps.map((it, index) => {
            const active = it[0] === poapId;

            return (
              <div className="content-item" key={index}>
                <div
                  className={classNames("content-item-img", {
                    "poap-lock": !active,
                  })}
                >
                  <img src={it[1]} alt="" className="poap-img" />
                  <div className="poap-num">
                    {nftId ? formatNum(String(nftId)) : "000123"}
                  </div>
                </div>
                {!active && <i className="iconfont suo"></i>}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
export default Poap;
