<template>
    <div>
        <img src="../../../static/images/auto-intro.png">
        <el-button type="primary" @click="edit" round class="certification-btn">立即认证</el-button>
    </div>
</template>

<script>
export default {
  name: "company-auth-intro",
  methods: {
    edit() {
      this.$store.dispatch("changeEdit", true);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/core";
div {
  margin-right: 24px;
  margin-top: 24px;
  text-align: center;
  img {
    width: 100%;
  }
  .certification-btn {
    width: 120px;
    margin-top: 40px;
  }
}
</style>