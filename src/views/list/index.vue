<template>
  <div class="app-container">
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="处方名称" width="180"> </el-table-column>
        <el-table-column prop="eayWay" label="服用" width="180"> </el-table-column>
        <el-table-column prop="frequency" label="频次"> </el-table-column>
        <el-table-column label="剂量">
          <template slot-scope="scope">
            <span>{{ scope.row.dose }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位"> </el-table-column>
        <el-table-column label="疗程">
          <template slot-scope="{row}">
            <span @click="row.editcure=true" v-show="!row.editcure">{{ row.cure }}天</span>
            <el-input v-show="row.editcure" v-model="row.cure" @blur="cureBlur(row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    cureBlur(item){
      item.editcure = false
    },
    getList() {
      this.tableData = [];
      for (let i = 0; i < 10; i++) {
        this.tableData.push({
          name: "麝香关节止痛膏",
          eayWay: "口服",
          frequency: "每天2次",
          dose: "0.25g", // 剂量
          unit: 1, // 单位
          cure: 1, // 疗程
          count: 1, // 数量
          editcure: true
        });
      }
    },
    deleteHandle() {},
  },
};
</script>

<style></style>
