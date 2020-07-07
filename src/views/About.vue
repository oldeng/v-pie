<template>
  <div class="sector">
    <h1>画圆弧</h1>
    <div class="canvas">
      <canvas ref="sector1" width="200" height="200"></canvas>
    </div>
    <div class="canvas">
      <canvas ref="sector2" width="200" height="200"></canvas>
    </div>
    <div class="canvas">
      <canvas ref="pie" width="200" height="200"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    sector1() {
      let canvas = this.$refs["sector1"];
      let ctx = canvas.getContext("2d");
      //圆弧
      ctx.save();
      ctx.translate(100, 100);
      ctx.arc(0, 0, 100, 0, (30 * Math.PI) / 180);
      ctx.stroke();
      ctx.restore();
      //第一条线
      ctx.save();
      ctx.moveTo(100, 100);
      ctx.lineTo(200, 100);
      ctx.stroke();
      ctx.restore();
      //第二条线
      ctx.save();
      ctx.translate(100, 100);
      ctx.moveTo(0, 0);
      ctx.rotate((30 * Math.PI) / 180);
      ctx.lineTo(100, 0);
      ctx.stroke();
      ctx.fillStyle = 'red';
      // ctx.fill();
      ctx.restore();
    },
    sector2() {
      let canvas = this.$refs["sector2"];
      let ctx = canvas.getContext("2d");
      //将原点设置100,100位置
      ctx.translate(100, 100);
      //原点在100,100，则圆心设为0,0 ——> 100,100的位置
      ctx.arc(0, 0, 100, (30 * Math.PI) / 180, (60 * Math.PI) / 180);
      ctx.stroke();
      //save(),restore()是为了防止角度旋转的污染
      ctx.save();
      ctx.rotate((30 * Math.PI) / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();
      ctx.restore();
      ctx.rotate((60 * Math.PI) / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 0);
      ctx.stroke();
    },
    pie() {
      var canvas = this.$refs["pie"];
      var ctx = canvas.getContext("2d");
      var nums = [26, 15, 12, 5, 25, 17];
      var colors = [
        "#983335",
        "#77963f",
        "#5d437c",
        "#35859f",
        "#d1702f",
        "#365e96"
      ];
      var start = 0;
      var end = 0;
      ctx.translate(100, 100);
      //绘制圆饼
      function pieChart() {
        for (var i = 0; i < nums.length; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          end += (nums[i] / 50) * Math.PI; //终止角度
          ctx.strokeStyle = "white";
          ctx.fillStyle = colors[i];
          ctx.arc(0, 0, 100, start, end);
          ctx.fill();
          // ctx.closePath();
          ctx.stroke();
          start += (nums[i] / 50) * Math.PI; //起始角度
        }
      }
      //绘制圆饼上的数值
      function pieNum() {
        for (var i = 0; i < nums.length; i++) {
          start = ((nums[i] / 50) * Math.PI) / 2;
          ctx.rotate(end + start); //旋转数值
          ctx.font = "25px scans-serif";
          ctx.fillStyle = "#000";
          ctx.fillText(nums[i] + "%", 140, 0);
          end = ((nums[i] / 50) * Math.PI) / 2;
        }
      }
      ctx.rotate(-Math.PI / 6); //旋转一定角度更加自然
      pieChart();
      pieNum();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sector1();
      this.sector2();
      this.pie();
    });
  }
};
</script>
<style lang="less" scoped>
.sector {
  .canvas {
    position: relative;
    border: 1px solid #ffffff;
    width: 300px;
    height: 200px;
    margin: 10px auto;
  }
}
</style>
