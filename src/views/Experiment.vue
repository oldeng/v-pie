<template>
  <div class="home">
    <div>
      <van-button type="danger" @click="refresh">更新数据</van-button>
    </div>
    <div class="demo-bock">
      <v-pie ref="pie1" class="pie"></v-pie>
    </div>
    <div class="demo-bock">
      <v-pie ref="pie2" class="pie"></v-pie>
    </div>
    <div class="demo-bock">
      <v-pie ref="pie3" class="pie"></v-pie>
    </div>
  </div>
</template>

<script>
//导入饼状图组件
import { VPie } from "../../dist/v-pie.umd.js";
//导入样式
import   "../../dist/v-pie.css";
//导入配置文件
import Options from "./options.1";
export default {
  name: "Experiment",
  methods: {
    //刷新
    refresh() {
      Options[0].series[0].data = Options[1].series[0].data = Options[2].series[0].data = [
        {
          name: "汉字A",
          value: Math.floor(Math.random() * 100),
        },
        {
          name: "汉字B",
          value: Math.floor(Math.random() * 100),
        },
        {
          name: "汉字C",
          value: Math.floor(Math.random() * 100),
        },
        {
          name: "汉字D",
          value: Math.floor(Math.random() * 100),
        },
      ];
      this.pie1.setOption(Options[0]);
      this.pie2.setOption(Options[1]);
      this.pie3.setOption(Options[2]);
    },
  },
  mounted() {
    this.$nextTick(() => {
      //样式一
      this.pie1 = this.$refs["pie1"];
      this.pie1.setOption(Options[0]);
      //样式二
      this.pie2 = this.$refs["pie2"];
      this.pie2.setOption(Options[1]);
      //样式三
      this.pie3 = this.$refs["pie3"];
      this.pie3.setOption(Options[2]);
    });
  },
  components: {
    VPie,
  },
};
</script>
<style lang="less" scoped>
div {
  // box-sizing:content-box;
}
.home {
  // box-sizing: border-box;
  width: 1000px;
  margin: 0 auto;
  // border: 1px solid red;

  .demo-bock {
    width: 400px;
    height: 400px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    // border: 1px solid #ffffff;
    border-radius: 10px;
    float: left;
    // background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background: rgba(30, 30, 30, 1);
    .pie {
      width: 100%;
      height: 100%;
    }
  }
}

.home::after {
  content: "";
  display: block;
  clear: both;
}
</style>