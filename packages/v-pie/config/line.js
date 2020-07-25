export default {
    name: 'polyline',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
        points: []
    },
    index:-1,
    style: {
      stroke: '',
      shadowBlur: 0,
      lineWidth: 2,
      shadowColor: '#66eece',
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0 })
    }
  }