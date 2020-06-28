import css from './css/block.css'
import u from '../utils.js'
import { blocks } from '../blocks/types'

const Block = function (sceneElement, blockConfig) {
  this.uid = u.uid(blockConfig)
  this.type = blockConfig.type
  this.index = blockConfig.index
  this.block = null

  if (!this.type) {
    return console.warn('No `type` field found in block ' + this.index)
  }

  let step = 0

  const props = u.props(blockConfig.props)

  const child = u.div(`<div class="${css.block} b b${this.index} ${props.classes}" style="${props.styles}">
    <div class="blockContainer ${css.inner}"></div>
  </div>`)

  const blockContainer = child.querySelector('.blockContainer')

  if (!blocks[this.type]) {
    console.log(`block "${this.type}" not found`)
  } else {
    this.block = new blocks[this.type](blockContainer, blockConfig)
  }

  this.beforeDestroy = () => {
    if (this.block.beforeDestroy) this.block.beforeDestroy()
  }

  this.stepForward = () => {
    step++
    if (this.block.stepForward) {
      this.block.stepForward(step)
    } else {
      console.warn(`The block "${this.type}" doesn't implement the method "stepForward" but this scene tried to use it`)
    }
  }

  sceneElement.appendChild(child)
}

export { Block }