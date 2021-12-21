/*
 * @Description: 
 * @Author: lixin
 * @Date: 2021-08-27 11:52:05
 * @LastEditTime: 2021-12-16 19:22:16
 * 
 */
import iconCorrect from '../images/icon_correct.png'
import iconError from '../images/icon_error.png'
import iconwait from '../images/icon_wait.png'


export const  NETWORKID = 1287

// export const HOSTPREFIX = 'http://192.168.31.47:8080'
export const HOSTPREFIX = 'https://api.app.zcloak.network'

export const STATUSTRUE = 'Verified True'
export const STATUSFALSE = 'Verified False'
export const STATUSING = 'Verifing'

// 日期格式配置
export const timeFormat = {
    dateMinute: 'YYYY-MM-DD HH:mm',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD',
    dateYear: 'YYYY',
    dateMonth: 'YYYY-MM',
    dateWeek: 'dddd',
    time: 'HH:mm:ss',
    dateTimeNoSeparator: 'YYYYMMDDHHmmss',
    dateNoSeparator: 'YYYYMMDD'
}

export const STATUS = [
    {
        title: 'Verified True',
        img: iconCorrect,
        color: '#51DC8E'
    },
    {
        title: 'Verified False',
        img: iconError,
        color: '#FF3E6C'
    },
    {
        title: 'Verifing',
        img: iconwait,
        color: '#FF9E3E '
    }

]
export const IS_IN_IFRAME = window.parent !== window

export const NetworkContextName = 'NETWORK'
