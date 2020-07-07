<template>
  <div class="home">
    <h1>文档</h1>
    <h2>测试</h2>
    <div class="pie">
      <v-pie ref="online-pie"></v-pie>
    </div>
    <van-button type="danger" @click="refresh">更新数据</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { VPie } from '../../dist/v-pie.umd.js'
import options from '../../packages/v-pie/options';

export default {
  name: 'Docs',
  methods: {
    refresh () {
      options.data = [
        {
            name: "在线",
            value: Math.floor(Math.random() * 10000)
        },
                {
            name: "B",
            value: Math.floor(Math.random() * 10000)
        },
                {
            name: "C",
            value: Math.floor(Math.random() * 10000)
        },
        {
            name: "离线",
            value: Math.floor(Math.random() * 10000)
        }
    ];
      this.$refs["online-pie"].setOptions(options);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["online-pie"].setOptions(options);
    })
  },
  components: {
    VPie
  }
}
</script>
<style lang="less" scoped>
  .pie {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }
</style>