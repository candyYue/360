/**
 * 侧边菜单栏目录
 */

const companyMenu = {
  home: {
    name: "用户管理",
    key: "home"
  },
  call: {
    name: "呼叫记录",
    key: "call"
  },
  client: {
    name: "客户管理",
    key: "client"
  },
  server: {
    name: "服务器管理",
    key: "server"
  },
  sign: {
    name: "签到管理",
    key: "sign"
  },
  notice: {
    name: "通知管理",
    key: "notice",
    route: {
      name: 'SAuthenticate'
    }
  },
  setting: {
    name: "设置",
    key: "setting",
    route: {
      name: 'CAuthenticate'
    }
  }
};

const systemMenu = {
  home: {
    name: "企业管理",
    key: "home"
  },
  log: {
    name: "系统日志",
    key: "log"
  },
  equipment: {
    name: "外线设备",
    key: "equipment"
  },
  feedback: {
    name: "反馈与通知",
    key: "feedback"
  },
  update: {
    name: "软件升级",
    key: "update"
  },
  servers: {
    name: "服务器管理",
    key: "servers"
  },
  authenticate: {
    name: "企业名片认证",
    key: "authenticate",
    route: {
      name: 'SAuthenticate'
    }
  }
}

export {
  companyMenu,
  systemMenu
};
