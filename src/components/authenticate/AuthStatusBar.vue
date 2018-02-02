<template>
    <div>
    <transition name="only-fade-up">
      <p v-if="status===3 && certFailReason" class="failure-cause"><span>失败原因：</span><span>{{authForm.reason}}</span>
        <i class="el-icon-close" @click="close"></i>
      </p>
    </transition>
    <transition name="fade-up">
      <p class="status">
          <!-- 0 未认证 / 1 认证中/ 2  已认证 / 3 认证失败 / 4 已删除-->
          360企业认证 <span>（企业认证的信息将在被叫用户的手机上展示）</span>
          <em v-if="status===0"  class="decertification">未认证</em>
          <em v-if="status===1"  class="certification">认证中</em>
          <em v-if="status===2"  class="success">已认证</em>
          <em v-if="status===3"  class="failure">认证失败</em>
      </p>
    </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "auth-status-bar",
  props: {
    status: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["authForm", "certFailReason"])
  },
  methods: {
    close() {
      this.$store.dispatch("changeCertFailReason", false);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/core.scss";
p {
  font-size: 14px;
  &.status {
    @include size(513px,46px);
    line-height: 46px;
    @include skin(#595d65,#edf2fd);
    margin: 40px 0;
    border-radius: 21px;
    text-align: center;
    span {
      color: #878d99;
    }
  }
  &.failure-cause {
    @include size(519px,38px);
    line-height: 38px;
    @include skin(#fa5555,#ffeeee);
    margin: 40px 0 0 0;
    border-radius: 19px;
    position: relative;
    .el-icon-close {
      @include center-translate(y);
      right: 18px;
      color: #b3bbcc;
      cursor: pointer;
    }
    span {
      margin-left: 24px;
    }
  }
  em {
    @include size(73px,24px);
    @include text-vertical-center(24px);
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    border-radius: 12px;
    font-style: normal;
    font-size: 12px;
    &.decertification {
      @include skin(#5a5e65,#dee4ed);
    }
    &.certification {
      @include skin(#ffffff,#00c0ff);
    }
    &.success {
      @include skin(#ffffff,#67c23a);
    }
    &.failure {
      @include skin(#ffffff,#fa5555);
    }
  }
}
</style>