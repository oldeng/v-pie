export default {
    animation: true,
    name: "标题",
    colors: ["#00C170", "red", "#3474FF", "#FF9800"],//#FF4447
    fontColor: 'rgba(76,80,89,1)',
    title: {
        fontSize: 40,
        color: '#ffffff'
    },
    subTitle: {
        fontSize: 30,
        color: '#3C76E5'
    },
    radius: {
        inner: 80,
        outer: 80,
        lineWidth: 14
    },
    guidLine: {
        fontSize: 20,
        text: {
            color:'#ffffff'
        }
    },
    icon: {
        show: false,
        offset: {
            top: 0,
            left:0,
        },
        width: 50,
        height: 50,
        url: 'car.svg'
    },
    data: [
        {
            name: "汉字A",
            value: 100 //Math.floor(Math.random() * 100)
        },
        {
            name: "汉字B",
            value: 100 //Math.floor(Math.random() * 100)
        },
        {
            name: "汉字C",
            value: 100 //Math.floor(Math.random() * 100)
        },
        {
            name: "汉字D",
            value: 100 //Math.floor(Math.random() * 100)
        }
    ]
}