<template>
  <div class="app-container">
    <el-card>
      <div class="handle-area mb16">
        <el-button type="primary" @click="add">新增活动</el-button>
      </div>
      <el-table size="large" v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="活动名称"> </el-table-column>
        <el-table-column prop="actUrl" label="活动链接" width="300"> </el-table-column>
        <el-table-column prop="store" label="活动门店" min-width="120"></el-table-column>
        <el-table-column prop="status" label="活动状态"> </el-table-column>
        <el-table-column prop="view_count" label="浏览量"> </el-table-column>
        <el-table-column prop="unique_view_count" label="浏览人数"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="tj(scope.row)">统计</el-button>
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
            <el-button type="text" @click="copy(scope.row)">复制活动</el-button>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: false,
      page: {},
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;

      request("/activities").then((res) => {
        this.loading = false;
        if (res.code != 500) {
          this.tableData = res.map((item) => {
            return {
              ...item,
              actUrl: "http://lottemp.houkeyun.com/lottery?id=" + item.id,
              status: item.status == 1 ? "进行中" : "已结束",
            };
          });
        }
      });
    },
    add() {
      this.$router.push({
        path: "/actlist/act_item",
      });
    },
    edit(item) {
      this.$router.push({
        path: "/actlist/act_item?id=" + item.id,
      });
    },
    tj(item) {
      this.$router.push({
        path: "/actlist/act_statistics?id=" + item.id,
      });
    },
    copy(item) {
      this.$confirm("确认复制活动吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.post("/copy-activity/" + item.id).then((res) => {
            if (res.code === 200) {
              this.$message.success("复制成功");
              this.getList();
            } else {
              this.$message.error(res.error || "复制失败");
            }
          });
        })
        .catch(() => {});
    },
    del(item){
      this.$confirm("确认删除活动吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.post("/delete-activity/" + item.id).then((res) => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              this.getList();
            } else {
              this.$message.error(res.error || "复制失败");
            }
          });
        })
        .catch(() => {});
    }
  },
};
</script>

<style></style>
