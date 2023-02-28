import RemoteData from "./RemoteData";

/**
 * 
 * @param {string} value 接口地址
 * @param {object} extractRule 数据提取规则
 * @returns 
 */
export default function (value, extractRule, body, method, itval) {
   return new RemoteData(value, extractRule, body, method, itval)
}