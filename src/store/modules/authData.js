import api from "@api"
import request from "@request";
const authFormDefaults = {
  // 来电显示信息
  ep_short_name: "",
  switch_number: [],
  direct_number: [],
  icon: "",
  ep_slogan: "",
  // 资质信息
  ep_name: "",
  ep_card_type: "",
  ep_card_number: "",
  ep_card_pic: "",
  ep_leader_type: "",
  ep_leader_job_certi: "",
  ep_leader_number_type: "",
  ep_leader_passport: "",
  ep_leader_number: "",
  ep_leader_name: "",
  leader_idcard_fphoto: "",
  leader_idcard_bphoto: "",
  ep_leader_tel: "",
  other_qualification: ""
}
const state = {
  authForm: authFormDefaults,
  certStatus: -1,
  editState: false,
  certFailReason: true
};

const getters = {
  authForm: state => state.authForm,
  certStatus: state => state.certStatus,
  editState: state => state.editState,
  certFailReason: state => state.certFailReason
};

const mutations = {
  // 确定企业状态
  certStatus(state, payload) {
    state.certStatus = payload.certStatus
  },
  getData(state, payload) {
    state.authForm = payload.res
  },
  changeEdit(state, payload) {
    state.editState = payload.state
  },
  changeCertFailReason(state, payload) {
    state.certFailReason = payload.state
  }
};

const actions = {
  // 获取企业认证信息
  async getData({
    commit
  }) {
    request(api.getCert).then((res) => {
      if (res.data) {
        const {
          ep_short_name,
          switch_number,
          direct_number,
          icon,
          ep_slogan,
          ep_name,
          ep_card_type,
          ep_card_number,
          ep_card_pic,
          ep_leader_type,
          ep_leader_job_certi,
          ep_leader_number_type,
          ep_leader_passport,
          ep_leader_number,
          ep_leader_name,
          leader_idcard_fphoto,
          leader_idcard_bphoto,
          ep_leader_tel,
          other_qualification,
          reason
        } = res.data;

        const data = {
          ep_short_name,
          switch_number,
          direct_number,
          icon,
          ep_slogan,
          ep_name,
          ep_card_type,
          ep_card_number,
          ep_card_pic,
          ep_leader_type,
          ep_leader_job_certi,
          ep_leader_number_type,
          ep_leader_passport,
          ep_leader_number,
          ep_leader_name,
          leader_idcard_fphoto,
          leader_idcard_bphoto,
          ep_leader_tel,
          other_qualification,
          reason
        }
        commit({
          type: 'getData',
          res: data
        })
        commit({
          type: 'certStatus',
          certStatus: +res.data.cert_status
        })
        commit({
          type: 'changeEdit',
          state: false
        })
      } else {
        commit({
          type: 'certStatus',
          certStatus: 0
        })
        commit({
          type: 'getData',
          res: authFormDefaults
        })
      }
    })
  },
  // 改变编辑状态(跳转，离开编辑页面)
  changeEdit({
    commit
  }, payload) {
    commit({
      type: 'changeEdit',
      state: payload
    })
  },
  // 保存
  saveCert({
    commit
  }, payload) {
    return request(api.saveCert, payload, 'POST').then(res => res)
  },
  changeCertFailReason({
    commit
  }, payload) {
    commit({
      type: 'changeCertFailReason',
      state: payload
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
