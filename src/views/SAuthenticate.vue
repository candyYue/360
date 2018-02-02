<template>
    <div class="SysCertList">

        <div class="authtab">
          
          <ul class="authStatus">
            <li 
            v-for="(item,index) in tabs" :key="item.key"
            :class="{active:item.key === currentTab}"
            @click="tab(index)">{{item.name}}</li>
            <li :class="{active:currentTab == 5}" @click="tab(4)">设置</li>
          </ul>

          <div class="search" v-show="currentTab!==5">
            <i class="el-icon-search" @click="getCertList"></i>
            <el-input v-model="keyword" @keyup.enter.native="getCertList" placeholder="请输入企业名称、总机号进行搜索"></el-input>
            <i class="el-icon-circle-close" v-if="clearinputicon" @click="clearinput"></i>
          </div>

        </div>

        <div class="certList">
            <auth-table :certList="certList" :keyword="keyword" :offset="offset" :limit="limit" v-show="currentTab!==5"></auth-table>
            <auth-setting v-show="currentTab===5"></auth-setting>  
        </div>

        <div class="loading-mask" v-show="loadingState">
          <Loading v-show="loadingState"/>
        </div>
        

    </div>
</template>

<script>
import AuthTable from "@/components/authenticate/AuthTable";
import AuthSetting from "@/components/authenticate/AuthSetting";
import Loading from "@/components/common/Loading";
import { mapGetters } from "vuex";

export default {
  name: "system-authenticate",
  components: {
    AuthTable,
    AuthSetting,
    Loading
  },
  data() {
    return {
      keyword: "",
      offset: 1,
      limit: 10,
      tabs: [
        { name: "待审核", key: 1 },
        { name: "已认证", key: 2 },
        { name: "不合格", key: 3 }
      ],
      // num: 0,
      // wait: true,
      clearinputicon: false
    };
  },
  computed: {
    ...mapGetters([
      "certList",
      "totalComp",
      "currentTab",
      "currentPage",
      "loadingState"
    ])
  },
  watch: {
    keyword: function(newval, oldval) {
      newval !== ""
        ? (this.clearinputicon = true)
        : (this.clearinputicon = false);
    }
  },
  methods: {
    clearinput() {
      this.keyword = "";
      this.getCertList();
    },
    tab(index) {
      this.$store.dispatch("getCurrentPage", 1);
      // console.log(this.currentPage)
      this.$store.dispatch("getCurrentTab", index + 1);
      if (index === 4) {
        return;
      }
      this.keyword = "";
      this.getCertList();
    },
    getCertList() {
      this.$store.dispatch("getCertList", {
        status: this.currentTab,
        keyword: this.keyword,
        offset: this.offset,
        limit: this.limit
      });
    }
  },

  mounted() {
    this.getCertList();
  }
};
</script>

<style lang="scss">
@import "../styles/core";
.authtab {
  margin-top: 10px;
  > div {
    display: inline-block;
    overflow: hidden;
  }
  .authStatus {
    display: inline-block;
    margin-right: 40px;
    @extend %clearfix;
    li {
      cursor: pointer;
      float: left;
      @include size(70px,40px);
      line-height: 40px;
      text-align: center;
      color: #5a5e65;
      border: 1px solid #d8dce5;
      margin-left: -1px;

      &.active {
        background-color: $theme;
        color: #fff;
      }
    }
    li:nth-of-type(1) {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    li:nth-of-type(4) {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .search {
    position: relative;
    .el-input {
      width: 368px;
      input {
        padding: 0 30px;
      }
    }
    .el-icon-search,
    .el-icon-circle-close {
      position: absolute;
      top: 12px;
      z-index: 2;
      font-size: 16px;
      cursor: pointer;
      &::before {
        color: #b4bccd;
      }
    }
    .el-icon-search {
      left: 9px;
    }
    .el-icon-circle-close {
      right: 6px;
    }
  }
}
.certList {
  padding-right: 30px;
  margin-top: 30px;
  .anthtable {
    border-top: 1px solid #d8dce5;
    .el-table {
      min-height: 600px;
      &::before {
        height: 0;
      }
    }
    table {
      th,
      td {
        text-align: center;
        .authshowBtn {
          width: 76px;
          pointer-events: none;
          border-radius: 14px;
        }
      }
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>
