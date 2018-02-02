<template>
    <div>
          <auth-status-bar :status="certStatus"/>
          <auth-detail :authForm="authForm"/>
          <el-button type="primary" @click="edit" class="certification-btn" v-if="certStatus===3">重新认证</el-button>
          <el-button type="primary" @click="edit" class="certification-btn" v-if="certStatus===2">编辑</el-button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthStatusBar from "@/components/authenticate/AuthStatusBar";
import AuthDetail from "@/components/authenticate/AuthDetail";

export default {
  name: "auth-result",
  components: {
    AuthStatusBar,
    AuthDetail
  },
  computed: {
    ...mapGetters(["certStatus", "authForm"])
  },
  methods: {
    edit() {
      this.$store.dispatch("changeEdit", true);
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.certification-btn {
  width: 90px;
  margin-left: 105px;
  padding: 12px 0;
}
</style>