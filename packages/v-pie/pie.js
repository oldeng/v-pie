
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

function deepMerge(target, merged) {
    for (var key in merged) {
        target[key] = target[key] && typeof target[key] === 'object' ?
            deepMerge(target[key], merged[key]) : target[key] = merged[key]
    }

    return target
}

import CRender from '@jiaminghi/c-render';
import SectorConfig from './config/sector';
import LableLineConfig from './config/line';
import TextConfig from './config/text';

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

        //道引线点位
        this.points = [];
    }

    static init(dom) {
        let pie = new Pie();
        pie._init(dom);

        return pie;
    };

    calcSum() {
        this.sum = 0;
        this.options.data.forEach(item => {
            this.sum += item.value;
        });
        console.log(this.sum);
    }
    calcSectors() {
        this.sectors = [];
        let start = 0;
        let end = 0;
        this.options.data.forEach((item, index) => {
            index === 0 ? start = 0 : start = this.sectors[index - 1].end;
            end = start + 2 * Math.PI * item.value / this.sum;

            this.sectors.push({
                name: item.name,
                start: start,
                mid: (start + end) / 2,
                end: end
            })
        });
        console.log('sectors = ', this.sectors);
    }

    setOptions(options) {
        this.options = JSON.parse(JSON.stringify(options));
        //扇区配置
        this.sectorConfig = JSON.parse(JSON.stringify(SectorConfig));
        //导引线配置
        this.lableLineConfig = JSON.parse(JSON.stringify(LableLineConfig));

        this.calcSum();
        this.calcSectors();
        this.render.delAllGraph();
        // if (!this.graphics) {
            //合并options和sectorconfig
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
                console.log('config', config);
                if (!this.graphics) {
                    this.graphics = [];
                }
                this.graphics.push(config);
                this.drawLableLine(sector, index);
                this.render.add(config);

            });
            // this.render.launchAnimation();
            //
        // } else {
        //     this.sectors.forEach((sector, index) => {
        //         console.log('this--->', this);
        //         let graphic = this.render.graphs[index];
        //         if (graphic) {
        //             graphic.animation('shape', {
        //                 startAngle: sector.start,
        //                 endAngle: sector.end
        //             })
        //         }
        //     });
        // }
    }

    drawLableLine(sector , index) {
        let x0 = this.width / 2;
        let y0 = this.height / 2;
        let x1 = Math.floor(x0 + 80 * Math.cos(sector.mid));
        let y1 = Math.floor(y0 + 80 * Math.sin(sector.mid));

        let x2 = Math.floor(x0 + 100 * Math.cos(sector.mid));
        let y2 = Math.floor(y0 + 100 * Math.sin(sector.mid));
        let lableLine = JSON.parse(JSON.stringify(LableLineConfig));

        let x3 = x0;
        let y3 = y0;
        if (x1 > x0 || x2 > x0) {
            x3 = x2 + 15;
            y3 = y2;
        } else {
            x3 = x2 - 15;
            y3 = y2;
        }
        this.points[index] = [
            [x1, y1],
            [x2, y2],
            [x3, y3]
        ];
        let lable = JSON.parse(JSON.stringify(lableLine))
        let config = deepMerge(lable, {
            shape: {
                points: [
                    [x1, y1],
                    [x2, y2],
                    [x3, y3]
                ],
            },
            style: {
                stroke: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            }
        });
        // this.graphics.push(config);
        this.render.add(config);
        this.drawText(sector.name);
    }

    drawText (text) {

        this.points.forEach(points => {
            if (points[2]) {
                let config = deepMerge(TextConfig, {
                    shape: {
                        content: text,
                        position: points[2]
                    },
                    style: {
                        textAlign: points[2][0] > this.width / 2 ? 'left' : 'right'
                    }
                })
                this.render.add(config);
            } else {
                throw Error('lable potin empty');
            }
        })
    }
}