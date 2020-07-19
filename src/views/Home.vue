<template>
  <div class="home">
    <div>
      <van-button type="danger" @click="refresh">更新数据</van-button>
    </div>
    <div class="demo-bock">
      <v-pie ref="demo1"></v-pie>
    </div>
    <div class="demo-bock">
      <v-pie ref="demo2"></v-pie>
    </div>
    <div class="demo-bock">
      <v-pie ref="demo3"></v-pie>
    </div>
    <div class="demo-bock">
      <v-pie ref="demo4"></v-pie>
    </div>
    <div class="demo-bock">
      <!-- <v-pie ref="demo4"></v-pie> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VPie from "../../packages/v-pie/index.vue";
import options from "./options";

export default {
  name: "Home",
  methods: {
    refresh() {
      this.options1.data = [
        {
          name: "汉字A",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字B",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字C",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字D",
          value: Math.floor(Math.random() * 100)
        }
      ];
      this.$refs["demo1"].setOptions(this.options1);

      this.options2.data = [
        {
          name: "汉字A",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字B",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字C",
          value: Math.floor(Math.random() * 100)
        },
        {
          name: "汉字D",
          value: Math.floor(Math.random() * 100)
        }
      ];
      //demo2
      this.$refs["demo2"].setOptions(this.options2);
      //demo3
      this.$refs["demo3"].setOptions(this.options3);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.options1 = JSON.parse(JSON.stringify(options));
      this.options2 = JSON.parse(JSON.stringify(options));
      this.options3 = JSON.parse(JSON.stringify(options));
      this.options4 = JSON.parse(JSON.stringify(options));
      //demo1
      this.options1.icon = undefined;
      this.$refs["demo1"].setOptions(options);

    });
  },
  components: {
    VPie
  }
};
</script>
<style lang="less" scoped>
.demo-bock {
  width: 360px;
  height: 360px;
  margin: 10px auto;
  border: 1px solid red;
  float: left;
}
</style>