<template>
  <div class="auth-form">
    <auth-status-bar :status="certStatus"/>

    <div class="step">名片认证步骤：
      <span><i class="step-content">1</i> 填写来电显示信息</span><i class="step-bar"></i>
      <span><i class="step-content">2</i> 填写资质信息</span><i class="step-bar"></i>
      <span><i class="step-content el-icon-check"></i> 提交认证</span>
    </div>

    <el-form ref="authForm" :model="authForm" :rules="rules" @submit.native.prevent label-width="120px">
      <h3>来电显示信息</h3>

      <el-form-item label="企业名称" prop="ep_short_name">
        <el-input v-model="authForm.ep_short_name" :maxlength="11"></el-input>
      </el-form-item>

      <el-form-item label="总机号">
        <show-number-list :numberList="authForm.switch_number"/>
      </el-form-item>

      <el-form-item label="直线号码">
        <div v-if="authForm.direct_number.length">
          <div class="direc-number-box">
            <span v-for="(item,index) in authForm.direct_number" :key="index">
              {{ item }}
            </span>
          </div>
          <el-button type="primary" plain @click="addNumberOpen">修改直线号码</el-button>
        </div>
        <div v-else>
          <el-button type="primary" plain @click="addNumberOpen">点击添加直线号码</el-button>
        </div>
      </el-form-item>

      <!-- 添加直线号码弹框 start -->
      <Modal title="选择直线号码" v-model="addNumberModal"
             @cancel="addNumberClose" @comfirm="addNumberComfirm"
             :comfirmBtnDisabled="numberBtnDisabled"
             >
          <el-transfer :titles="['全部', '全部']"
                       :data="allDirectNumber" v-model="selDirecNumber">
          </el-transfer>
      </Modal>
      <!-- 添加直线号码弹框 end -->

      <el-form-item label="企业logo" class="company-logo-form">
          <div class="company-logo"><img :src="companyLogo"></div>
          <el-button type="primary" plain @click="logoModal=true">上传企业logo</el-button>  
      </el-form-item>

      <!-- 上传logo弹框 start -->
      <Modal class="logo-modal" title="上传logo" v-model="logoModal" :showFooter="false" @cancel="logoModal=false">
            <PhotoCrop  @cancel="logoModal=false" @comfirm="saveLogo" :duration="1000"/>
      </Modal>
      <!-- 上传logo弹框 end -->
    
      <el-form-item label="企业宣传语" prop="ep_slogan">
        <el-input v-model.lazy="authForm.ep_slogan" placeholder="请输入企业宣传语，20字以内" :maxlength="20"></el-input>
      </el-form-item>

      <h3>资质信息</h3>
      <el-form-item label="企业名称" prop="ep_name">
        <el-input v-model="authForm.ep_name" placeholder="请输入企业完整名称，35字以内" :maxlength="35"></el-input>
      </el-form-item>

      <el-form-item label="企业证件" prop="ep_card_type">
        <el-select v-model="authForm.ep_card_type">
          <el-option v-for="item in cert_qualificationList" :key="item.id"
                     :label="item.value" :value="item.id">
          </el-option>
       </el-select>
       <span class="tip">如使用营业执照请上传“最新营业执照”或有“2012年年检章的营业执照”</span>
      </el-form-item>
      <el-form-item label="企业证件号码" prop="ep_card_number">
        <el-input v-model="authForm.ep_card_number" placeholder="6~30位数字与字母组合" :minlength="6" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="ep_card_pic">
        <upload-pic upload-tip="上传证件照片" field="ep_card_pic" show-sample :sample-url="sampleUrl" 
          :defaultImg="authForm.ep_card_pic"
          @upload-success="uploadChange" @upload-remove="uploadChange"/>
          <input v-model="authForm.ep_card_pic" type="hidden" />
      </el-form-item>
    
      <el-form-item label="企业负责人" prop="ep_leader_type">
        <el-select v-model="authForm.ep_leader_type">
          <el-option v-for="item in ep_leaderList" :key="item.id"
            :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人证件" prop="ep_leader_number_type">
        <el-select v-model="authForm.ep_leader_number_type">
          <el-option v-for="item in credentialsList" :key="item.id"
            :label="item.value" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人证件号码" prop="ep_leader_number">
        <el-input v-model="authForm.ep_leader_number" placeholder="2~30位数字与字母组合" :minlength="2" :maxlength="30"></el-input>
      </el-form-item>

      <el-form-item label="负责人姓名" prop="ep_leader_name">
        <el-input v-model="authForm.ep_leader_name" placeholder="请输入负责人姓名" :maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="" prop="ep_leader_passport" v-if="+authForm.ep_leader_number_type===12">
        <upload-pic upload-tip="上传护照" field="ep_leader_passport"
        :defaultImg="authForm.ep_leader_passport"
        @upload-success="uploadChange" @upload-remove="uploadChange"/>
        <input v-model="authForm.ep_leader_passport" type="hidden" />
      </el-form-item>

      <div v-else>
        <el-form-item label="" prop="leader_idcard_fphoto">
          <upload-pic upload-tip="上传身份证正面" field="leader_idcard_fphoto"
          :defaultImg="authForm.leader_idcard_fphoto"
          @upload-success="uploadChange" @upload-remove="uploadChange"/>
         <input v-model="authForm.leader_idcard_fphoto" type="hidden" />          
        </el-form-item>
        <el-form-item label="" prop="leader_idcard_bphoto">
          <upload-pic upload-tip="上传身份证反面" field="leader_idcard_bphoto"
          :defaultImg="authForm.leader_idcard_bphoto"          
          @upload-success="uploadChange" @upload-remove="uploadChange"/>
        <input v-model="authForm.leader_idcard_bphoto" type="hidden" />
        </el-form-item>
      </div>
      
      <el-form-item label="" prop="ep_leader_job_certi" v-if="+authForm.ep_leader_type===6">
        <upload-pic upload-tip="上传在职证明" field="ep_leader_job_certi"
        :defaultImg="authForm.ep_leader_job_certi"                  
        @upload-success="uploadChange" @upload-remove="uploadChange"/>
        <input v-model="authForm.ep_leader_job_certi" type="hidden" />
      </el-form-item>

      <el-form-item label="负责人联系方式" prop="ep_leader_tel">
        <el-input v-model="authForm.ep_leader_tel" placeholder="请输入联系方式" :maxlength="11"></el-input>
      </el-form-item>

      <el-form-item  class="upload-pic-label">
        <label slot="label">
         <i class="iconfont icon-explain">
           <span class="explain-box">
             <span v-html="explain" class="explain"></span>
           </span>
         </i> 
         <span>其他资质</span>
        </label>
        <upload-pic upload-tip="上传图片" :limit="5" field="other_qualification"
              :defaultImg="authForm.other_qualification"                         
              @upload-success="uploadChange" @upload-remove="uploadChange"/> 
        <input v-model="authForm.other_qualification" type="hidden" />                     
      </el-form-item>

      <el-form-item>
        <el-checkbox name="type" v-model="checked">阅读并同意</el-checkbox>
        <a @click="serviceModal=true" class="link" href="javascript:;">《可信任证服务协议》</a>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="comfirmBtnDisabled">{{this.certStatus === 2 ? "保存" : "提交认证"}}</el-button>
        <el-button type="danger" @click="onCancelCert" v-if="this.certStatus === 2">取消认证</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>


    <!-- 服务协议弹框 -->
    <Modal title="服务协议" :show-close="false" class="service-modal" v-model="serviceModal">
      <div v-html="protocol"></div>
      <div slot="footer">
        <el-button type="primary" round class="btn-service-modal-close" @click="serviceModal=false">关闭</el-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { authRules } from "@/utils/rules";
