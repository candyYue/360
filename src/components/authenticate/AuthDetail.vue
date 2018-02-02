<template>
  <div class="authDetail">
    <h3>来电显示信息</h3>
    <el-form ref="form" label-width="105px">
      <el-form-item label="企业名称">
        <span>{{authForm.ep_short_name}}</span>
      </el-form-item>
      <el-form-item label="总机号">
        <show-number-list :numberList="authForm.switch_number?authForm.switch_number:[]"/>
      </el-form-item>
      <el-form-item label="直线号码">
        <show-number-list :numberList="authForm.direct_number?authForm.direct_number:[]" :col="4" :row="2"/>        
      </el-form-item>
      <el-form-item label="企业logo" class="company-logo-form">
        <div class="company-logo"><img :src="logoSrc"></div>
      </el-form-item>
      <el-form-item label="企业宣传语">
        <span>{{authForm.ep_slogan?authForm.ep_slogan:''}}</span>
      </el-form-item>
    </el-form>
    <div v-if="showAll">
      <h3>资质信息</h3>
      <el-form ref="form" label-width="130px">
        <el-form-item label="企业名称">
          <span>{{authForm.ep_name}}</span>
        </el-form-item>
        <el-form-item label="企业证件">
          <span>{{cert(cert_qualificationList,authForm.ep_card_type)}}</span>
        </el-form-item>
        <el-form-item label="企业证件号码">
          <span>{{authForm.ep_card_number}}</span>
          <img :src="getImgSrc(authForm.ep_card_pic)" alt="企业证件号码" @click='openImgModal($event)' class="show-img">
        </el-form-item>
        <el-form-item label="企业负责人">
          <span>{{cert(ep_leaderList,authForm.ep_leader_type)}}</span>
        </el-form-item>
        <el-form-item label="负责人证件">
          <span>{{cert(credentialsList,authForm.ep_leader_number_type)}}</span>
        </el-form-item>
        <el-form-item label="负责人证件号码">
          <span>{{authForm.ep_leader_number}}</span>
        </el-form-item>
        <el-form-item label="负责人姓名" class="moreImg">
          <span>{{authForm.ep_leader_name}}</span>
          <div v-if="authForm.ep_leader_number_type!=='12'">
            <img :src="getImgSrc(authForm.leader_idcard_fphoto)" alt="正面证件信息" @click='openImgModal($event)' class="show-img">
            <img :src="getImgSrc(authForm.leader_idcard_bphoto)" alt="反面证件信息" @click='openImgModal($event)' class="show-img">
            <img :src="getImgSrc(authForm.ep_leader_job_certi)" alt="在职证明" @click='openImgModal($event)' class="show-img" v-if="authForm.ep_leader_job_certi">
          </div>
          <div v-if="authForm.ep_leader_number_type==='12'">
            <img :src="getImgSrc(authForm.ep_leader_passport)" alt="护照" @click='openImgModal($event)' class="show-img">
          </div>
        </el-form-item>
        <el-form-item label="负责人联系方式">
          <span>{{authForm.ep_leader_tel}}</span>
        </el-form-item>
        <el-form-item label="其他资质" v-if="authForm.other_qualification" class="moreImg">
          <img :src="getImgSrc(item)" alt="其他资质" @click='openImgModal($event)' class="show-img" v-for="(item,index) in authForm.other_qualification.split(',')" :key="index">
        </el-form-item>
        
      </el-form>
    </div>
    <Modal
    title="" 
    v-model="imgModal"
    :showCancel='false'
    v-on:cancel="cancel"
    v-on:comfirm="cancel">
      <div class="showImg">
        <img :src="currentShowImg" alt="其他资质" class="currentImg">
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCertImg } from "@/utils/filters";
import Modal from "@/components/common/Modal";
import ShowNumberList from "@/components/common/ShowNumberList";
import { getCerSeletOptions } from "@/service";
export default {
  name: "auth-detail",
  components: {
    Modal,
    ShowNumberList
  },
  props: {
    authForm: {
      type: Object,
      default: {}
    },
    showAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgModal: false,
      currentShowImg: "",
      cert_qualificationList: [],
      credentialsList: [],
      ep_leaderList: []
    };
  },
  computed: {
    logoSrc() {
      if (this.authForm.icon) {
        return this.getCertImg(this.authForm.icon, this.$route.params.userId);
      } else {
        return "/static/images/logo-demo-54.png";
      }
    }
  },
  methods: {
    getCertImg,
    getImgSrc(src) {
      if (src) {
        return this.getCertImg(src, this.$route.params.userId);
      }
    },
    openImgModal(e) {
      if (e.srcElement.currentSrc !== "") {
        this.currentShowImg = e.srcElement.currentSrc;
        this.imgModal = true;
      } else {
        return false;
      }
    },
    cert(DictionaryList, cardType) {
      const arr = DictionaryList && DictionaryList.filter(item => item.id === cardType);
      return arr.length && arr[0].value;
    },
    cancel() {
      this.imgModal = false;
    }
  },
  async beforeMount() {
    const seletOptions = await getCerSeletOptions();
    this.cert_qualificationList = seletOptions.cert_qualification.content || [];
    this.credentialsList = seletOptions.credentials.content || [];
    this.ep_leaderList = seletOptions.ep_leader.content || [];
  }
};
</script>

<style lang="scss">
@import "../../styles/core";
.authDetail {
  margin-bottom: 40px;
  padding-right: 30px;
  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #2d2f34;
    position: relative;
    margin-top: 40px;
    margin-bottom: 45px;
    &::before {
      content: "";
      height: 1px;
      width: 100%;
      background: #d8dce5;
      position: absolute;
      bottom: -5px;
      left: 0;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
    .show-img {
      width: 160px;
      height: 100px;
      display: block;
      border: 1px solid #ccc;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .moreImg {
    .show-img + .show-img {
      margin-top: 20px;
    }
  }

  .showImg {
    text-align: center;
  }
  .el-form-item__label {
    padding-right: 24px;
  }
  .currentImg {
    width: 500px;
    max-height: 700px;
  }
}
</style>
