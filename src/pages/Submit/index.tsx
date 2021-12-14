/*
 * @Description: submit modal
 * @Author: lixin
 * @Date: 2021-12-02 17:23:15
 * @LastEditTime: 2021-12-14 14:40:47
 */
import React, { useContext, useState } from "react";
import web3 from "web3";
import { notification } from "antd";
import { Modal } from "antd";
import MyContext from "../../components/Context";
import abi from "../../constants/contract/contractAbi/KiltProofs";
import { shortenHash } from "../../utils";
import { KiltProofsAdddress as contractAddress } from "../../constants/contract/address";

import closeImg from "../../images/close.png";
import iconCorrect from "../../images/icon_correct.png";

import "./index.scss";

interface Props {
  account: string;
  proName: string;
  cTypeHash: string;
  visible: boolean;
  proHash: string;
  fieldName: string;
  programDetail: string;
  handleCancel: () => void;
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
  visible,
  programDetail,
  handleCancel,
}: Props) {
  const { web3 } = useContext(MyContext) as contextProps;
  const [generationInfo, setGenerationInfo] = useState({
    proofCid: "",
    rootHash: "",
    expectResult: "",
  });

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
  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
    });
  };

  const handleSumbit = () => {
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
        console.log(444444666, receipt);
        handleCancel();
        openNotification(
          <span>
            <img src={iconCorrect} className="status-img" />
            Submit Success
          </span>,
          "You have submited successfully."
        );
      });

    // contract.methods
    //   .addProof(
    //     "0xf85edd58bd7de60dac41894c508a1522f86d4b1066e3a4cbea3ab0353e659d11",
    //     "0x5ff696698bdbb6415d30e328c2a030b3ddd0c1d2dee8c4d58da4d7ef5a34adc1",
    //     "age",
    //     "0xdb70dbc46d57bb7ecb3aa2ceb657592b2c1ab6b427fe1dcd7532d1dcacd24998",
    //     "QmNRe7jAHu2MXad4f6jDePPCRrpnaRSLGG2fEtHZUoekpD",
    //     "0xbdf1fd3c489dbf96aa6c7507d3a56957ea1cd5f0bddd1b0222e0a90032d7b0e1",
    //     true
    //   )
    //   .send({
    //     from: account,
    //   })
    //   .then(function (receipt) {
    //     console.log(444444666, receipt);
    //     handleCancel();
    //   });
  };

  return (
    <Modal
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      wrapClassName="submitModal"
      closeIcon={
        <span className="close-btn">
          <img src={closeImg} />
        </span>
      }
    >
      <div>
        <div className="title">Submit Your Proof</div>
        <div>
          <div className="label">program name </div>
          <div className="value">
            <span>{proName}</span>
          </div>
        </div>
        <div>
          <div className="label">program hash</div>
          <div className="value">
            <span>{shortenHash(proHash)}</span>
          </div>
        </div>
        <div>
          <div className="label">filed name</div>
          <div className="value">
            <span>{fieldName}</span>
          </div>
        </div>
        <div>
          <div className="label">outputs, rootHash and proof cid</div>
          <div className="value">
            {generationInfo.proofCid && (
              <span>
                {generationInfo.expectResult};
                {shortenHash(generationInfo.rootHash)};
                {shortenHash(generationInfo.proofCid)}
              </span>
            )}

            <span className="generate-btn" onClick={goToGenerate}>
              Generate
            </span>
          </div>
        </div>
        <div className="submit-btn" onClick={handleSumbit}>
          Submit
        </div>
      </div>
    </Modal>
  );
}
