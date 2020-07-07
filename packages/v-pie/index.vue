<template>
  <div ref="contaner" class="pie"></div>
</template>
<script>
import Pie from "./pie";
export default {
  name: "VPie",
  methods: {
    setOptions (options) {
      this.pie.setOptions(options);
    },
  },
  mounted() {
    this.$nextTick(() => {
      var colors = ["rgba(239, 58, 113, 1)", "rgba(95, 222, 145, 1)"];
      this.pie = Pie.init(this.$refs['contaner']);
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