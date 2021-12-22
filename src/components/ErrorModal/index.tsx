/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-20 14:49:32
 * @LastEditTime: 2021-12-21 19:39:01
 */
import React from "react";
import Modal from "../Modal";

import {
  useModalOpen,
  useToggleErrorModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";

export default function ErrorModal() {
  const toggleErrorModal = useToggleErrorModal();
  const errorModalOpen = useModalOpen(ApplicationModal.ERROR);

  return (
    <Modal
      visible={errorModalOpen}
      title="Wrong Network"
      onCancel={toggleErrorModal}
      wrapClassName="error-modal"
    >
      Please connect to Mooriver Network.
      <div>Switch to Moonriver Network</div>
    </Modal>
  );
}
