/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:13:47
 * @LastEditTime: 2022-01-05 16:00:16
 */
import React, { useMemo } from "react";
import { Modal } from "antd";
import classNames from "classnames";

import closeImg from "../../images/close.png";

import "./index.scss";

interface Props {
  visible: boolean;
  title: string;
  wrapClassName?: string;
  onCancel: () => void;
  children?: React.ReactNode;
}

export default function MyModal({
  title,
  visible,
  onCancel,
  children,
  wrapClassName,
  ...rest
}: Props): JSX.Element {
  const wrapClassNames = useMemo(
    () => classNames("my-modal-component", wrapClassName),
    [wrapClassName]
  );

  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      wrapClassName={wrapClassNames}
      closeIcon={
        <span className="close-btn">
          <img src={closeImg} />
        </span>
      }
      {...rest}
    >
      <div className="title">{title}</div>
      {children}
    </Modal>
  );
}
