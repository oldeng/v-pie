export default {
    animation: false,
    name: "总数",
    colors: ["#00C170", "red", "#3474FF", "#FF9800"],//#FF4447
    img: './imgs/car-blue.svg',
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
        inner: 100,
        outer: 100,
        lineWidth: 14
    },
    guidLine: {
        fontSize: 20,
        text: {
            color:'#ffffff'
        }
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