<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import { oneOf } from "@/utils/tools";
export default {
  name: "Editor",
  props: {
    value: {
      type: String,
      default: "",
    },
    /**
     * 绑定的值的类型, enum: ['html', 'text']
     */
    valueType: {
      type: String,
      default: "html",
      validator: (val) => {
        return oneOf(val, ["html", "text"]);
      },
    },
    /**
     * @description 设置change事件触发时间间隔
     */
    changeInterval: {
      type: Number,
      default: 200,
    },
    /**
     * @description 是否开启本地存储
     */
    cache: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    editorId() {
      return `editor${this._uid}`;
    },
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val);
    },
  },
  mounted() {
    this.editor = new Editor(`#${this.editorId}`);
    this.editor.config.zIndex = 99;
    this.editor.config.excludeMenus = ["fontName", "video", "undo", "redo"];
    this.editor.config.uploadImgServer = "/wangeditor_upload";
    this.editor.config.uploadImgMaxSize = 1 * 1024 * 1024 // 1M
    
    this.editor.config.onchange = (html) => {
      let text = this.editor.txt.text();
      if (this.cache) localStorage.editorCache = html;
      this.$emit("input", this.valueType === "html" ? html : text);
      this.$emit("on-change", html, text);
    };
    this.editor.config.onchangeTimeout = this.changeInterval;
    // create这个方法一定要在所有配置项之后调用
    this.editor.create();
    // 如果本地有存储加载本地存储内容
    let html = this.value || localStorage.editorCache;
    if (html) this.editor.txt.html(html);
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
  watch: {
    value(value) {
      if (!value) {
        this.editor.txt.clear();
      } else {
        this.editor.txt.html(value);
      }
    },
  },
};
</script>
