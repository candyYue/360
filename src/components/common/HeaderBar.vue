<template>
    <header>
        <div class="header_content">
            <div class="title">
               <img src="static/images/logo.png">
               <h1>云总机管理后台</h1>
            </div>
            <div class="nav">
                <span class="download">下载</span>
                <span class="about">关于</span>
                <img src="src/assets/icons/user-default.png"><span class="spread">云总机<i class="el-icon-arrow-down"></i></span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: "header-bar",
  data() {
    return {
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/core";
header {
  @include text-vertical-center($header-height);
  background: $theme;
  color: #fff;
}
.header_content {
  @extend %clearfix;
  @extend %center-block;
  width: $main-width;
  .title {
    float: left;
    img {
      width: 44px;
      vertical-align: middle;
    }
    h1{
      font-size: 22px;
      padding-left: 10px;
      line-height: 72px;
      display: inline-block;
    }
  }
  .nav {
    float: right;
    img {
      margin-left: 36px;
      vertical-align: middle;
    }
    span {
      margin-left: 8px;
      cursor: pointer;
      &.download,&.about{
          &::before{
            content: '';
            display: inline-block;
            @include size(18px);
            margin-right: 8px;
          }
      }
      &.download::before{
          background: url(../../assets/icons/download.png) no-repeat center/cover;
          vertical-align: -3px;
      }
      &.about::before{
          background: url(../../assets/icons/about.png) no-repeat center/cover;
          vertical-align: -4px;
      }
    }
  }
}
</style>