<template>
    <footer>
       <h3><span>中国联合网络通信有限公司江苏省分公司</span>
        <span>版权所有</span>
        <span>苏ICP备08006818</span>
        <span>技术支持：</span>
        <span>南京易米云通网络科技有限公司</span>
       </h3> 
    </footer>
</template>

<script>
export default {
  name: "footer-bar"
};
</script>

<style scoped lang="scss">
@import "../../styles/core";
footer {
  height: 60px;
  h3 {
    width: $main-width;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    font-size: 12px;
    color: $colorPlaceholder;
    span {
      margin-left: 6px;
    }
  }
}
</style>