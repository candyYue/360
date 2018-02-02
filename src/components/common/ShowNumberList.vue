<template>
    <div class="numberlist-wrap">
      <div class="numberlist-box" :class="{'full-box': spreadType || !more}" :style="numberBoxStyle">
        <span v-for="(item,index) in numberList" :key="index">
          {{ item }}
        </span>
      </div>
      <span class="iconfont icon-spread spread" @click="spread" v-show="!spreadType" v-if="more"></span>
    </div>
</template>

<script>
export default {
  name: "show-numnber-list",
  props: {
    numberList: {
      // type: Array,
      // default: []
    },
    col: {
      type: Number,
      default: 3
    },
    row: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      spreadType: false
    };
  },
  computed: {
    numberBoxStyle() {
      return {
        width: this.col * 120 + "px",
        maxHeight: this.row * 25 + "px"
      };
    },
    more() {
      return this.numberList.length > this.col * this.row;
    }
  },
  methods: {
    spread() {
      this.spreadType = true;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/core";
.numberlist-wrap {
  position: relative;
  float: left;
  top: 8px;
  line-height: 22px;
}
.numberlist-box {
  overflow: hidden;
  &:after {
    content: "";
    @include size(100%,20px);
    display: block;
    position: absolute;
    bottom: 3px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))
  }
  span {
    display: inline-block;
    float: left;
    @include size(100px,25px);
    line-height: 25px;
    margin-right: 20px;
  }
}
.spread {
  position: absolute;
  @include center-translate(x);
  transform: translate3d(-50%, 0, 0) scale(1.3,0.9);
  bottom: -15px;
  margin-left: -14px;
  cursor: pointer;
  color: #999;
}
.full-box {
  max-height: 10000px !important;
  &:after {
    content: none;
  }
}
</style>