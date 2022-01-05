/*
 * @Description:
 * @Author: lixin
 * @Date: 2021-08-27 11:52:05
 * @LastEditTime: 2022-01-05 17:41:33
 *
 */

export const NETWORKID = 1287;

// export const HOSTPREFIX = 'http://192.168.31.47:8080'
export const HOSTPREFIX = "https://api.app.zcloak.network";

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
