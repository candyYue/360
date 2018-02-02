<template>
<div class="upload-pic-wrap">
      <transition-group name="fade-up">
        {{imageUrl}}
      <div v-for="(n ,index) in (imageUrl.length+1)" :key="index" class="upload-pic-item" v-if="n<limit+1">
          <!-- <div v-if="n<limit+1"> -->
            <el-upload class="upload-pic-block" :tip="tip"
              accept="image/*"
              list-type="picture-card" :show-file-list="false"
              :action="uploadUrl" :data="{'bizKey':'cert'}"
              :before-upload="beforeUpload"
              :on-progress="progress"
              :on-success="success">
              <i class="el-icon-plus"></i>
              <p>{{uploadTip}}</p>
            </el-upload>
            <span class="show-example" v-if="showSample && n===1" @click="showSampleModal">示例</span>
            <p class="el-form-item__error">{{errorList[index]}}</p>
            <Loading class="upload-progress" v-if="loadingList[index]"/>
            <div v-if="imageUrl[index]" class="upload-pic-preview el-upload-list--picture-card">
                <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
                <img :src="imageUrl[index]">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="preview(index)"><i class="el-icon-zoom-in"></i></span>
                  <span class="el-upload-list__item-delete" @click="remove(index)"><i class="el-icon-delete"></i></span>
                </span>
            </div>
          <!-- </div> -->
      </div>
      </transition-group>
      <Modal v-model="dialogVisible" :showHeader="false" :showFooter="false" class="preview-modal"
        @cancel="dialogVisible=false"
      >
        <img width="100%" :src="dialogImageUrl">
      </Modal>
</div>

      
</template>

<script>
import api from "@api";
import Modal from "@/components/common/Modal";
import Loading from "@/components/common/Loading";
import { getCertImg } from "@/utils/filters";

export default {
  name: "upload-file",
  components: {
    Modal,
    Loading
  },
  props: {
    tip: {
      type: String,
      default: "支持格式为JPG、PNG且小于1M的图片文件"
    },
    bizKey: {
      type: String
    },
    field: {
      type: String,
      required: true
    },
    uploadTip: {
      type: String,
      default: "上传图片"
    },
    showSample: {
      type: Boolean,
      default: false
    },
    sampleUrl: {
      type: String
    },
    limit: {
      type: Number,
      default: 1
    },
    defaultImg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uploadUrl: api.uploadFile,
      dialogVisible: false,
      dialogImageUrl: this.defaultImg,
      samplePic: this.sampleUrl,
      fileList: this.defaultImg.length ? this.defaultImg.split(",") : [],
      loadingList: [],
      errorList: [],
      imageUrl: this.defaultImg.length
        ? this.defaultImg
            .split(",")
            .map(item => this.getCertImg(item))
        : []
    };
  },
  watch: {
    sampleUrl(value) {
      this.samplePic = value;
    }
  },
  methods: {
    getCertImg,
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const requireType = file.type === "image/jpg" || "image/png";
      if (!isLt1M) {
        this.errorList.push("图片大小应小于1M");
      }
      if (!requireType) {
        this.errorList.push("图片支持格式为JPG、PNG");
      }
      return requireType && isLt1M;
    },
    progress(event, file, fileList) {
      this.loadingList[this.imageUrl.length] = true;
    },
    success(event, file, fileList) {
      this.errorList[this.imageUrl.length] = "";
      this.loadingList[this.imageUrl.length] = false;
      this.imageUrl.push(URL.createObjectURL(file.raw));
      this.fileList.push(file.response.data.savename);
      this.$emit("upload-success", this.fileList.toString(), this.field);
    },
    remove(index) {
      console.log(this.imageUrl)
      this.imageUrl.splice(index, 1);
      this.fileList.splice(index, 1);
      this.$emit("upload-remove", this.fileList.toString(), this.field);
    },
    preview(index) {
      this.dialogImageUrl = this.imageUrl[index];
      this.dialogVisible = true;
    },
    showSampleModal() {
      this.dialogImageUrl = this.samplePic;
      this.dialogVisible = true;
    }
  },
  mounted() {
    // console.log(
    //   this.defaultImg
    //     .split(",")
    //     .map(item => `Talk/CertEp/file?fn=${item}&bizKey=cert`)
    // );
  }
};
</script>

<style scope lang="scss">
@import "../../styles/core";
.preview-modal .modal-content {
  width: auto;
  padding: 52px 28px 28px;
  .modal-body {
    padding: 0;
  }
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: transform 0.35s, opacity 0.2s;
}
.fade-up-enter,
.fade-up-leave-to {
  transform: translate3d(0, -80%, 0);
  opacity: 0;
}
</style>

