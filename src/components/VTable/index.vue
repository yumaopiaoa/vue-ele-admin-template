<template>
  <div class="v__table">
    <el-table
      :data="tableData"
      @cell-click="cellClick"
      :border="border"
    >
      <!-- 序号 -->
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (page.current - 1) * page.size + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 列表项 -->
      <el-table-column
        v-for="(item, index) in tableOption"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align || 'center'"
        :show-overflow-tooltip="item.overHidden || true"
      >
        <template slot-scope="scope">
          <slot
            v-if="item.slot"
            :name="scope.column.property"
            :row="scope.row"
            :$index="scope.$index"
          />
          <span v-else>{{ scope.row[scope.column.property] }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column v-if="operation" label="操作" align="center">
        <template slot-scope="scope">
          <slot name="menu" :row="scope.row" :$index="scope.$index" />
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <Pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="pageChange"
      />
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import Pagination from "../Pagination";

export default {
  name: "vTable",
  components: {
    Pagination,
  },
  props: {
    // 是否设置序号，默认设置
    index: {
      type: Boolean,
      default: function() {
        return true;
      },
    },
    // 是否设置边框，默认不要
    border: {
      type: Boolean,
      default: function() {
        return false;
      },
    },
    // 是否有操作列，默认无
    operation: {
      type: Boolean,
      default: function() {
        return false;
      },
    },
    // 列表数据
    tableData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 表头
    tableOption: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 分页
    page: {
      type: Object,
      default: function() {
        return {
          total: 0,
          current: 1,
          page: 10,
        };
      },
    },
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    // 
    pageChange() {
      this.$emit("page-change");
    },
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", { row, column, cell, event });
    },
  },
};
</script>

<style scoped lang="scss">
.v__table {
  width: 100%;
  .page-container {
    margin-top: 16px;
    text-align: right;
  }
}
</style>
