<template>
    <div class="authSetting">
        <el-radio v-model="radio" label="1" @change="change">邮件通知</el-radio>
        <p>邮件通知：每当有新的审核消息时，我们将对下方的邮箱发送邮件通知</p>
        <div class="saveInput">
            <div v-if="msg1==='保存'" >
              <el-input v-model="input1" placeholder="" :disabled="EmailInp" :maxlength="20" 
              :class="{ errorInput1: errorInput1 }"
              @keyup.enter.native="changeEmail"></el-input>@emicnet.com
            </div>
            <p v-else>{{input1}}  @emicnet.com</p>
            <span class="error" v-show="true">{{info1}}</span>
        </div>
        <el-button type="primary" @click='changeEmail' :disabled="EmailBtn">{{msg1}}</el-button>
        
        <div class="line"></div>
        
        <el-radio v-model="radio" label="2" @change="change">短信通知</el-radio>
        <p>短信通知：每当有新的审核消息时，我们将对下方的手机号发送短信通知</p>
        <div class="saveInput">
          <el-input v-if="msg2==='保存'" v-model="input2" placeholder="请输入手机号"  :disabled="TelInp" 
          :maxlength="11" :class="{ errorInput2: errorInput2 }"
          @keyup.enter.native="changeTel"></el-input>
          <p v-else>{{input2}}</p>
          <span class="error" v-show="true">{{info2}}</span>
        </div>
        <el-button type="primary" @click='changeTel' :disabled="TelBtn">{{msg2}}</el-button>
    </div>
</template>

<script>
import { messageTip } from "@/components/common/Message";
import request from "@request";
import api from "@api";
export default {
  name: "auth-setting",
  data() {
    return {
      radio: "1",
      input1: "support",
      input2: "",
      msg1: "编辑",
      msg2: "保存",
      info1: "",
      info2: "",
      errorInput1: false,
      errorInput2: false,
      currentRadio: "1"
    };
  },
  mounted() {
    this.getInfoSetting("email");
    this.getInfoSetting("mobile");
  },
  computed: {
    EmailBtn() {
      return this.currentRadio === "1" ? this.input1 === "" : true;
    },
    TelBtn() {
      return this.currentRadio === "2" ? this.input2 === "" : true;
    },
    EmailInp() {
      return this.currentRadio !== "1";
    },
    TelInp() {
      return this.currentRadio !== "2";
    }
  },
  methods: {
    changeEmail() {
      if (this.msg1 === "保存") {
        if (/[~!@#$%^&*]/.test(this.input1)) {
          this.info1 = "请输入正确的邮箱";
          return false;
        }
        this.setInfoSetting("email", `${this.input1}@emicnet.com`).then(() => {
          this.msg1 = "编辑";
        });
      } else {
        this.msg1 = "保存";
      }
    },
    changeTel() {
      if (this.msg2 === "保存") {
        var RegPhone = /^1[0-9]{10}$/;
        if (!RegPhone.test(this.input2)) {
          this.info2 = "请输入正确的手机号";
          return false;
        }
        this.setInfoSetting("mobile", this.input2).then(() => {
          this.msg2 = "编辑";
        });
      } else {
        this.msg2 = "保存";
      }
    },
    change(val) {
      this.info1 = "";
      this.info2 = "";
      this.errorInput1 = false;
      this.errorInput2 = false;
      this.currentRadio = val;
      var key;
      val === "1" ? (key = "email") : (key = "mobile");
      this.getInfoSetting(key);
    },
    getInfoSetting(key) {
      request(api.getNoticeWay, { key: key }).then(res => {
        if (res.status === 0 && res.data.sys_notice_value) {
          if (res.data.sys_notice_type === "email") {
            this.input1 = res.data.sys_notice_value.slice(0, -12);
            this.msg1 = "编辑";
          } else {
            this.input2 = res.data.sys_notice_value;
            this.msg2 = "编辑";
          }
        } else {
          this.input1 = "support";
          this.input2 = "";
        }
      });
    },
    setInfoSetting(key, value) {
      var that = this;
      return new Promise(function(resolve, reject) {
        request(api.setNoticeWay, {
          sys_notice_type: key,
          sys_notice_value: value
        }).then(res => {
          if (res.status === 0 && res.data) {
            messageTip.$success({ content: "保存成功" });
            that.info1 = "";
            that.info2 = "";
            resolve();
          } else {
            // 邮件失败
            if (res.status === 100105) {
              that.info1 = res.info;
              that.errorInput1 = true;
            }
            // 短信失败
            // if (res.status === 100105) {
            //   that.info2 = res.info;
            //   that.errorInput2 = true;
            // }
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
.authSetting {
  p {
    color: #595d65;
  }
  .saveInput {
    height: 40px;
    margin: 24px 0;
    position: relative;
    p {
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
    }
    .errorInput1 input,
    .errorInput2 input {
      border: 1px solid #fe4e4e;
    }
  }
  .el-input {
    width: 224px;
    margin-right: 12px;
  }
  .line {
    height: 1px;
    width: 100%;
    background-color: #d8dce5;
    margin: 40px 0;
  }
  .error {
    display: block;
    position: absolute;
    left: 0;
    bottom: -20px;
    color: #fe4e4e;
    font-size: 12px;
  }
}
</style>
