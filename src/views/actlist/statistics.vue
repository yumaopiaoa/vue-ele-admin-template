<template>
  <div class="statistics app-container">
    <el-card>
      <el-descriptions title="活动信息" size="large" :column="2" border>
        <el-descriptions-item label="活动名称">{{ actInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="活动门店">{{ actInfo.store }}</el-descriptions-item>
        <el-descriptions-item label="浏览人数">{{ actInfo.unique_view_count }}</el-descriptions-item>
        <el-descriptions-item label="浏览量">
          {{ actInfo.view_count }}
        </el-descriptions-item>
        <el-descriptions-item label="中奖人数">{{ numberWinners }}</el-descriptions-item>
        <el-descriptions-item label="中奖统计">
          <div v-for="(item, i) in expData" :key="i">
            <span class="mr6"> 奖品名称:{{ item.prizeKey }} </span>
            <span class="mr6"> 中奖次数:{{ item.totalWinners }}次 </span>
            <span> 领奖人数:{{ item.totalRecipients }}人 </span>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="el-descriptions__title s-title">
        <div class="h-l"></div>
        <div class="h-r">
          <el-form :inline="true">
            <el-form-item label="中奖日期">
              <el-date-picker
                style="width: 240px;"
                v-model="queryForm.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否中奖">
              <el-select clearable style="width: 150px;" v-model="queryForm.winFlag" placeholder="是否中奖">
                <el-option label="已中奖" value="1"></el-option>
                <el-option label="未中奖" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否领奖">
              <el-select clearable style="width: 150px;" v-model="queryForm.recFlag" placeholder="是否点击领奖">
                <el-option label="未点击领奖" value="0"></el-option>
                <el-option label="已点击领奖" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
              <el-button icon="el-icon-download" type="primary" @click="exportData">数据导出</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table size="large" :loading="loading" :data="winLog" style="width: 100%">
        <el-table-column prop="openid" label="中奖用户" min-width="260"> </el-table-column>
        <el-table-column prop="prize_name" label="奖励"> </el-table-column>
        <el-table-column prop="win_time" label="中奖时间"> </el-table-column>
        <el-table-column prop="is_rec" label="是否点击领奖"> </el-table-column>
      </el-table>
      <div class="page mt12 text-right">
        <el-pagination
          layout="prev, pager, next"
          @current-change="pageChange"
          :current-page.sync="queryForm.p"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import { formatDate } from "@/utils/tools";

export default {
  data() {
    return {
      loading: false,
      actInfo: {},
      expData: [],
      winLog: [],
      total: 50,
      numberWinners: 0,
      queryForm: {
        p: 1,
        winFlag: "",
        recFlag: "",
        date: [],
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    activeId() {
      return this.$route.query.id;
    },
  },
  methods: {
    getData() {
      this.loading = true;
      request
        .get("/activities/statistics/" + this.activeId, {
          params: this.queryForm,
        })
        .then((res) => {
          this.loading = false;
          if (res.code === 200) {
            this.actInfo = res.activity;
            this.expData = res.expData;
            this.winLog = res.winLog.map((item) => {
              return {
                ...item,
                win_time: formatDate(item.win_time),
                is_rec: item.is_rec == 0 ? "否" : "是",
              };
            });
            this.total = res.totalWinLog;
            this.numberWinners = res.numberWinners;
          }
        });
    },
    onQuery() {
      this.queryForm.p = 1;
      this.getData();
    },
    pageChange(e) {
      this.getData();
    },
    async exportData() {
      const activityId = this.activeId;
      const exportUrl = `/api/activities/statistics/${activityId}/export`;

      const requestBody = {
        winFlag: this.queryForm.winFlag,
        recFlag: this.queryForm.recFlag,
        date: this.queryForm.date,
      };

      try {
        const response = await fetch(exportUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          this.$message.error("导出失败" + errorData);
          return;
        }

        const blob = await response.blob();

        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = `数据统计.xlsx`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.s-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 16px;
}
</style>
