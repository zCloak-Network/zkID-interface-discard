/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 11:52:05
 * @LastEditTime: 2022-04-22 16:03:40
 *
 */

export const NETWORKID = 1287;

// export const HOSTPREFIX = 'http://192.168.31.47:8080'
// export const HOSTPREFIX = "https://api.app.zcloak.network";

export const HOSTPREFIX = "https://zkid-service.zcloak.network";
export const PROOFHOSTPREFIX = "https://credential-service.zcloak.network";

// export const HOSTPREFIX = "http://192.168.31.198:7002";
// export const PROOFHOSTPREFIX = "http://192.168.31.198:7001";
// export const PROOFHOSTPREFIX = "https://zkid-service.zcloak.network";

// 日期格式配置
export const timeFormat = {
  dateMinute: "YYYY-MM-DD HH:mm",
  dateTime: "YYYY-MM-DD HH:mm:ss",
  date: "YYYY-MM-DD",
  dateYear: "YYYY",
  dateMonth: "YYYY-MM",
  dateWeek: "dddd",
  time: "HH:mm:ss",
  dateTimeNoSeparator: "YYYYMMDDHHmmss",
  dateNoSeparator: "YYYYMMDD",
};

export const STATUS = [
  {
    title: "Verified True",
    color: "#51DC8E",
  },
  {
    title: "Verified False",
    color: "#FF3E6C",
  },
  {
    title: "Verifing",
    color: "#FF9E3E ",
  },
];

export const NetworkContextName = "NETWORK";

export const DEFAULT_TXN_DISMISS_MS = 25000;

export const IPFSURL = "https://ipfs.infura.io:5001/api/v0/cat?arg=";

export const MOONSCANTX = "https://moonbase.moonscan.io/tx/";
