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
      this.$refs["demo1"].setOptions(this.options1);
      this.options2.radius.inner = 80;
      this.options2.radius.outer = 100;
      //demo2
      this.options2.icon = undefined;
      this.$refs["demo2"].setOptions(this.options2);
      //demo3
      this.options3.radius.inner = 80;
      this.options3.radius.outer = 100;
      this.options3.icon.width = 40;
      this.options3.icon.height = 40;
      this.options3.icon.offset = {
        left: 15,
        top: 80
      };
      this.$refs["demo3"].setOptions(this.options3);

      //demo4
      this.options4.colors = ['red', 'blue', 'red', 'blue'];
      this.options4.radius.inner = 60;
      this.options4.radius.outer = 80;
      this.options4.icon = undefined;
      this.options4.data.splice(2);
      this.options4.data[0].value = 100;
      this.options4.data[1].value = 300;
      this.options4.data[0].gradient = ['red', 'blue'];
      this.$refs["demo4"].setOptions(this.options4);
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