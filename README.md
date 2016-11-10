# react-raphael

[![Version](https://img.shields.io/npm/v/react-raphael.svg)](https://www.npmjs.com/package/react-raphael)
[![Downloads](https://img.shields.io/npm/dt/react-raphael.svg)](https://www.npmjs.com/package/react-raphael)

reactify raphael

## Install

	npm install --save react-raphael

## Quickly Start

```js
window.React = require('react');
window.ReactDOM = require('react-dom');
wubdiw.Raphael = require('raphael');
const {Paper,Set,Circle,Ellipse,Image,Rect,Text,Path} = require('react-raphael');

class App extends React.Component{
    render(){
        var data = [{x:50,y:50,r:40},{x:100,y:100,r:40},{x:200,y:100,r:40},{x:150,y:50,r:40},{x:250,y:50,r:40}]
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} />)
                            })
                        }
                        </Set>
						<Set>
							<Image src="/static/images/5circle.png" x={100} y={170} width={90} height={60} />
							<Ellipse x={150} y={200} ry={30} rx={100} />
							<Rect x={30} y={150} width={240} height={150} />
							<Text x={150} y={250} text="同一个世界 同一个梦想" />
							<Text x={150} y={270} text="One World One Dream" />
							<Path d={["M80 290L220 290"]} />
						</Set>
                </Paper>)
    }
}
```

## API

#### All Element Props

- Paper 
    - width `number` width of the canvas
    - height  `number` height of the canvas
- Element
	- attr `object` Sets the attributes of the element.
	- animate `object` Creates and starts animation for given element.
	- animateWith `object` Acts similar to Element.animate, but ensure that given animation runs in sync with another given element.
	- click `function` Adds event handler for click for the element.
	- dblclick `function` Adds event handler for double click for the element.
	- drag `function` Adds event handlers for drag of the element.
	- glow `function` Return set of elements that create glow-like effect around given element.
	- hover `function` Adds event handlers for hover for the element.
	- hide `boolean` Makes element invisible. 
	- mousedown `function` Adds event handler for mousedown for the element.
	- mousemove `function` Adds event handler for mousemove for the element.
	- mouseout `function` Adds event handler for mouseout for the element.
	- mouseover `function` Adds event handler for mouseover for the element.
	- mouseup `function` Adds event handler for mouseup for the element.
	- rotate `object` Adds rotation by given angle around given point to the list of transformations of the element.
	- scale `object` Adds scale by given amount relative to given point to the list of transformations of the element.
	- touchcancel `function` Adds event handler for touchcancel for the element.
	- touchend `function` Adds event handler for touchend for the element.
	- touchmove `function` Adds event handler for touchmove for the element.
	- touchstart `function` Adds event handler for touchstart for the element.
	- transform `string` or `array` Adds transformation to the element which is separate to other attributes, i.e. translation doesn’t change x or y of the rectange. The format of transformation string is similar to the path string syntax:`"t100,100r30,100,100s2,2,100,100r45s1.5"`
	- translate `object` Adds translation by given amount to the list of transformations of the element.
- Set `Extends Element & Container Elements`
- Circle  `Extends Element & Draws a circle`
    - x `number` x coordinate of the centre
    - y `number` y coordinate of the centre
    - r `number` radius
- Ellipse `Extends Element & Draws a ellipse`
    - x `number` x coordinate of the centre
    - y `number` y coordinate of the centre
    - rx `number` horizontal radius
	- ry `number` vertical radius
- Image `Extends Element & Embeds an image into the surface`
	- src `string` URI of the source image
    - x `number` x coordinate of the centre
    - y `number` y coordinate of the centre
    - width `number` width of the image
	- height `number` height of the image
- Path `Extends Element & Creates a path element by given path data string`
    - d `string` path string in SVG format
- Rect `Extends Element & Draws a circle`
    - x `number` x coordinate of the top left corner
    - y `number` y coordinate of the top left corner
    - width `number` width of the rect
	- height `number` height of the rect
    - r `number` radius for rounded corners, default is 0
- Text `Extends Element & Draws a text string & If you need line breaks, put “\n” in the string`
    - x `number` x coordinate position
    - y `number` y coordinate position
    - text `string` The text string to draw
	
#### All Element Ref Function

- Paper
	- getPaper `function` paper of the component
- Set
	- getSet `function` set of the component
- Element
	- getElement `function` element of the component

#### Raphael & Utils

- Raphael `you can see [http://dmitrybaranovskiy.github.io/raphael/reference.html#Raphael](http://dmitrybaranovskiy.github.io/raphael/reference.html#Raphael)`
- Utils
	- createPaper `function` create a paper by `Raphael()`
	- create `function` create elements or a set by `paper.xxx`
	- createElement `function` call create to create a element
	- createSet `function` call create to create a set
	- removeSet `function` remove a set from paper 
	- removeElement `function` remove a element from paper 
	- paper `object` or `null` the only paper instance
	- elements `array` all elements or set of the only paper instance
	
#### Todo

- [ ] Animation
- [ ] Element Ref Function
- [ ] call `Unxxx` Event in `removeElement` & `removeSet`
- [ ] remove unsafe call style
- [ ] etc.
	
# Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)