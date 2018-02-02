<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import '@core'
export default {
  name: "app"
};
</script>

<style scope lang="scss">
@import "./styles/core/reset.scss";
@import "./styles/core";
@import "./styles/animation";
@import "./styles/common";
#app{
  min-width: 1200px;
}
a,
.link {
  color: $theme;
}

.main {
  position: relative;
  @extend %center-block;
  margin-top: 20px;
  width: $main-width;
  min-height: 600px;
  background: #fff;
  display: flex;

  min-height: calc(100vh - 72px - 60px - 20px);
}
.flex-content {
  flex: 1;
  padding: 20px 0;
}
</style>
