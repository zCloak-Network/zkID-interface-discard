/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-01 16:31:50
 * @LastEditTime: 2021-12-13 15:47:52
 */
import React, { useState, useEffect } from "react";

import Submit from "../Submit";
import { queryPrograms } from "../../services/api";

import "./index.scss";

export default function Zk() {
  const [allProgram, setAllProgram] = useState([]);
  const [visible, setVisible] = useState(false);

  const [info, setInfo] = useState({
    fieldName: "",
    proHash: "",
    proName: "",
    cTypeHash: "",
  });
  const handleClick = (data) => {
    setVisible(true);
    setInfo({
      cTypeHash: data.cTypeHash,
      fieldName: data.programFieldName,
      proHash: data.programHash,
      proName: data.programHashName,
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    queryPrograms().then((res) => {
      if (res.data.code === 200) {
        setAllProgram(res.data.data);
      }
    });
  }, []);

  return (
    <div className="zk">
      <div className="zk-main">
        <div className="zk-detail">ProgramsProgramsProgramsPrograms</div>
        <div className="zk-title">Programs</div>
        <ul className="zk-entities">
          {allProgram.map((it, index) => (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <span className="detail">{it.programHashName}</span>
              <span className="ctype">
                <span className="zk-row-title">Ctype</span>
                <br />
                {it.ctypeHash}
              </span>
              <span className="data">
                <span className="zk-row-title">Data</span>
                <br />
                {it.programFieldName}
              </span>
              <span className="btn" onClick={() => handleClick(it)}>
                Submit Your Proof
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Submit
        // TODO
        account=""
        programDetail=""
        visible={visible}
        cTypeHash={info.cTypeHash}
        fieldName={info.fieldName}
        proHash={info.proHash}
        proName={info.proName}
        handleCancel={handleCancel}
      />
    </div>
  );
}
