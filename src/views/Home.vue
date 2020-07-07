<template>
  <div class="home">
    <div class="pie">
      <v-pie ref="online-pie"></v-pie>
    </div>
    <van-button type="danger" @click="refresh">更新数据</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import VPie from "../../packages/v-pie/index.vue";
import options from "../../packages/v-pie/options";

export default {
  name: "Home",
  methods: {
    refresh() {
      options.data = [
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
      // options.data.push({
      //   name: Math.floor(Math.random() * 100),
      //   value: Math.floor(Math.random() * 100)
      // });
      this.$refs["online-pie"].setOptions(options);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["online-pie"].setOptions(options);
    });
  },
  components: {
    VPie
  }
};
</script>
<style lang="less" scoped>
.pie {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid red;
}
</style>