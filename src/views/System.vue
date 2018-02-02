<template>
    <div>
        <header-bar/>
        <div class="main">
          <side-bar :menuList="systemMenu"/>
          <div class="flex-content">
            <router-view></router-view>
          </div>
        </div>
        <footer-bar/>
    </div>
</template>

<script>
import { systemMenu } from "@/utils/sidebar";
import HeaderBar from "@/components/common/HeaderBar";
import SideBar from "@/components/common/SideBar";
import FooterBar from "@/components/common/FooterBar";
export default {
  name: "system",
  components: {
    HeaderBar,
    SideBar,
    FooterBar
  },
  data() {
    return {
      systemMenu: [
        systemMenu.authenticate
      ]
    };
  }
};
</script>

<style scoped lang="scss">

</style>