import VPie from './v-pie/index.vue';

const components = [
    VPie
]

export {
    VPie
}

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
