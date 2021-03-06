/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-12-08 19:47:31
 * @LastEditTime: 2022-04-22 16:40:59
 */
import axios from "axios";
import { HOSTPREFIX } from "../constants";

/** 获取所有token */
export async function queryToken() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/tokens`,
  });
}

/** 根据token获取program等 */
export async function queryDetailByToken(
  params: {
    /** token地址 */
    tokenAddress: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/tokens/rules`,
    params: {
      ...params,
    },
  });
}

/** 根据addr获取所有的proof */
export async function queryProofsByAddr(
  data: {
    /** address */
    dataOwner: string;
    // TODO
    programHash?: any;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "post",
    url: `${HOSTPREFIX}/proofs`,
    data: {
      ...data,
    },
  });
}

/** 获取program  */
export async function queryPrograms() {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/programs`,
  });
}

/**  查询是否有资格转账对应的proof  */
export async function queryQualification(
  params: {
    /** address */
    dataOwner: string;
    // TODO
    programHash: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/proofs/one`,
    params: {
      ...params,
    },
  });
}

/** 获取Activities  */
export async function queryActivities(
  params: {
    /** address */
    dataOwner: string;
  },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/transfer/record`,
    params: {
      ...params,
    },
  });
}

export async function getPoapId(
  params: { who: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/mint-poap`,
    params: {
      ...params,
    },
  });
}

export async function getProofs(
  params: { dataOwner: string; programHash?: any },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/user/proof`,
    params: {
      ...params,
    },
  });
}

export async function getActivities(
  params: { dataOwner: string },
  options?: { [key: string]: any }
) {
  return axios({
    method: "get",
    url: `${HOSTPREFIX}/user/activies`,
    params: {
      ...params,
    },
  });
}
