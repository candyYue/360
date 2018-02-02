<template>
    <div class="photo-crop-wrap">
      <div class="clearfix">
        <div class="upload-block">
            <h6>图片上传</h6>
            <div class="photo-crop-box">
                <el-upload
                    :data="{'bizKey':'cert'}"
                    :action="uploadUrl" :show-file-list="false"
                    :before-upload="beforeUpload" :on-success="uploadSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">支持格式为JPG、PNG、小于1M的图片文件，<br/>尺寸不小于400*400px</div>
                </el-upload>
                
                <div class="canvas-box" v-show="uploadImg">
                    <canvas :width="canvasSize.width" :height="canvasSize.height" ref="cropCanvas" 
                            class="crop-canvas" :class="{'movement':movement}"></canvas>
                </div>
            </div>
        </div>
        <div class="preview-block">
            <h6>预览</h6>
            <div class="preview-box">
                <!-- 预览图片 110*110 -->
                <div class="preview-img">
                  <canvas width="110" height="110" ref="previewCanvas" class="preview-canvas"></canvas>                                      
                </div>
                <p>400*400px</p>
                
                <!-- 实际上传图片 -->
                <canvas width="170" height="170" ref="uploadCanvas" class="upload-canvas" style="display:none;"></canvas>  
                <img :src="uploadImg" style="display:none;">                                     
            </div>
        </div>
      </div>  
      <el-upload v-if="uploadImg" class="btn-again"
            :data="{'bizKey':'cert'}"
            :action="uploadUrl" :show-file-list="false"
            :before-upload="beforeUpload" :on-success="uploadSuccess">
            <el-button size="small">重新上传</el-button>
      </el-upload>

      <div class="action-block">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="comfirm" :disabled="uploadBtnDisable">确定</el-button>
      </div>
    </div>
</template>

