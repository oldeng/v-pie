const option1 = {
  title: {
    text: '样式一',
    style: {
      fontSize: 18,
      fill: '#ffffff',
    },
  },
  hover: true,
  drag: true,
  series: [
    {
      type: 'pie',
      radius: '40%',
      center: ['50%', '50%'],
      data: [
        {
          name: 'A', value: 93,
        },
        { name: 'B', value: 32 },
        { name: 'C', value: 65 },
        { name: 'D', value: 44 },
        { name: 'E', value: 52 },
      ],
      insideLabel: {
        show: true,
        style: {
          fill: 'rgba(30, 30, 30, 1)',
          fontSize: 20
        },
      },
      outsideLabel: {
        show: true,
        style: {
          fontSize: 20
        },
      }
    }
  ]
}

const option2 = {
  title: {
    text: '样式二',
    style: {
      fill: '#ffffff'
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '50%'],
      data: [
        { name: 'A', value: 93 },
        { name: 'B', value: 32 },
        { name: 'C', value: 65 },
        { name: 'D', value: 44 }
      ],
      insideLabel: {
        show: true,
        style: {
          fill: 'rgba(30, 30, 30, 1)',
          fontSize: 18
        },
      },
      outsideLabel: {
        show: true,
        style: {
          fontSize: 20
        },
      }
    }
  ]
}

const option3 = {
  title: {
    text: '样式三',
    style: {
      fill: '#ffffff'
    },
  },
  legend: {
    data: ['图例一', '图例二'],
    orient: 'vertical'
  },
  series: [
    {
      name: '系列一',
      type: 'pie',
      data: [
        { name: 'chartjs-oldeng', value: 93 },
        { name: 'echarts', value: 32 },
        { name: 'charts', value: 65 },
        { name: 'crender', value: 44 },
        { name: 'ransition', value: 52 },
      ],
      radius: '30%',
      outsideLabel: {
        show: false
      },
      insideLabel: {
        show: true,
        style: {
          fill: 'rgba(30, 30, 30, 1)',
          fontSize: 18
        },
      },
    },
    {
      name: '系列二',
      type: 'pie',
      data: [
        { name: 'chartjs-oldeng', value: 100 },
        { name: 'echarts', value: 88 },
        { name: 'charts', value: 23 },
        { name: 'crender', value: 54 },
        { name: 'ransition', value: 78 },
      ],
      radius: ['40%', '50%']
    }
  ]
}

const option4 = {
  title: {
    text: '样式4',
    style: {
      fill: '#ffffff'
    },
  },
  series: [
    {
      type: 'pie',
      data: [
        { name: 'echarts', value: 93 },
        { name: 'zrebder', value: 32 },
        { name: 'd3', value: 65 },
        { name: 'three', value: 44 },
        { name: 'mapbox', value: 52 },
      ],
      insideLabel: {
        show: true,
        style: {
          fill: 'rgba(30, 30, 30, 1)',
          fontSize: 20
        },
      },
      outsideLabel: {
        show: true,
        style: {
          // fill: 'rgba(30, 30, 30, 1)',
          fontSize: 20
        },
      },
      roseType: true
    }
  ]
}



export default [option1, option2, option3, option4]


