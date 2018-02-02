<template>
    <div class="sidebar">
      <router-link v-for="item in menuList" :key="item.key"
        :to="item.route" :class="'menu-'+item.key" class="menu-item"
      >{{item.name}}</router-link>
    </div>
</template>

<script>
export default {
  name: "side-bar",
  props: {
    menuList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    // console.log(this.menuList);
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/core";
.sidebar {
  width: $sidebar-width;
  margin-right: 30px;
  border-right: 1px solid #d8dce5;
  padding-top: 8px;
}

.menu-item {
  display: block;
  @include text-vertical-center($sidebar-height);
  padding-left: 21px;
  border-left: 3px solid #fff;
  color: $sidebar-color;
  &.active {
    border: {
      left: 3px solid $theme;
      top: $sidebar-border;
      bottom: $sidebar-border;
    }
    color: $theme;
    margin-right: -1px;
    background: #fff;
  }

  &::before {
    content: "";
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
    @include size(20px);
    background: {
      size: contain;
      repeat: no-repeat;
      position: center;
    }
    
  }

  $icons: home, call, client, server, sign, notice, setting,
          log,equipment,feedback,update,servers,authenticate;
  @each $icon in $icons {
    &.menu-#{$icon}.active::before {
      background-image: url(../../assets/icons/#{$icon}-active.png);
    }
    &.menu-#{$icon}::before {
      background-image: url(../../assets/icons/#{$icon}.png);
    }
  }
}
</style>