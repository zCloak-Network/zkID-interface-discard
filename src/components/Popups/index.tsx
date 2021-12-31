/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-23 16:25:30
 * @LastEditTime: 2021-12-31 15:27:35
 */
import React, { FC } from "react";
import { useActivePopups } from "../../state/application/hooks";
import PopupItem from "./PopupItem";
import closeImg from "../../images/close.png";

import "./index.scss";

const Popups: FC = () => {
  const activePopups = useActivePopups();

  //   const activePopups = [
  //     {
  //       key: "11",
  //       content: {
  //         txn: {
  //           hash: "111",
  //           title: "title",
  //           success: true,
  //           summary: "summary",
  //         },
  //       },
  //       removeAfterMs: 50000,
  //     },
  //   ];

  if (activePopups.length === 0) return null;

  return (
    <div className="popups-component">
      <span className="close-btn">
        <img src={closeImg} />
      </span>
      {activePopups.map((item) => (
        <PopupItem
          key={item.key}
          content={item.content}
          popKey={item.key}
          removeAfterMs={item.removeAfterMs}
        />
      ))}
    </div>
  );
};

export default Popups;
