const hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const getTextWidth = function (text, font) {
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
}

class Text {
  constructor(options) {
    this.options = options
    this.options.src = options.text + new Array(options.space + 1).join(' ')
    this.hasTriggeredNext = false;
    this.delta = null
    this.el = document.createElement('div')
  }

  play(onNext, onFinish) {
    var font = 'bold ' + this.options.height + 'px ' + this.options.font
    var text = document.createTextNode(this.options.src)
    var textLength = parseInt(getTextWidth(this.options.src, font))

    this.el.appendChild(text)

    this.delta = this.options.width

    this.el.style.font = font
    this.el.style.fontSize = this.options.height + 'px'
    this.el.style.color = this.options.color
    this.el.style.left = this.delta + 'px'
    this.el.style.position = 'absolute'
    this.el.style.display = 'inline-block'
    this.el.style.textOverflow = 'ellipsis'
    this.el.style.overflow = 'hidden'

    var nextStep = () => {
      if(this.delta + textLength < 0){
        onFinish()
      }else{
        if(this.delta + textLength < this.options.width) {
          if(!this.hasTriggeredNext){
            setTimeout(onNext, this.options.period);
            this.hasTriggeredNext = true
          }
        }

        this.delta -= this.options.step
        this.el.style.left = this.delta + 'px'

        setTimeout(nextStep, this.options.period);
      }
    }

    nextStep()
  }
}

class Container {
  constructor(options){
    this.options = options
    this.el = document.createElement('div')
    this.texts = []

    if(this.options.background){
      var {r, g, b} = hexToRgb(this.options.background)
    }else{
      var {r, g, b} = hexToRgb('#FFFFFF')
    }

    var o = this.options.opacity ? this.options.opacity / 100 : 1
    this.el.style.background = `rgba(${r}, ${g}, ${b}, ${o})`
    this.el.style.overflow = 'hidden'
    this.el.style.height = '100%'
    this.el.style.whiteSpace = 'nowrap'
  }

  play() {
    // TODO: multiple texts
    var text = {
      text: this.options.text,
      space: this.options.space || 1,
      period: this.options.period || 10,
      color: this.options.color,
      font: this.options.font,
      step: this.options.step || 1
    }

    this.texts.push(text)
    this.add()
  }

  add() {
    var textOptions = this.texts.shift()
    var { left, width } = this.el.getBoundingClientRect()

    textOptions.width = width
    textOptions.offset = left
    textOptions.height = parseInt(this.el.clientHeight)

    var text = new Text(textOptions)
    this.el.appendChild(text.el)

    var onNext = () => this.add()

    var onFinish = () => {
      try {
        this.el.removeChild(text.el)
      } catch(e) {
        console.error(e)
      }
    }

    this.texts.push(textOptions)
    text.play(onNext, onFinish)
  }
}

export default class Bakan {
  constructor(el, options) {
    if(!(el instanceof HTMLElement))
      throw new Error('Wrong DOM element')

    if(!options)
      throw new Error('Options missing')

    this.el = el
    this.options = options

    this.start()
  }

  start() {
    this.container = new Container(this.options)
    this.el.appendChild(this.container.el)
    this.container.play()
  }
}
