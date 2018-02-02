<template>
    <div>
        <header-bar/>
        <div class="main">
            <side-bar :menuList="companyMenu"/>
            <div class="flex-content">
                <router-view></router-view>
            </div>
        </div>
        <footer-bar/>
    </div>
</template>

<script>
import { companyMenu } from "@/utils/sidebar";
import HeaderBar from "@/components/common/HeaderBar";
import SideBar from "@/components/common/SideBar";
import FooterBar from "@/components/common/FooterBar";

export default {
  name: "company",
  components: {
    HeaderBar,
    SideBar,
    FooterBar
  },
  data() {
    return {
      companyMenu: [
        companyMenu.setting
      ]
    };
  }
};
</script>

<style scoped lang="scss">
</style>