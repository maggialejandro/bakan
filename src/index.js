import Bakan from './bakan'

const $dom = document.getElementById('root')
const options = {
  text: ['Lorem ipsum dolor sit amet', 'Iusto tempora qui, officia ab laborum', 'Quasi quis, facilis culpa omnis'],
  step: 1,
  period: 10,
  space: 2,
  color: 'white',
  font: 'arial',
  background: '#FF0000',
  opacity: 100
}

new Bakan($dom, options)
