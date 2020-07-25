# 饼状图插件v-pie

#效果

#特性
1. 多种样式
2. 独立的渲染库
3. 独立的动画库
4. 轻量级源码，简洁易懂，可根据需求自定义改造


#参考资料

> 1. 基于charjs库代码裁剪，只保留了pie相关代码
  2. 渲染库为Crender
  3. 动画库为transition

> 详细资料请参考
http://charts.jiaminghi.com/
http://crender.jiaminghi.com/
http://transition.jiaminghi.com/

## 安装
```
npm install @oldeng/v-pie

```
# 使用

详情参考demo源码
```
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
```

#Github
https://github.com/oldeng/v-pie/tree/Crender

#Npm

