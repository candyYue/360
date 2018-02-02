import Vue from "vue";
import Router from "vue-router";

const Company = r => require.ensure([], () => r(require("@/views/Company")), "Company");
const CAuthenticate = r => require.ensure([], () => r(require("@/views/CAuthenticate")), "CAuthenticate");
const System = r => require.ensure([], () => r(require("@/views/System")), "System");
const SAuthenticate = r => require.ensure([], () => r(require("@/views/SAuthenticate")), "SAuthenticate");
const SAuthInfo = r => require.ensure([], () => r(require("@/views/SAuthInfo")), "SAuthInfo");

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "/company",
      component: Company,
      children: [{
        path: "cert",
        name: "CAuthenticate",
        component: CAuthenticate
      }],
      redirect: "/company/cert"
    },
    {
      path: "/system",
      component: System,
      children: [
        {
          path: "cert",
          name: "SAuthenticate",
          component: SAuthenticate
        },
        {
          path: "cert/authinfo/:userId",
          name: "SAuthInfo",
          component: SAuthInfo
        }
      ],
      redirect: "/system/cert"
    },
    {
      path: "*",
      redirect: "/company"
    }
  ]
});
