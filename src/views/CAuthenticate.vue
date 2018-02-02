<template>
    <div>
        <div class="el-tabs-nav">
          <span class="el-tabs-item active">企业名片认证</span>      
        </div>
        <transition name="fade">
          <div v-if="certStatus===-1"></div>
          <auth-intro v-else-if="certStatus===0 && !editState"/>
          <auth-edit v-else-if="editState"/>
          <auth-result v-else/>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthIntro from "@/components/authenticate/AuthIntro";
import AuthEdit from "@/components/authenticate/AuthEdit";
import AuthResult from "@/components/authenticate/AuthResult";
import Modal from "@/components/common/Modal";
import { messageBox } from "@/components/common/Message";

export default {
  name: "company-authenticate",
  components: {
    AuthIntro,
    AuthEdit,
    AuthResult,
    Modal
  },
  computed: {
    ...mapGetters(["certStatus", "editState"])
  },
  beforeCreate() {
    this.$store.dispatch("getData");
  },
  beforeRouteLeave(to, from, next) {
    const self = this;
    if (this.editState) {
      messageBox.$warning({
        btnChange: true,
        title: "取消认证",
        content:
          "您的认证信息还没有完成，继续认证可以将您的企业信息呈现在被叫用户的手机上。避免被错误标记。",
        comfirmText: "取消认证",
        cancelText: "继续认证",
        cancelCallback: () => {
          self.$router.push({ name: "CAuthenticate" });
        },
        successCallback: () => {
          next(true);
        }
      });
    } else {
      next(true);
    }
  }
};
</script>