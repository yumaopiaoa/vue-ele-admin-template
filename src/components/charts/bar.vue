<template>
  <div
    ref="dom"
    class="charts chart-bar"
  ></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/utils/tools";
echarts.registerTheme("tdTheme", tdTheme);

export default {
  name: "ChartBar",
  props: {
    value: Object,
    text: String,
    subtext: String,
  },
  data() {
    return {
      dom: null,
    };
  },
  computed: {},
  methods: {
    resize() {
      this.dom.resize();
    },
    initEcharts() {
      let legend = this.value.seriesData.map((_) => _.name);

      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
        },
        grid: {
          top: this.subtext ? "85" : "60",
          left: 60,
          right: 40,
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ["bar", "line"] },
            saveAsImage: { show: true },
          },
        },
        legend: {
          show: false,
          data: legend,
        },
        xAxis: {
          type: "category",
          data: this.value.xAxisData,
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [...this.value.seriesData],
      };
      if (!this.dom) {
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
      }
      this.dom.setOption(option);
    },
    setOption(data) {
      let options = this.dom.getOption();
      options.series = data.seriesData;
      options.xAxis[0].data = data.xAxisData;
      this.dom.clear();
      this.dom.setOption(options);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
      on(window, "resize", this.resize);
    });
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (this.dom) {
          if (newVal) {
            this.setOption(newVal);
          } else {
            this.setOption(oldVal);
          }
        } else {
          this.initEcharts();
        }
      },
      deep: true,
    },
    "$store.state.app.sidebar.opened"(val, old) {
      setTimeout(() => {
        this.resize();
      }, 300);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
    this.dom.dispose(); // 销毁实例
    this.dom = null;
  },
};
</script>
