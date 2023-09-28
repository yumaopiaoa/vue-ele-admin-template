<template>
  <div class="app-container temp-msg">
    <el-card>
      <el-table :data="tempMsgList">
        <el-table-column show-overflow-tooltip prop="template_id" label="模板id"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="title" label="标题"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="primary_industry" width="100" label="主行业"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="deputy_industry" width="100" label="副行业"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="example" label="示例"> </el-table-column>
        <el-table-column show-overflow-tooltip prop="content" label="内容"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openPushDialog(scope.row)">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="msgForm.title" :visible.sync="dialogVisible" width="800px">
      <div class="msg-content">
        <div class="msg-perview">
          <div class="msg-perview-inner">
            <div class="title">{{ msgForm.title }}</div>
            <div class="cell" v-for="(cell, i) in msgForm.msgList" :key="i">
              <span class="label">{{ cell.title }}</span>
              <span class="val">{{ cell.value }}</span>
            </div>
            <div class="preview-detail">
              查看详情
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
        <el-form :model="msgForm">
          <el-form-item label-width="100px" :label="item.key" v-for="item in msgForm.msgList" :key="item.key">
            <el-input v-model="item.value"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-form class="mt16">
        <el-form-item label="推送链接" label-width="80px">
          <el-input v-model="msgForm.url"></el-input>
        </el-form-item>
        <el-form-item label="推送用户" label-width="80px">
          <el-radio-group v-model="userType">
            <el-radio :label="1">全部用户</el-radio>
            <el-radio :label="2">指定用户</el-radio>
            <el-radio :label="3" disabled>指定标签</el-radio>
          </el-radio-group>
          <div class="push-user mt8">
            <template v-if="userType == 2">
              <el-input
                type="textarea"
                rows="5"
                v-model="touserArrStr"
                placeholder="请输入指定用户openid,多个用户请用回车分割"
              ></el-input>
            </template>
            <template v-if="userType == 3">
              <el-checkbox-group v-model="tagCheckArr">
                <el-checkbox :label="item.id" v-for="item in userTagArr" :key="item.id">
                  {{ item.name }} ({{ item.count }}人)</el-checkbox
                >
              </el-checkbox-group>
            </template>
          </div>
        </el-form-item>
      </el-form>
      <div class="send-log" style="max-height: 100px; overflow: auto" v-html="sendLogStr"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSendMsg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mpRequest from "@/utils/mpRequest";

function convertTemplateToFormat(template) {
  const lines = template.split("\n");
  const formatArray = [];

  for (const line of lines) {
    const matches = line.match(/\{\{([^}]+)\.DATA\}\}/);
    if (matches) {
      const key = matches[1];
      let title = "";

      if (line.includes("：")||line.includes(":")) {
        title = line.split("{{")[0].trim();
        formatArray.push({ key, title });
      }
    }
  }
  return formatArray;
}

export default {
  data() {
    return {
      tempMsgList: [], // 消息模板列表
      userTagArr: [], // 用户标签列表
      dialogVisible: false,
      userType: 1,
      // oSTaw0urYtmaIwv0D5lthImnlwQs\noSTaw0uQSFQYFFXHdPG-EsY1EL2A
      touserArrStr: "", // 推送的用户列表
      tagCheckArr: [], // 标签用户选中数组
      sendLogStr: "",
      msgForm: {
        template_id: "",
        title: "",
        msgList: [],
        url: "http://www.baidu.com",
      },
    };
  },
  created() {
    this.getTempMsgList();
    this.getUserTag();
  },
  methods: {
    getTempMsgList() {
      mpRequest({
        url: "/template/get_all_private_template",
        method: "GET",
        data: {},
      }).then((res) => {
        this.tempMsgList = res.template_list;
      });
    },
    getUserTag() {
      const url = "/tags/get";
      mpRequest({
        url,
        method: "GET",
      }).then((res) => {
        this.userTagArr = res.tags;
        console.log(res);
      });
    },
    openPushDialog(item) {
      let { content, template_id, title } = item;
      const result = convertTemplateToFormat(content);
      this.msgForm.msgList = result;
      this.msgForm.template_id = template_id;
      this.msgForm.title = title;

      this.dialogVisible = true;
      this.getUserTag();
    },
    sendMsgFn(touser, template_id, url, data) {
      mpRequest({
        url: "/message/template/send",
        method: "post",
        data: {
          touser,
          template_id,
          url,
          data,
        },
      })
        .then((res) => {
          if (res.errmsg == "ok") {
            this.sendLogStr += touser + "发送成功<br />";
          } else {
            this.sendLogStr += touser + "发送失败<br />";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async confirmSendMsg() {
      try {
        await this.$confirm("发送不可撤回，请确认无误在发送，确认发送吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        
        this.sendLogStr = ""
        let openidList = [
          // "oSTaw0urYtmaIwv0D5lthImnlwQs","oSTaw0uQSFQYFFXHdPG-EsY1EL2A"
        ];
        const { template_id, url, msgList } = this.msgForm;
        const data = {};
        for (const item of msgList) {
          data[item.key] = {
            value: item.value,
          };
        }

        // 全部用户
        if (this.userType == 1) {
          const userData = await mpRequest({ url: "/user/get" });
          openidList = userData.data.openid;
        } else if (this.userType == 2) {
          // 指定用户
          openidList = this.touserArrStr.split("\n");
        } else if (this.userType == 3) {
          // 标签用户
        }
        openidList.forEach((item) => {
          this.sendMsgFn(item, template_id, url, data);
        });
      
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.temp-msg {
  .msg-content {
    display: flex;
    .msg-perview {
      margin-right: 16px;
      flex: 1;
      background: #f5f5f5;
      border-radius: 5px;
      padding: 12px;
      .msg-perview-inner {
        background: #fff;
        padding: 16px;
        border-radius: 5px;
        .title {
          color: #000;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .cell {
          margin-bottom: 8px;
          display: flex;
          .label {
            width: 100px;
            color: #3c3c3c;
            margin-right: 12px;
          }
          .val {
            flex: 1;
            color: #1a1a1a;
          }
        }
        .preview-detail {
          border-top: 1px solid #eee;
          padding-top: 12px;
          margin-top: 12px;
          i {
            float: right;
          }
        }
      }
    }
    .el-form {
      flex: 1;
    }
  }
}
</style>
