/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2021-12-20 14:58:01
 */
import React, { useState } from "react";
import Modal from "../Modal";

export default function index() {
  const [visible, setVisible] = useState(false);

  const handleCancle = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title="Wrong Network"
      onCancel={handleCancle}
      wrapClassName="error-modal"
    >
      Please connect to Mooriver Network.
      <div>Switch to Moonriver Network</div>
    </Modal>
  );
}
