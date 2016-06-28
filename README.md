# Bakan

[Demo](http://bakan.96.lt/)

## Installation

`npm install --save bakan`

## Usage
``` js
  import Bakan from 'bakan'

  var $dom = document.getElementById('root')
  var options = {
    text: 'Lorem ipsum dolor sit amet',
    step: 1,
    period: 10,
    space: 1,
    color: 'white',
    font: 'arial',
    background: '#FFAA00',
    opacity: 50
  }

  new Bakan($dom, options)
```

## Options

### text

**Type:** _String_

``` js
text: 'Lorem ipsum dolor sit amet'
```

Text shown by Bakan marquee

### step

**Type:** _Integer_

``` js
step: 1
```

Number of pixels moved each period

### period

**Type:** _Integer_

``` js
period: 10
```

Time between each animation (Miliseconds)

### space

**Type:** _Integer_

``` js
space: 10
```

Number of characters between each text secuence

### color

**Type:** _Hexa_ or _String_

``` js
color: 'blue'
```

Font color

### font

**Type:** _String_

``` js
font: 'times new roman'
```

Font family

### background

**Type:** _Hexa_

``` js
background: '#FF0000'
```

Background color

### opacity

**Type:** _Integer_
**Values:** `[ 0, 100 ]`

``` js
opacity: '100'
```

Background opacity
