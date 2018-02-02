// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./assets/fonts/iconfont.css";
// http://element.eleme.io/2.0/#/zh-CN/component/quickstart
import {
  // Tabs,
  // TabPane,
  Pagination,
  // Dialog,
  // MessageBox,
  // Message,
  Table,
  TableColumn,
  Form,
  FormItem,
  Button,
  Input,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Upload,
  Transfer,
  // Loading,
  Radio
} from "element-ui";
import "@/styles/core/theme.scss";
// Vue.use(Tabs)
// Vue.use(TabPane)
Vue.use(Pagination);
// Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Transfer);
Vue.use(Radio);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
