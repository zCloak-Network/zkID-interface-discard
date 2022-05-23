/*
 * @Description:
 * @Author: lixin
 * @Date: 2022-04-19 17:49:14
 * @LastEditTime: 2022-05-20 18:04:43
 */
import React, { useMemo } from "react";
import { getImg } from "../../utils/poap";
import { hexToNumber } from "@polkadot/util";
import { stripHexPrefix, numberToHex } from "web3-utils";
import BN from "bn.js";
import Slider from "react-slick";
import classNames from "classnames";
import _ from "lodash";

import "./Poap.scss";

interface IProps {
  nftId: string;
  poapId: string;
}

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

const Poap: React.FC<IProps> = ({ poapId, nftId }) => {
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

    return _.padStart(String(numId), 6, "0");
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

  return (
    <div className="dashboard-poap">
      <a className="title" id="poap">
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
