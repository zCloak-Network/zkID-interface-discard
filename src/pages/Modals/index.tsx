/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-28 18:44:00
 * @LastEditTime: 2021-12-28 18:46:23
 */
import React from "react";
import Connect from "../Connect";
import ErrorModal from "../../components/ErrorModal";
import AccountDetails from "../../components/AccountDetails";

export default function Modals() {
  return (
    <>
      <Connect />
      <ErrorModal />
      <AccountDetails />
    </>
  );
}
