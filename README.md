# react-raphael

reactify raphael

## Quickly Start

```js
const React = require('react');
const ReactDOM = require('react-dom');
const {Paper,Set,Circle} = require('./react-raphael');

class App extends React.Component{
    render(){
        var data = [{x:50,y:50,r:40},{x:100,y:100,r:40},{x:200,y:100,r:40},{x:150,y:50,r:40},{x:250,y:50,r:40}]
        return (<Paper width={300} height={300}>
                       <Set>    
                        {
                            data.map(function(ele,pos){
                                return (<Circle x={ele.x} y={ele.y} r={ele.r} />)
                            })
                        }
                        </Set>
                </Paper>)
    }
}
```

## API

- Paper 
    - width `number` width of the canvas
    - height  `number` height of the canvas
- Set
- Circle
    - x `number` x coordinate of the centre
    - y `number` y coordinate of the centre
    - r `number` radius

# Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)