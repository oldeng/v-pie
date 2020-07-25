import { colorConfig } from './color'

import { gridConfig } from './grid'

import { titleConfig } from './title'



import { pieConfig } from './pie'




import { legendConfig } from './legend'

import { deepMerge } from '../util'

const allConfig = {
  colorConfig,
  gridConfig,
  titleConfig,
  pieConfig,
  legendConfig
}

/**
 * @description Change default configuration
 * @param {String} key          Configuration key
 * @param {Object|Array} config Your config
 * @return {Undefined} No return
 */
export function changeDefaultConfig (key, config) {
  if (!allConfig[`${key}Config`]) {
    console.warn('Change default config Error - Invalid key!')

    return
  }

  deepMerge(allConfig[`${key}Config`], config)
}

export const keys = [
  'color',
  'title',
  'legend',
  'xAxis',
  'yAxis',
  'grid',
  'radarAxis',
  'line',
  'bar',
  'pie',
  'radar',
  'gauge'
]

export {
  colorConfig,
  gridConfig,
  titleConfig,
  pieConfig,
  legendConfig
}
