import request from "@request";
import api from "@api";

const state = {
  // 认证列表
  certList: [
    {
      ep_name: "王小虎",
      eid: "0",
      switch_number: [],
      cert_status: "1",
      cert_time: "2016/05/02 12:12"
    }
  ],
  // 总页数
  totalComp: 1,
  // 当前页
  currentPage: 1,
  // 当前TAB
  currentTab: 1,

  // loading 蒙版
  loadingState: false
};

const getters = {
  certList: state => state.certList,
  totalComp: state => state.totalComp,
  currentPage: state => state.currentPage,
  currentTab: state => state.currentTab,
  loadingState: state => state.loadingState
};

const mutations = {
  // 获取当前TAB
  getCurrentTab(state, payload) {
    state.currentTab = payload;
  },
  // 获取认证列表&总页数
  getCertList(state, payload) {
    state.certList = payload.res.content;
    state.totalComp = parseInt(payload.res.total);
  },
  // 获取当前页
  getCurrentPage(state, payload) {
    state.currentPage = payload;
  },
  // 获取当前蒙版状态
  getloadingState(state, payload) {
    state.loadingState = payload;
  }
};

const actions = {
  getCurrentTab({ commit }, payload) {
    commit("getCurrentTab", payload);
  },
  getCertList({ commit }, payload) {
    commit("getloadingState", true);
    request(api.getCertList, {
      cert_status: payload.status,
      keyword: payload.keyword,
      offset: payload.offset - 1,
      limit: payload.limit
    }).then(res => {
      commit({
        type: "getCertList",
        res: res.data
      });
      commit("getloadingState", false);
    });
  },
  getCurrentPage({ commit }, payload) {
    commit("getCurrentPage", payload);
  },
  getloadingState({ commit }, payload) {
    commit("getloadingState", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
