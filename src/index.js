
import Bakan from './bakan'

var $dom = document.getElementById('root')
var options = {
  text: 'Lorem ipsum dolor sit amet',
  step: 1,
  period: 10,
  space: 2,
  color: 'white',
  font: 'arial',
  background: '#FF0000',
  opacity: 100
}

new Bakan($dom, options)
