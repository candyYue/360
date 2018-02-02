import moment from "moment";
/**
 * @description 对电话号码进行排序
 * @param {Array} arr
 */
export const sortNumberArr = arr => {
  return arr.sort((a, b) => {
    let flag = +a.replace("-", "") - +b.replace("-", "") >= 0 ? 1 : -1;
    return flag;
  });
};
/**
 * @description 获取认证图片预览URL
 * @param {String} filename
 * @param {Number} eid
 */
export const getCertImg = (filename, eid = "") => {
  return `Talk/CertSys/file?fn=${filename}&eid=${eid}`;
};
/**
 * @description 日期格式化
 * @param {Number} date
 */
export const formatDate = date => {
  if (date) {
    return moment(date).format("YYYY/MM/DD hh:mm");
  } else {
    return "未设置";
  }
};
