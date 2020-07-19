
function throttle(callback) {
    let timer = null;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, 30)
        }
    }
}

function getPixelRatio(context) {
    let backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};

function deepMerge (target, merged) {
    for (var key in merged) {
      target[key] = target[key] && typeof target[key] === 'object' ?
        deepMerge(target[key], merged[key]) : target[key] = merged[key]
    }
  
    return target
  }

import CRender from '@jiaminghi/c-render';
import SectorConfig from './config/sector';

console.log(SectorConfig);

export default class Pie {
    constructor() {
        this.x = 0;
        this.y = 0;
        //圆半径
        this.r = 50;
        this.width = 100;
        this.height = 100;
        this.ctx = null;
        //data数值总和
        this.sum = 0;
        //初始化数据自增步进
        this.step = 0;
        //初始化step为总数的十分之一
        this.speed = 1 / 10000;
        //初始鼠标位置
        this.pos = {
            x: 0,
            y: 0
        };
        //动画开关
        this.animation = true;
        //动画百分比
        this.animationPercent = 100;
        //当前动画百分比
        this.currentAnimationPercent = 0;


    }

    _init(dom) {
        if (!dom) {
            return;
        }
        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        let ratio = getPixelRatio(canvas);
        this.width = dom.offsetWidth;
        this.height = dom.offsetHeight;
        canvas.width = this.width;
        canvas.height = this.height;
        dom.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        this.render = new CRender(canvas);
    }

    static init(dom) {
        let pie = new Pie();
        pie._init(dom);
        return pie;
    };

    calcSum () {
        this.sum = 0;
        this.options.data.forEach(item => {
            this.sum += item.value;
        });
        console.log(this.sum);
    }
    calcSectors () {
        this.sectors = [];
        let start = 0;
        let end = 0;
        this.options.data.forEach((item, index) => {
            index === 0 ? start = 0 : start = this.sectors[index-1].end;
            end = start + 2 * Math.PI * item.value / this.sum;
            

            this.sectors.push({
                start: start,
                end: end
            })
        });
        console.log('sectors = ', this.sectors);
    }

    setOptions(options) {
        this.options = JSON.parse(JSON.stringify(options));
        this.sectorConfig = JSON.parse(JSON.stringify(SectorConfig));
        //合并options和sectorconfig
        this.calcSum();
        this.calcSectors();
        this.sectors.forEach((sector, index) => {
            let config = deepMerge(SectorConfig, {
                style: {
                    fill: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                    shadowBlur: 0,
                    rotate: 0,
                    shadowColor: '#66eece',
                    hoverCursor: 'pointer'
                },
                shape: {
                    rx: this.width / 2,
                    ry: this.height / 2,
                    r: 80,
                    startAngle: sector.start,
                    endAngle: sector.end
                  },
            })
            console.log('config',config);
            this.render.add(config);
        });
        
    }









    clear() {
        this.ctx.clearRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    };
    //画图
    render(options, type) {

    };
}