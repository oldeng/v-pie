<template>
  <div ref="contaner" class="pie"></div>
</template>
<script>
import Pie from "./lib";
export default {
  name: "VPie",
  methods: {
    setOption (option) {
      this.pie.setOption(option);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.pie = new Pie(this.$refs['contaner'])
    });
  }
};
</script>
<style lang="less" scopped>
.pie {
  width: 100%;
  height: 100%;
}
</style>