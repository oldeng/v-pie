import '../extend/index'

import CRender from '../../c-render'

import { deepClone } from '../../c-render/plugin/util'

import { pie, legend, mergeColor, title, grid, } from '../core'

export default class Charts {
  constructor (dom) {
    if (!dom) {
      console.error('Charts Missing parameters!')

      return false
    }

    const { clientWidth, clientHeight } = dom

    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', clientWidth)
    canvas.setAttribute('height', clientHeight)

    dom.appendChild(canvas)

    const attribute = {
      container: dom,
      canvas,
      render: new CRender(canvas),
      option: null
    }

    Object.assign(this, attribute)
  }
}

/**
 * @description Set chart option
 * @param {Object} option Chart option
 * @return {Undefined} No return
 */
Charts.prototype.setOption = function (option) {
  if (!option || typeof option !== 'object') {
    console.error('setOption Missing parameters!')

    return false
  }

  const optionCloned = deepClone(option, true)

  mergeColor(this, optionCloned)

  grid(this, optionCloned)


  title(this, optionCloned)


  pie(this, optionCloned)


  legend(this, optionCloned)

  this.option = option

  this.render.launchAnimation()

}

/**
 * @description Resize chart
 * @return {Undefined} No return
 */
Charts.prototype.resize = function () {
  const { container, canvas, render, option } = this

  const { clientWidth, clientHeight } = container

  canvas.setAttribute('width', clientWidth)
  canvas.setAttribute('height', clientHeight)

  render.area = [clientWidth, clientHeight]

  this.setOption(option)
}