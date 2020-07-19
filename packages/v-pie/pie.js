
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
        this.ctx = canvas.getContext("2d");
        // this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.width, this.height);
        //添加canvas节点
        dom.appendChild(canvas);
        //定点圆心
        this.ctx.translate(this.width / 2, this.height / 2);
        var _this = this;
        //绑定事件
        //绑定事件
        let callback = throttle(() => {
            debugger;
            this.render(this.options, 'mouse');
        });
        canvas.addEventListener('mousemove', function (event) {
            _this.pos = _this.getEventPosition(event);
            callback();
        });
    }

    static init(dom) {
        let pie = new Pie();
        pie._init(dom);
        return pie;
    };

    setOptions(options) {
        this.options = JSON.parse(JSON.stringify(options));
        this.animation = this.options.animation;
        this.currentAnimationPercent = 0;
        this.r = this.options.radius.outer;
        this.rLineWidth = this.options.radius.outer - this.options.radius.inner;
        this.fontColor = this.options.fontColor;
        this.img = options.img;
        this.internalInit();
        //计算数值总和
        this.computeSum();
        // this.computeStep();
        this.render(this.options);
    }

    internalInit() {
        //data总和
        if (!this.hasOwnProperty('sum')) {
            this.sum = 0;
        }
        //步进
        if (!this.hasOwnProperty('step')) {
            this.step = 1;
        }
        //缓存
        if (!this.hasOwnProperty('_options')) {
            this._options = JSON.parse(JSON.stringify(this.options))
        }
        //初始化缓存数据
        if (!this.hasOwnProperty('data')) {
            this.data = this._options.data;
            this.data.forEach((item, index) => {
                item.value = 0;
            });
        }
    }
    //计算data中每一项value的总和
    computeSum() {
        if (!!!this.options.data) {
            throw Error('options data is not defined');
        }
        //重置总和
        this.sum = 0;
        this.options.data.forEach((item) => {
            this.sum += item.value;
        });
    }
    //计算动画累加步进
    // computeStep () {
    //     this.step = Math.floor(this.sum * this.speed);
    //     if (this.step <= 0) {
    //         this.step = 1;
    //     }
    // }

    getEventPosition(event) {
        var x, y;
        if (event.layerX || event.layerX == 0) {
            x = event.layerX;
            y = event.layerY;
        } else if (event.offsetX || event.offsetX == 0) { // Opera
            x = event.offsetX;
            y = event.offsetY;
        }
        return {
            x: x,
            y: y
        };
    }

    ring(x, y, r, start, end, color, key) {
        this.ctx.save();
        this.ctx.beginPath();
        //空心
        if (this.rLineWidth > 0) {
            this.ctx.lineWidth = this.rLineWidth;
            if (this.key === key && !!this._r) {
                this.ctx.arc(x, y, this._r, start, end);
                this.key = null;
                this._r = null;
            } else {
                this.ctx.arc(x, y, r, start, end);
            }
            if (this.ctx.isPointInPath(this.pos.x, this.pos.y)) {
                // this.ctx.arc(x, y, r, start, end);
                this._r = r + 10;
                this.key = key;
            }
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        } else {//实心饼状图
            //实心必须将画笔移到圆心
            this.ctx.moveTo(x, y);
            this.ctx.fillStyle = color;
            this.ctx.arc(x, y, this.r, start, end);
            this.ctx.fill();
            if (this.ctx.isPointInPath(this.pos.x, this.pos.y) && key) {
                // this.ctx.arc(x, y, this.r + 10, start, end);
                // this.ctx.globalAlpha = 0.8;
                this.ctx.fillStyle = '#fffabc';
                this.ctx.arc(x, y, this.r + 10, start, end);
                this.ctx.fill();
                console.log('鼠标移入');
            } else {

            }

        }
        this.ctx.closePath();
        this.ctx.restore();
    };
    drawGuidLine(
        x0,
        y0,
        radius,
        startAngle,
        angle,
        color,
        text,
        fontSize,
        textColor
    ) {
        this.ctx.beginPath();
        this.ctx.save();
        let out = 10;
        let cAngle = (startAngle + angle) / 2;
        let x = x0 + (radius + 2) * Math.cos(cAngle);
        let y = y0 + (radius + 2) * Math.sin(cAngle);
        let x2 = x0 + (radius + 40) * Math.cos(cAngle);
        let y2 = y0 + (radius + 40) * Math.sin(cAngle);
        this.ctx.moveTo(x, y);
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(x2, y2);
        //默认字体大小
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        if (x2 > x) {
            x2 = x2 + 30;
            this.ctx.lineTo(x2, y2);
            let splited = text.split(/\n/);
            this.ctx.fillStyle = textColor;
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "left";
            splited.forEach((item, index) => {
                this.drawText(x2 + 20, y2 + index * 20, color, fontSize, item)
            });
        } else {
            x2 = x2 - 30;
            this.ctx.lineTo(x2, y2);
            let splited = text.split(/\n/);
            this.ctx.fillStyle = textColor;
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "right";
            splited.forEach((item, index) => {
                this.drawText(x2 - item.length * 5, y2 + index * 20, color, fontSize, item)
            });
        }
        if (this.ctx.isPointInPath(this.pos.x, this.pos.y)) {
        }
        this.ctx.stroke();
        this.ctx.restore();
    };

    //绘制文本
    drawText(x, y, color, fontSize, text) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.font = `${fontSize}px sans-serif`;
        if (this.ctx.isPointInPath(this.pos.x, this.pos.y)) {
        }
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    };
    //绘制图标
    drawImg(x, y, src) {
        let img = new Image();
        img.src = src;
        let offset = this.options.icon.offset;
        let width = this.options.icon.width;
        let height = this.options.icon.height;

        img.onload = function () {
            this.ctx.drawImage(img, x - offset.left, 
                y - offset.top, width, height);
        }.bind(this);
    }
    clearLable() {
        this.ctx.clearRect(-50, -25, 100, 100);
    };

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
        let data = options.data;
        let startAngle = 0;
        let endAngle = 0;
        let realEndAngle = 0;

        //清空
        this.clear();

        //绘制图标
        if (options.icon) {
            this.drawImg(0, 0, options.icon.url);
        }

        for (let i = 0; i < data.length; i++) {
            // (((map[key] / sum) * Math.PI) / 180) * 360;
            let offset = (((data[i].value / this.sum) * Math.PI) / 180) * 360;
            endAngle = startAngle + offset;
            realEndAngle = endAngle * this.currentAnimationPercent / this.animationPercent;
            //画扇区
            if (this.animation) {
                this.ring(0, 0, this.r, startAngle, realEndAngle, options.colors[i], type);
                //导引线
                this.drawGuidLine(0, 0, this.r, startAngle, realEndAngle, options.colors[i], data[i].name, options.guidLine.fontSize, options.guidLine.text.color);
                startAngle = realEndAngle;
            } else {
                this.ring(0, 0, this.r, startAngle, endAngle, options.colors[i], type);
                this.drawGuidLine(0, 0, this.r, startAngle, endAngle, options.colors[i], data[i].name, options.guidLine.fontSize, options.guidLine.text.color);
                startAngle = endAngle;
            }
        }
        this.drawText(0, -10, options.title.color, options.title.fontSize, options.name);
        this.drawText(0, 50, options.subTitle.color, options.subTitle.fontSize, this.sum.toString().replace(/(?!^)(?=(\d{3})+$)/g, ','));

        //开启动画
        if (this.currentAnimationPercent < this.animationPercent && this.animation) {
            this.currentAnimationPercent += 5;
            this.animator = requestAnimationFrame(function () {
                this.clear();//0, 0, this.width, this.height
                console.log(`执行动画${this.currentAnimationPercent}`);
                this.render(options);
            }.bind(this))
        } else {
            console.log(`停止动画`);
        }
    };
}