<script>
import api from "@api";
import { messageTip } from "@/components/common/Message";
export default {
  name: "photo-crop",
  data() {
    return {
      uploadUrl: api.uploadFile,
      uploadImg: "",
      slectRadius: 85,

      movement: false,

      imgData: {
        width: 400,
        height: 400
      },
      // 剪裁图片canvas大小
      canvasSize: {
        width: 275,
        height: 275
      },
      cropLocation: {
        X: 0,
        Y: 0
      }
    };
  },
  computed: {
    uploadBtnDisable() {
      return !this.uploadImg.length;
    },
    circleCenter: {
      get() {
        return {
          X: this.cropLocation.X + this.slectRadius,
          Y: this.cropLocation.Y + this.slectRadius
        };
      },
      set(newVal) {
        let X = newVal.X - this.slectRadius;
        let Y = newVal.Y - this.slectRadius;
        // 设置临界点
        if (this.canvasSize.width > 2 * this.slectRadius) {
          X < 0 && (X = 0);
          X + 2 * this.slectRadius > this.canvasSize.width &&
            (X = this.canvasSize.width - 2 * this.slectRadius);
        }
        if (this.canvasSize.height > 2 * this.slectRadius) {
          Y < 0 && (Y = 0);
          Y + 2 * this.slectRadius > this.canvasSize.height &&
            (Y = this.canvasSize.height - 2 * this.slectRadius);
        }
        this.cropLocation = { X, Y };
      }
    }
  },
  props: {
    duration: Number,
    maxSize: {
      type: Number,
      default: 275
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      const isLt1M = file.size / 1024 / 1024 < 1;
      const requireType = file.type === "image/jpg" || "image/png";
      if (!isLt1M) {
        messageTip.$error({ content: "图片大小不能超过1M" });
      }
      if (!requireType) {
        messageTip.$error({ content: "请选择格式为JPG、PNG的图片" });
      }
      return requireType && isLt1M;
    },
    uploadSuccess(response, file) {
      const self = this;
      const image = new Image();
      image.src = URL.createObjectURL(file.raw);
      image.onload = function() {
        console.log(image.width, image.height);
        self.imgData = {
          src: URL.createObjectURL(file.raw),
          width: image.width,
          height: image.height
        };
        if (image.width < 400 || image.height < 400) {
          messageTip.$error({ content: "图片尺寸应不小于400*400px" });
          return;
        }
        self.uploadImg = URL.createObjectURL(file.raw);
        console.log(URL.createObjectURL(file.raw));
        self.calcSize();
        setTimeout(() => {
          self.renderCrop();
          self.drag();
        }, 250);
      };
    },
    // 计算canvas宽高
    calcSize() {
      if (this.imgData.width > this.imgData.height) {
        this.canvasSize = {
          width: this.maxSize,
          height: Math.ceil(
            this.maxSize * this.imgData.height / this.imgData.width
          )
        };
      } else {
        this.canvasSize = {
          height: this.maxSize,
          width: Math.ceil(
            this.maxSize * this.imgData.width / this.imgData.height
          )
        };
      }
      this.cropLocation = {
        X: this.canvasSize.width / 2 - this.slectRadius,
        Y: this.canvasSize.height / 2 - this.slectRadius
      };
    },
    // 渲染裁剪区域
    renderCrop() {
      const image = new Image();
      image.src = this.uploadImg;

      const canvas = this.$refs.cropCanvas;
      const ctx = canvas.getContext("2d");

      // 清空画布
      ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
      ctx.save();

      // 绘制底色
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);

      // 填充图片
      ctx.drawImage(image, 0, 0, this.canvasSize.width, this.canvasSize.height);

      // 绘制蒙版
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,.5)";
      ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);

      // 绘制裁剪区域
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        this.circleCenter.X - this.slectRadius,
        this.circleCenter.Y - this.slectRadius,
        2 * this.slectRadius,
        2 * this.slectRadius
      );
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(image, 0, 0, this.canvasSize.width, this.canvasSize.height);
      this.drawCropImg(canvas);
      ctx.fillStyle = "rgba(255,255,255,.5)";
      ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);

      // 绘制选中区域
      ctx.beginPath();
      ctx.arc(
        this.circleCenter.X,
        this.circleCenter.Y,
        this.slectRadius,
        0,
        Math.PI * 2,
        true
      );
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(image, 0, 0, this.canvasSize.width, this.canvasSize.height);
      ctx.restore();
      this.preview(canvas);
    },
    drag() {
      const self = this;
      const canvas = this.$refs.cropCanvas;

      canvas.onmousedown = function(e) {
        let [lastX, lastY] = [e.offsetX, e.offsetY];
        self.movement = true;
        canvas.onmousemove = function(e) {
          self.circleCenter = {
            X:
              self.canvasSize.width > 2 * self.slectRadius
                ? self.circleCenter.X + (e.offsetX - lastX)
                : self.canvasSize.width / 2,
            Y:
              self.canvasSize.height > 2 * self.slectRadius
                ? self.circleCenter.Y + (e.offsetY - lastY)
                : self.canvasSize.height / 2
          };
          self.renderCrop();
          [lastX, lastY] = [e.offsetX, e.offsetY];
        };
        canvas.onmouseup = function(e) {
          self.movement = false;
          canvas.onmousemove = null;
          canvas.onmouseup = null;
        };
      };
    },
    // 右侧预览图
    preview(image) {
      const canvas = this.$refs.previewCanvas;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        // 剪裁图片
        this.cropLocation.X,
        this.cropLocation.Y,
        this.slectRadius * 2,
        this.slectRadius * 2,
        0,
        0,
        110,
        110
      );
    },
    // 读取剪裁后的图片
    drawCropImg(image) {
      const canvas = this.$refs.uploadCanvas;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        // 剪裁图片
        this.cropLocation.X,
        this.cropLocation.Y,
        this.slectRadius * 2,
        this.slectRadius * 2,
        0,
        0,
        this.slectRadius * 2,
        this.slectRadius * 2
      );
    },
    // 上传剪切后的图片至服务器
    uploadCropImg() {
      const self = this;
      this.$refs.uploadCanvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const formData = new FormData();
        formData.append("file", blob, "logo.jpg");
        formData.append("bizKey", "cert");

        const request = new XMLHttpRequest();
        request.open("POST", api.uploadFile, true);
        request.send(formData);

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status === 200) {
              let response = JSON.parse(request.response);
              let file = response.status === 0 && response.data.savename;
              self.$emit("comfirm", file, url);
              self.cancel();
            }
          }
        };
      });
    },
    cancel() {
      this.$emit("cancel");
      this.duration && setTimeout(() => this.clear(), this.duration);
    },
    comfirm() {
      this.uploadCropImg();
    },
    clear() {
      this.uploadImg = "";
      this.$refs.previewCanvas.getContext("2d").clearRect(0, 0, 110, 110);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "../../styles/core";
.photo-crop-wrap {
  @include clearfix;
  h6 {
    color: #5a5e66;
    font-size: 14px;
    margin-bottom: 12px;
    font-weight: normal;
  }
  .el-button--small {
    padding: 8px 20px;
  }
}
.upload-block {
  float: left;
}
.photo-crop-box {
  position: relative;
  @include size(275px);
  @include center-flex;
  background-color: #edf2fd;
  text-align: center;
  .crop-canvas {
    @include center-translate();
    &.movement {
      cursor: move;
    }
    &.resize {
      cursor: nwse-resize;
    }
  }
  .canvas-box {
    position: absolute;
    left: 0;
    top: 0;
    @include size(100%);
    background-color: #333;
  }
}
.preview-block {
  float: right;
  text-align: center;
  .preview-img {
    display: block;
    @include round(110px);
    overflow: hidden;
    background: url(/static/images/logo-demo-110.png);
  }
  p {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
.btn-again {
  margin-top: 14px;
}
.action-block {
  margin-top: 30px;
  text-align: right;
}
</style>