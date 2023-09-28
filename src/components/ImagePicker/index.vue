<template>
  <el-dialog title="选择图片" :visible.sync="dialogVisible" width="720px" :before-close="beforeClose">
    <div class="image-handle mb12">
      <el-upload
        ref="upload"
        action="/uploadImage"
        :auto-upload="false"
        accept="image/*"
        :on-success="uploadSuccess"
      >
        <el-button slot="trigger" type="primary">选取图片</el-button>
        <el-button class="ml10" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>

    <div class="image-list-wrapper">
      <div class="image-list mt16" v-infinite-scroll="loadImage" :infinite-scroll-disabled="disabled" infinite-scroll-distance="1">
        <div class="image-item" v-for="(item, i) in imageList" :key="i" @click="getImg(item)">
          <div class="image-area" :class="selectedImage.includes(item) ? 'selected' : ''">
            <img class="image" :src="imageBaseUrl + item" alt="" />
          </div>
          <div class="name over1" :title="item.replace('uploads/', '')">{{ item.replace("uploads/", "") }}</div>
        </div>
      </div>
      <p class="mt12 text-center" v-if="loading">加载中...</p>
      <p class="mt12 text-center" v-if="noMore">没有更多了</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="selectedImage.length == 0" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
import { imageBaseUrl } from "@/utils/url";

export default {
  data() {
    return {
      imageBaseUrl,
      imageList: [],
      selectedImage: [],
      page: 0,
      limit: 18,
      loading: false,
      noMore: false,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    imagePickerOpt: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    async loadImage() {
      this.loading = true;
      this.page++;
      request({
        url: "/images",
        params: {
          page: this.page,
        },
      }).then((res) => {
        if (res.files.length == 0) {
          this.noMore = true;
        }
        this.imageList = [...this.imageList, ...res.files];
        this.loading = false;
      });
    },
    getImg(item) {
      this.selectedImage = [item];
    },
    confirm() {
      this.$emit("confirm", this.selectedImage, this.imagePickerOpt);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    uploadSuccess() {
      this.imageList = []
      this.page = 0;
      this.noMore = false;
      this.loadImage();
    },
    beforeClose(done) {
      this.selectedImage = [];
      done();
    },
  },
};
</script>

<style scoped lang="scss">
.image-list-wrapper {
  overflow: auto;
  height: 403px;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  .image-item {
    cursor: pointer;
    width: 100px;
    margin-right: 12px;
    margin-bottom: 12px;
    &:nth-of-type(6n + 6) {
      margin-right: 0;
    }
    .image-area {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      padding: 8px;
      &.selected {
        border-color: #1890ff;
        border-width: 2px;
      }
      .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .name {
      margin-top: 6px;
    }
  }
}
</style>
