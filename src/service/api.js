/**
 * 简写描述
 * |cert   |   Certification  |
 */

// const pubUrl = "https://kfes.emic.com.cn/";

const api = {
  /**
   * @apiGroup 【企业认证】
   */
  /**
   * @api {POST/GET}  保存认证信息
   */
  saveCert: '/Talk/CertEp/saveCertification',
  /**
   * @api {GET} 获取认证信息
   */
  getCert: '/Talk/CertEp/getCertification',
  /**
   * @api {GET} 取消认证
   */
  cancelCert: '/Talk/CertEp/cancelCertification',
  /**
   * @api {GET} 获取所有直线号码&首次认证获取总机号(获取企业外线号码)
   */
  getAllNumber: '/Talk/CertEp/getPubAccount',
  /**
   * @api {GET} 获取企业所有信息
   */
  getInfo: 'Talk/ServerMgt/info',
  /**
   * @apiGroup 【系统认证】
   */
  /**
   * @api {POST/GET} 获取认证企业状态列表
   */
  getCertList: 'Talk/CertSys/getCertfications',
  /**
   * @api {POST/GET} 系统管理员 审核通过/不通过接口
   * @param {Number} type:[1]通过 [2]失败
   */
  sysCheckCert: 'Talk/CertSys/auditCert',
  /**
   * @api {POST/GET} 系统管理员 认证详情
   */
  sysGetCert: '/Talk/CertSys/getCertification',
  /**
   * @api {POST/GET} 系统管理员 取消认证
   */
  sysCancelCert: 'Talk/CertSys/cancelCert',
  /**
   * @api {POST/GET} 设置通知方式
   * @param {Array} key:[cert_notice_type](eg:emial,mobile)通知类型 [cret_notice_value]通知类型对应值
   */
  setNoticeWay: 'Talk/CertSys/setSysParam',
  /**
   * @api {GET} 获取通知方式
   */
  getNoticeWay: 'Talk/CertSys/getSysParam',
 /**
   * @api {GET} 获取认证详情图片信息
   */
  getCertImg: 'Talk/CertSys/file',
  /**
   * @apiGroup 【公共接口】
   */
  /**
   * @api {GET} 加载静态页面资质说明与协议
   * @param {String} title:[cert_protocol]协议 [other_qualification_explain]其他资质说明
   */
  getStaticPage: '/Talk/CertEp/getStaticPage',
  /**
   * @api {POST/GET} 字典表
   * @param {String} code:[cert_qualification]企业证件类型 [ep_leader]企业负责人类型 [credentials]负责人证件类型
   */
  getDictionary: '/Talk/CertEp/getDictionary',
  /**
   * @api {POST} 上传文件
   * @param {String} bizKey:[cert]认证
   */
  uploadFile: '/Talk/CertEp/uploadFile'

}

export default api;
