<template>
  <div class="act-item app-container">
    <el-card>
      <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动标题" prop="name">
          <el-input v-model="ruleForm.title" placeholder="活动标题"></el-input>
        </el-form-item>
        <el-form-item label="活动门店" prop="store">
          <el-button type="text" @click="addBranch">添加门店</el-button>
          <div class="branch-list">
            <div class="branch-item" v-for="(item, i) in ruleForm.store" :key="i">
              <el-input v-model="item.name" style="width: 40%" class="mr10" placeholder="门店名称"></el-input>
              <el-input v-model="item.address" class="mr10" placeholder="门店地址"></el-input>
              <el-button type="text" @click="deleteBranch(i)" icon="el-icon-delete">删除</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="抽奖次数" prop="store">
          <el-input v-model="ruleForm.draw_count" placeholder="请输入抽奖次数"></el-input>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-radio v-model="ruleForm.status" label="1">进行中</el-radio>
          <el-radio v-model="ruleForm.status" label="2">已结束</el-radio>
        </el-form-item>
        <el-form-item label="活动背景图片" prop="background">
          <el-button @click="pickerBg">选择图片</el-button>
          <br />
          <el-image
            class="bg-img"
            v-if="ruleForm.background"
            :preview-src-list="[imageBaseUrl + ruleForm.background]"
            :src="imageBaseUrl + ruleForm.background"
            alt=""
          />
        </el-form-item>
        <el-form-item label="活动头部logo" prop="logo">
          <el-button @click="pickerLogo">选择图片</el-button>
          <br />
          <el-image
            class="logo-img"
            v-if="ruleForm.logo"
            :preview-src-list="[imageBaseUrl + ruleForm.logo]"
            :src="imageBaseUrl + ruleForm.logo"
            alt=""
          />
        </el-form-item>
        <el-form-item label="活动底部信息" prop="footImage">
          <el-button @click="pickerFootImage">选择图片</el-button>
          <br />
          <el-image
            class="foot-img"
            v-if="ruleForm.footImage"
            :preview-src-list="[imageBaseUrl + ruleForm.footImage]"
            :src="imageBaseUrl + ruleForm.footImage"
            alt=""
          />
          
        </el-form-item>
        <el-form-item label="奖品信息">
          <div class="prize-list">
            <table class="prize-list-table w100">
              <tr>
                <th>奖品名称</th>
                <th>奖品概率</th>
                <th>奖品库存</th>
                <th>奖品图片</th>
                <th>兑奖图片</th>
                <th>操作</th>
              </tr>
              <tr v-for="(prize, index) in prizes" :key="index">
                <td width="200">
                  <el-input v-model="prize.prize_name" placeholder="奖品名称"></el-input>
                </td>
                <td width="120">
                  <el-input v-model="prize.win_probability" placeholder="奖品概率"></el-input>
                </td>
                <td width="120">
                  <el-input v-model="prize.stock" placeholder="奖品库存"></el-input>
                </td>
                <td align="center">
                  <div class="image-box" @click="addPrizeImage(prize, index)">
                    <i class="el-icon-upload2" v-if="!prize.prize_image"></i>
                    <img v-else :src="imageBaseUrl + prize.prize_image" alt="" />
                  </div>
                </td>
                <td align="center">
                  <div class="image-box" @click="addRedemptImage(prize, index)">
                    <i class="el-icon-upload2" v-if="!prize.redemption_image"></i>
                    <img v-else :src="imageBaseUrl + prize.redemption_image" alt="" />
                  </div>
                </td>
                <td align="center" width="80">
                  <el-button type="text" icon="el-icon-delete" @click="removePrize(index)">删除</el-button>
                </td>
              </tr>
            </table>
            <div class="pl10">
              <el-button @click="addPrize">添加奖品</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button :loading="subLoading" type="primary" @click="submitForm('ruleForm')">
            {{ activeId ? "立即修改" : "立即创建" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <ImagePicker :visible.sync="imagePickerVisible" :imagePickerOpt="imagePickerOpt" @confirm="imageConfirm" />
  </div>
</template>

<script>
import request from "@/utils/request";
import ImagePicker from "@/components/ImagePicker";
import { imageBaseUrl } from "@/utils/url";

export default {
  data() {
    return {
      imageBaseUrl,
      loading: false,
      subLoading: false,
      ruleForm: {
        name: "",
        title: "",
        store: [],
        background: "",
        logo: "",
        footImage: "",
        draw_count: "",
        status: "1",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入活动标题", trigger: "blur" }],
        store: [{ required: true, message: "请输入活动门店", trigger: "blur" }],
        draw_count: [{ required: true, message: "请输入抽奖次数", trigger: "blur" }],
        logo: [{ required: true, message: "请选择logo", trigger: "change" }],
        background: [{ required: true, message: "请选择背景图片", trigger: "change" }],
      },
      prizes: [
        {
          prize_name: "",
          prize_image: null,
          redemption_image: null,
          stock: 0,
          win_probability: 0,
        },
      ],
      imagePickerVisible: false,
      imagePickerOpt: {},
    };
  },
  computed: {
    activeId() {
      return this.$route.query.id;
    },
  },
  components: {
    ImagePicker,
  },
  created() {
    if (this.activeId) {
      this.getActInfo();
    }
  },
  methods: {
    addBranch() {
      this.ruleForm.store.push({
        name: "",
        address: "",
      });
    },
    deleteBranch(i) {
      this.ruleForm.store.splice(i, 1);
    },
    getActInfo() {
      this.loading = true;
      request("/activity/" + this.activeId + "?type=1").then((res) => {
        this.loading = false;
        const storeArr = res.store.split(",").map((item) => {
          const store = item.split("-");
          return {
            name: store[0],
            address: store[1],
          };
        });

        console.log(storeArr);

        this.ruleForm = {
          name: res.name,
          title: res.title,
          store: storeArr,
          logo: res.logo,
          draw_count: res.draw_count,
          background: res.background,
          footImage: res.footImage,
          status: res.status,
        };
        this.prizes = res.prizes;
      });
    },
    addPrizeImage(item, index) {
      this.imagePickerVisible = true;
      this.imagePickerOpt = {
        index,
        type: "prize_image",
      };
    },
    addRedemptImage(item, index) {
      this.imagePickerVisible = true;
      this.imagePickerOpt = {
        index,
        type: "redemption_image",
      };
    },
    pickerBg() {
      this.imagePickerVisible = true;
      this.imagePickerOpt = {
        type: "background",
      };
    },
    pickerLogo() {
      this.imagePickerVisible = true;
      this.imagePickerOpt = {
        type: "logo",
      };
    },
    pickerFootImage() {
      this.imagePickerVisible = true;
      this.imagePickerOpt = {
        type: "footImage",
      };
    },
    addPrize() {
      this.prizes.push({ prize_name: "", prize_image: null, redemption_image: null, win_probability: 0, stock: 0 });
    },
    removePrize(index) {
      this.prizes.splice(index, 1);
    },
    imageConfirm(imgArr, { index, type }) {
      const img = imgArr[0];
      if (index !== undefined) {
        this.prizes[index][type] = img;
      } else {
        this.$set(this.ruleForm, type, img);
      }
      this.imagePickerVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let storeStr = "";
          this.ruleForm.store.forEach((item) => {
            storeStr += `${item.name}-${item.address},`;
          });
          let params = {
            ...this.ruleForm,
            store: storeStr.slice(0, -1),
            prizes: this.prizes,
          };
          const activeId = this.activeId;
          this.subLoading = true;
          if (activeId) {
            request.put("/activity/" + activeId, params).then((res) => {
              this.subLoading = false;
              if (res.code == 200) {
                this.$message.success("修改成功");
                this.$router.replace("/actlist/index");
              } else {
                this.$message.error(res.error);
              }
            });
          } else {
            request.post("/create-activity", params).then((res) => {
              this.subLoading = false;
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.$router.replace("/actlist/index");
              } else {
                this.$message.error(res.error);
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.act-item {
  .bg-img {
    width: 50px;
    margin-top: 8px;
  }
  .logo-img {
    width: 50px;
    margin-top: 8px;
  }
  .foot-img {
    width: 50px;
    margin-top: 8px;
  }
  .prize-list-table {
    td {
      padding: 4px 8px;
      .image-box {
        cursor: pointer;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover i {
          color: #1890ff;
        }
        i {
          font-size: 24px;
        }
        img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
      }
    }
  }
  .branch-list {
    .branch-item {
      display: flex;
      margin-bottom: 12px;
    }
  }
}
</style>
