<template>
    <div class="anthtable">
      <!-- 表格 -->
      <el-table
        :data="certListArr">
        <el-table-column
          prop="ep_short_name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="总机号"
          width="180">
          <template slot-scope="props">
            <div v-if="props.row.switch_number">
              <div v-if="props.row.switch_number.length>3" class="over-three">
                <p v-for="(item, index) in switchNumberList(props.$index,props.row)" :key="index">{{item}}</p>
                <p class='show-more' @click="showMore(props.$index,props.row)" v-if="!props.row.showMore">···</p>
              </div>
              <div v-else>
                <p v-for="(item, index) in props.row.switch_number" :key="index">{{item}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="props">
            <el-button class='authshowBtn' size="mini" type="primary" v-if="props.row.cert_status==='1'">待审核</el-button>
            <el-button class='authshowBtn' size="mini" type="success" v-if="props.row.cert_status==='2'">已认证</el-button>
            <el-button class='authshowBtn' size="mini" type="danger" v-if="props.row.cert_status==='3'">不合格</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="认证时间">
          <template slot-scope="props">
            <span>{{formatDate(+props.row.cert_time)}}</span>
          </template>
          
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            @click.native.prevent="showinfo(scope.$index, scope.row)"
            type="text"
            size="small">
            查看认证详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 无数据 -->
      <div class="noCert" v-if="!certList">
        <img src="../../../static/images/no-data.png" alt="">
      </div>


      <!-- 分页 -->
      <el-pagination 
        v-if="certList"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total,  prev, pager, next, jumper"
        :total="totalComp">
      </el-pagination>
    </div>
</template>

<script>
import { formatDate } from "@/utils/filters";
import { mapGetters } from "vuex";
export default {
  name: "auth-table",
  props: ["certList", "keyword", "offset", "limit"],
  data() {
    return {
      switch_number: [
        "025-45678945",
        "025-35484126",
        "025-35484126",
        "025-35484126",
        "025-35484126"
      ],
      more: false,
      certListArr: this.certList
    };
  },
  computed: {
    ...mapGetters(["totalComp", "currentPage", "currentTab"])
  },
  watch: {
    certList(val) {
      val &&
        val.map(item => {
          item.showMore = false;
        });
      this.certListArr = val;
    }
  },
  mounted() {},
  methods: {
    formatDate,
    showinfo(index, rows) {
      this.$router.push({ name: "SAuthInfo", params: { userId: rows.eid } });
    },
    handleCurrentChange(val) {
      this.$store.dispatch("getCurrentPage", val);
      this.$store.dispatch("getCertList", {
        status: this.currentTab,
        keyword: this.keyword,
        offset: this.currentPage,
        limit: this.limit
      });
      console.log(`当前页: ${this.currentPage}`);
    },
    switchNumberList(index, val) {
      if (val.showMore) {
        return val.switch_number;
      } else {
        return val.switch_number.slice(0, 3);
      }
    },
    showMore(index, val) {
      const temp = this.certListArr.slice(0);
      temp[index].showMore = true;
      this.certListArr = temp;
    }
  }
};
</script>

<style scoped lang="scss">
.anthtable {
  position: relative;
}
.anthtable .el-pagination {
  text-align: center;
}
.noCert {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 54px;
  padding-top: 90px;
  z-index: 2;
  background: #fff;
}
.over-three {
  .show-more {
    cursor: pointer;
    line-height: 12px;
  }
}
</style>