import { sortNumberArr, getCertImg } from "@/utils/filters";
import api from "@api";
import request from "@request";
import {
  getCerSeletOptions,
  getAllNumber,
  getInfo,
  getCertProtocol,
  getCertExplain
} from "@/service";

import AuthStatusBar from "@/components/authenticate/AuthStatusBar";
import Modal from "@/components/common/Modal";
import UploadPic from "@/components/common/UploadPic";
import ShowNumberList from "@/components/common/ShowNumberList";
import PhotoCrop from "@/components/common/PhotoCrop";
import { messageBox, messageTip } from "@/components/common/Message";

export default {
  name: "auth-edit",
  components: {
    AuthStatusBar,
    Modal,
    UploadPic,
    ShowNumberList,
    PhotoCrop
  },
  data() {
    return {
      addNumberModal: false,
      logoModal: false,
      serviceModal: false,
      rules: authRules,
      checked: false,
      // selet options
      cert_qualificationList: [],
      credentialsList: [],
      ep_leaderList: [],
      protocol: "",
      explain: "",
      allDirectNumber: [],
      selDirecNumber: [],
      companyLogo: "/static/images/logo-demo-54.png"
    };
  },
  computed: {
    ...mapGetters(["authForm", "certStatus"]),
    sampleUrl() {
      const arr = this.cert_qualificationList.filter(
        item => item.id === this.authForm.ep_card_type
      );
      return (arr.length && arr[0].sample_pic) || "";
    },
    numberBtnDisabled() {
      return !this.selDirecNumber.length;
    },
    comfirmBtnDisabled() {
      authRules.ep_leader_job_certi = [
        { required: +this.authForm.ep_leader_type === 6 }
      ];
      authRules.ep_leader_passport = [
        { required: +this.authForm.ep_leader_number_type === 12 }
      ];
      authRules.leader_idcard_fphoto = [
        { required: +this.authForm.ep_leader_number_type !== 12 }
      ];
      authRules.leader_idcard_bphoto = [
        { required: +this.authForm.ep_leader_number_type !== 12 }
      ];
      return !(
        Object.entries(authRules).every(
          item => (item[1][0].required ? this.authForm[item[0]] : true)
        ) && this.checked
      );
    }
  },
  methods: {
    sortNumberArr,
    getCertImg,
    addNumberClose() {
      this.addNumberModal = false;
    },
    addNumberOpen() {
      this.selDirecNumber = this.authForm.direct_number;
      this.addNumberModal = true;
    },
    addNumberComfirm() {
      this.authForm.direct_number = this.selDirecNumber;
      this.addNumberClose();
    },
    uploadChange(file, field) {
      this.authForm[field] = file;
      console.log(this.authForm[field]);
    },
    saveLogo(logo, url) {
      this.authForm["icon"] = logo;
      this.companyLogo = url;
      messageTip.$success({
        content: "图片上传成功"
      });
    },
    onSubmit() {
      this.$refs["authForm"].validate(valid => {
        if (valid) {
          this.saveCert();
        }
      });
    },
    async saveCert() {
      console.log(this.authForm);
      const saveRes = await this.$store.dispatch("saveCert", this.authForm);
      if (saveRes.status === 0) {
        if (this.certStatus === 2) {
          messageBox.$success({
            title: "保存成功",
            content:
              "你提交的企业认证信息已变更，我们会在3个工作日内完成审核。审核通过后，变更的企业信息将在被叫用户手机上展示。",
            successCallback: () => {
              this.updateCertState();
            }
          });
        } else {
          messageBox.$success({
            title: "提交成功",
            content:
              "感谢您提交的信息，我们已经收到您的认证，我们会在3个工作日内完成审核。审核通过后，企业信息将在被叫用户手机上展示。",
            successCallback: () => {
              this.updateCertState();
            }
          });
        }
      }
    },
    updateCertState() {
      this.$store.dispatch("changeEdit", false);
      this.$store.dispatch("getData");
    },
    onCancelCert() {
      const self = this;
      messageBox.$warning({
        title: "取消认证",
        content:
          "取消认证后您的企业信息将无法继续呈现在被叫用户的手机上。同时有可能被用户错误标记。",
        comfirmText: "取消认证",
        cancelText: "取消",
        successCallback() {
          request(api.cancelCert).then(res => {
            messageTip.$success({
              content: "取消认证成功",
              callback() {
                self.updateCertState();
              }
            });
          });
        }
      });
    },
    onCancel() {
      const self = this;
      messageBox.$warning({
        btnChange: true,
        title: "取消认证",
        content:
          "您的认证信息还没有完成，继续认证可以将您的企业信息呈现在被叫用户的手机上。避免被错误标记。",
        comfirmText: "取消认证",
        cancelText: "继续认证",
        successCallback() {
          self.$store.dispatch("changeEdit", false);
        }
      });
    }
  },
  async beforeMount() {
    const seletOptions = await getCerSeletOptions();
    this.cert_qualificationList = seletOptions.cert_qualification.content || [];
    this.credentialsList = seletOptions.credentials.content || [];
    this.ep_leaderList = seletOptions.ep_leader.content || [];

    if (this.certStatus === 0) {
      const companyInfo = await getInfo();
      this.authForm.ep_short_name = companyInfo.name;
      this.authForm.ep_card_type = this.cert_qualificationList[0].id;
      this.authForm.ep_leader_type = this.ep_leaderList[0].id;
      this.authForm.ep_leader_number_type = this.credentialsList[0].id;
    }

    const allNumber = await getAllNumber();
    this.authForm.switch_number = allNumber.switch_number || [];
    this.allDirectNumber =
      (allNumber.direct_number &&
        this.sortNumberArr(allNumber.direct_number).map(d => {
          // ！！！设置key和label一致 ！！！
          return {
            key: d,
            label: d
          };
        })) ||
      [];

    this.protocol = await getCertProtocol();
    this.explain = await getCertExplain();
  },
  mounted() {
    this.$nextTick(() => {
      this.companyLogo =
        (this.authForm &&
          this.authForm.icon &&
          this.getCertImg(this.authForm.icon)) ||
        "/static/images/logo-demo-54.png";
      this.checked = !!(this.certStatus === 2 || this.certStatus === 3);
    });
  }
};
</script>


<style scoped lang="scss">
@import "../../styles/core";
.el-input,
.el-select {
  width: 358px;
}

.auth-form {
  h3 {
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #d8dce5;
    margin: 40px 0;
    line-height: 1;
    padding-bottom: 12px;
  }
}

.tip {
  color: #8c939d;
  margin-left: 12px;
}

// 直线号码展示框
.direc-number-box {
  @include size(358px,80px);
  padding: 0 15px;
  border: 1px solid $border-input;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  margin-right: 20px;
}
</style>
