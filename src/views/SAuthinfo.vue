<template>
    <div class="sauthInfo">
        <el-button type="primary" icon="el-icon-back" @click="back()" class="backBtn">返回</el-button>
        <auth-detail :showAll="true" :authForm="authForm"/>
        <div class="actionBtn">
          <el-form>
            <el-form-item v-if="authForm.cert_status==='1'">
              <el-button type="primary" @click="onSubmit(1)">审核通过</el-button>
              <el-button type="danger" @click="UnqualifiedModal = true">不合格</el-button>
            </el-form-item>
            <el-form-item v-if="authForm.cert_status==='2'">
              <el-button type="danger" @click="CancellAuthModal = true">取消认证</el-button>
            </el-form-item>
            <el-form-item v-if="authForm.cert_status==='3'">
              <el-button type="primary" @click="onSubmit(1)">审核通过</el-button>
            </el-form-item>
          </el-form>
        </div>
        <Modal
          title="取消认证" 
          v-model="CancellAuthModal" 
          :draggable="true"
          v-on:cancel="cancel"
          v-on:comfirm="CancellAuth">
          <p>取消认证后，该企业的信息将无法在被叫用户手机上展示。</p>
        </Modal>

        <Modal
          title="不合格原因" 
          v-model="UnqualifiedModal" 
          :draggable="true"
          :comfirmBtnDisabled="textarea.length<=3"
          v-on:cancel="cancel"
          v-on:comfirm="onSubmit(2)">
          <div class="cancelQualifie">
            <textarea v-model="textarea" placeholder="请输入不合格原因，3个字以上，比如：包含敏感词等"></textarea>
          </div>
        </Modal>

        <div class="loading-mask" v-show="loadingState">
          <Loading v-show="loadingState"/>
        </div>

    </div>
</template>

<script>
import { messageTip } from "@/components/common/Message";
import AuthDetail from "@/components/authenticate/AuthDetail";
import Modal from "@/components/common/Modal";
import Loading from "@/components/common/Loading";
import request from "@request";
import api from "@api";
import { mapGetters } from "vuex";
export default {
  name: "system-auth-info",
  components: {
    AuthDetail,
    Modal,
    Loading
  },
  data() {
    return {
      UnqualifiedModal: false,
      CancellAuthModal: false,
      textarea: "",
      authForm: {},
      eid: 0,
      certStatus: "1",
      backTab: 1
    };
  },
  computed: {
    ...mapGetters(["loadingState", "currentTab"])
  },
  mounted() {
    console.log(this.currentTab);
    this.eid = this.$route.params.userId;
    this.sysGetCert();
  },
  methods: {
    // 获取详情
    sysGetCert() {
      this.$store.dispatch("getloadingState", true);
      request(api.sysGetCert, {
        eid: this.eid
      }).then(res => {
        this.$store.dispatch("getloadingState", false);
        if (res.status === 0 && res.data) {
          this.authForm = res.data;
          this.certStatus = res.data.cert_status;
        }
      });
    },
    onSubmit(type) {
      if (type === 1) {
        this.CertAction({
          eid: this.eid,
          cert_status: 2
        });
      }
      // 不合格
      if (type === 2) {
        this.CertAction({
          eid: this.eid,
          cert_status: 3,
          reason: this.textarea
        });
      }
    },
    // 审核通过/不通过
    CertAction(data) {
      this.$store.dispatch("getloadingState", true);
      request(api.sysCheckCert, data).then(res => {
        if (res.status === 0) {
          this.$store.dispatch("getloadingState", false);
          // 待审核列表
          if (this.certStatus === "1") {
            messageTip.$success({
              content: "审核通过"
            });
            this.cancel();
            this.back();
          }
          // 不合格列表通过
          if (this.certStatus === "3") {
            this.cancel();
            this.back();
          }
        } else {
          this.$store.dispatch("getloadingState", false);
          messageTip.$error({
            content: res.info
          });
        }
      });
    },
    // 取消认证
    CancellAuth() {
      this.$store.dispatch("getloadingState", true);
      request(api.sysCancelCert, {
        eid: this.eid
      }).then(res => {
        console.log(res);
        this.$store.dispatch("getloadingState", false);
        if (res.status === 0) {
          messageTip.$success({
            content: "取消认证"
          });
          this.cancel();
          this.back();
        } else {
          messageTip.$error({
            content: res.info
          });
        }
      });
    },
    cancel() {
      this.CancellAuthModal = false;
      this.UnqualifiedModal = false;
      this.textarea = "";
    },
    back() {
      history.back();
    }
  }
};
</script>
<style lang="scss">
.sauthInfo {
  .actionBtn {
    padding-left: 130px;
    margin-bottom: 80px;
    .el-button {
      width: 104px;
    }
  }
  .el-button.backBtn {
    padding: 12px 14px;
    i {
      margin-right: 7px;
    }
  }
  .cancelQualifie {
    textarea {
      border: 1px solid #d8dce5;
      padding: 10px 15px;
      border-radius: 4px;
      width: 507px;
      height: 64px;
      transition: all, 0.35s;
      color: #333;
      &:focus {
        border: 1px solid #4cabe9;
      }
    }
  }
}
</style>
