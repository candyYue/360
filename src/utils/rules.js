/**
 * 表单校验规则
 */
// ！！！required的校验统一放在数组第一个！！！
export const authRules = {
  ep_short_name: [{
    required: true,
    message: "请输入企业名称",
    trigger: "blur"
  }],
  ep_name: [{
    required: true,
    message: "请输入企业完整名称",
    trigger: "blur"
  }],
  ep_card_type: [{
    required: true
  }],
  ep_leader_type: [{
    required: true
  }],
  ep_leader_number_type: [{
    required: true
  }],
  ep_card_number: [{
    required: true,
    message: "请输入企业证件号码",
    trigger: "blur"
  }, {
    validator(rule, value, callback) {
      const $pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/;
      if ($pattern.test(value)) {
        callback();
      } else {
        callback(new Error('证件号码为6-30位数字与字母组合'));
      }
    },
    trigger: "blur"
  }],
  ep_card_pic: [{
    required: true
  }],
  ep_leader_number: [{
    required: true,
    message: "请输入负责人证件号码",
    trigger: "blur"
  }, {
    validator(rule, value, callback) {
      const $pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,30}$/;
      if ($pattern.test(value)) {
        callback();
      } else {
        callback(new Error('证件号码为2-30位数字与字母组合'));
      }
    },
    trigger: "blur"
  }],
  ep_leader_name: [{
    required: true,
    message: "请输入负责人姓名",
    trigger: "blur"
  }],
  ep_leader_tel: [{
    required: true,
    message: "请输入联系方式",
    trigger: "blur"
  }, {
    validator(rule, value, callback) {
      const $pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
      if ($pattern.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的联系方式'));
      }
    },
    trigger: "blur"
  }]
}
