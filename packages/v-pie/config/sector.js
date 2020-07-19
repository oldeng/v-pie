export default {
  name: 'sector',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: 120,
    ry: 120,
    r: 80,
    startAngle: 0,
    endAngle: Math.PI / 3
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    rotate: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    console.log('mouseEnter');
    this.animation('shape', { r: 90 }, true);
    // endAngle: Math.PI,
    this.animation('style', { shadowBlur: 20, lineWidth: 30 })
  },
  mouseOuter (e) {
    console.log('mouseEnter');
    this.animation('shape', { r: 80 }, true)
    this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
  }
}