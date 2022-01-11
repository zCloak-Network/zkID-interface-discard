/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2022-01-11 15:08:55
 */
import React, { useContext, useState, useMemo } from "react";
import Modal from "../../components/Modal";
import MyContext from "../../components/Context";
import {
  useModalOpen,
  useToggleSubmitProofModal,
} from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/reducer";
import { useAddPopup } from "../../state/application/hooks";
import Button from "../../components/Button";

import abi from "../../constants/contract/contractAbi/KiltProofs";
import { shortenHash } from "../../utils";
import { KiltProofsAdddress as contractAddress } from "../../constants/contract/address";

import "./index.scss";

interface Props {
  account: string;
  proName: string;
  cTypeHash: string;
  proHash: string;
  fieldName: string;
  programDetail: string;
}

type contextProps = {
  web3: any;
};

export default function Submit({
  account,
  cTypeHash,
  fieldName,
  proHash,
  proName,
  programDetail,
}: Props): JSX.Element {
  const { web3 } = useContext(MyContext) as contextProps;
  const [loading, setLoading] = useState(false);
  const [generationInfo, setGenerationInfo] = useState({
    proofCid: "",
    rootHash: "",
    expectResult: "",
  });
  const addPopup = useAddPopup();
  const toggleSubmitProofModal = useToggleSubmitProofModal();
  const submitProofModalOpen = useModalOpen(ApplicationModal.SUBMIT_PROOF);

  const handleData = (event) => {
    if (event.data.type === "PROOF_DETAILS") {
      setGenerationInfo(event.data.data);
    }
  };

  window.addEventListener("message", handleData, true);

  const goToGenerate = () => {
    window.postMessage(
      {
        type: "OPEN_GENERATE",
        data: {
          cTypeHash: cTypeHash,
          programHashName: proName,
          programFieldName: fieldName,
          programHash: proHash,
          programDetail: programDetail,
          website: "",
        },
      },
      //TODO  改为apps网址
      "*"
    );
  };
  const handleSumbit = () => {
    setLoading(true);
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods
      .addProof(
        "0xf85edd58bd7de60dac41894c508a1522f86d4b1066e3a4cbea3ab0353e659d55",
        cTypeHash,
        fieldName,
        proHash,
        generationInfo.proofCid,
        generationInfo.rootHash,
        Boolean(Number(generationInfo.expectResult))
      )
      .send({
        from: account,
      })
      .then(function (receipt) {
        console.log("addProofReceipt", receipt);
        if (receipt) {
          setLoading(false);
          toggleSubmitProofModal();

          addPopup(
            {
              txn: {
                hash: receipt.transactionHash,
                success: true,
                title: "Submit Success",
                summary: "You have submitted successfully.",
              },
            },
            receipt.transactionHash
          );
        }
      });
  };

  const abled = useMemo(
    () => proName && proHash && fieldName && generationInfo.proofCid,
    [proName, proHash, fieldName, generationInfo.proofCid]
  );

  return (
    <Modal
      title="Submit Your Proof"
      visible={submitProofModalOpen}
      onCancel={toggleSubmitProofModal}
      wrapClassName="submitModal"
    >
      <div>
        <div className="item program">
          <div className="label">program name </div>
          <div className="value">
            <span>{proName}</span>
          </div>
        </div>
        <div className="item">
          <div className="label">program hash</div>
          <div className="value">
            <span>{shortenHash(proHash)}</span>
          </div>
        </div>
        <div className="item">
          <div className="label">filed name</div>
          <div className="value">
            <span>{fieldName}</span>
          </div>
        </div>
        <div className="item">
          <div className="label">outputs, rootHash and proof cid</div>
          <div className="value">
            {generationInfo.proofCid && (
              <span>
                {generationInfo.expectResult};
                {shortenHash(generationInfo.rootHash)};
                {shortenHash(generationInfo.proofCid)}
              </span>
            )}

            <Button className="generate-btn" onClick={goToGenerate}>
              Generate
            </Button>
          </div>
        </div>
        <Button
          disabled={!abled}
          className="submit-btn"
          type="primary"
          onClick={handleSumbit}
          loading={loading}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
}
