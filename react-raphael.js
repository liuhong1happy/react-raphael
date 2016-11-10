const Raphael = require('raphael');
const React = require('react');
const ReactDOM = require('react-dom');

var Utils = {
    createPaper:function(container,props){
        var { width,height } = props;
        var paper = Raphael(container,width,height);
        Utils.paper = paper;
        return paper;
    },
    create:function(type,props){
        var element = null;
		var {attr,animate,animateWith,click,dblclick,drag,glow,hover,hide} =  props;
        switch(type){
            case "set":
                element = Utils.paper.set();
                break;
            case "circle":
                var {x,y,r} = props;
                element = Utils.paper.circle(x,y,r);
                break;
            case "ellipse":
                var {x, y, rx, ry} = props;
                element = Utils.paper.ellipse(x, y, rx, ry);
                break;
            case "image":
                var {src, x, y, width, height} = props;
                element = Utils.paper.image(src, x, y, width, height);
                break;
            case "path":
                var {d} = props;
                element = Utils.paper.path(d);
                break;
            case "rect":
                var {x, y, width, height, r} = props;
                element = Utils.paper.rect(x, y, width, height, r);
                break;
            case "text":
                var {x, y, text} = props;
                element = Utils.paper.text(x, y, text);
                break;
        }
		if(element){
			for(var key in props){
				switch(key){
					case "attr": 
						if(typeof props[key] ==="object") element.attr(props.attr);
						break;
					case "animate": 
						if(typeof props[key] ==="object") element.animate(props.animate);
						break;
					case "animateWith": 
						if(typeof props[key] ==="object") element.animateWith(props.animateWith);
						break;
					case "click": 
						if(typeof props[key] ==="function") element.click(props.click);
						break;
					case "dblclick": 
						if(typeof props[key] ==="function") element.dblclick(props.dblclick);
						break;
					case "drag": 
						if(typeof props[key] ==="function") element.drag(props.drag);
						break;
					case "glow": 
						if(typeof props[key] ==="function") element.click(props.click);
						break;
					case "hover": 
						if(typeof props[key] ==="function") element.dblclick(props.dblclick);
						break;
					case "hide": 
						if(typeof props[key] ==="boolean") props.hide?element.hide():element.show();
						break;
					case "mousedown": 
						if(typeof props[key] ==="function") element.mousedown(props.mousedown);
						break;
					case "mousemove": 
						if(typeof props[key] ==="function") element.mousemove(props.mousemove);
						break;
					case "mouseout": 
						if(typeof props[key] ==="function") element.mouseout(props.mouseout);
						break;
					case "mouseover": 
						if(typeof props[key] ==="function") element.mouseover(props.mouseover);
						break;
					case "mouseup": 
						if(typeof props[key] ==="function") props.mouseup(element.mouseup);
						break;
					case "rotate": 
						if(typeof props[key] ==="rotate") element.rotate(props.attr);
						break;
					case "scale": 
						if(typeof props[key] ==="scale") element.scale(props.animate);
						break;
					case "touchcancel": 
						if(typeof props[key] ==="function") element.touchcancel(props.touchcancel);
						break;
					case "touchend": 
						if(typeof props[key] ==="function") element.touchend(props.touchend);
						break;
					case "touchmove": 
						if(typeof props[key] ==="function") props.touchmove(element.touchmove);
						break;
					case "touchstart": 
						if(typeof props[key] ==="function") props.touchstart(element.touchstart);
						break;
					case "transform":
						if(typeof props[key] ==="object" || typeof props[key] ==="array") props.transform(element.transform);
						break;
					case "translate":
						if(typeof props[key] ==="object") props.translate(element.translate);
						break;
				}
			}
		}
		
		
        return element;
    },
    createElement:function(type,props,callback){
        var element = Utils.create(type,props);
        Utils.elements.push({
            type: type,
            props: props,
            callback: callback,
            element: element
        });
        if(callback) callback(element);
        return element;
    },
    createSet:function(props){
        var set = Utils.create("set",props);
        Utils.elements.push({
            type: "set",
            element: set
        })
        return set;
    },
    removeSet:function(set){
        var elements = Utils.elements.filter(function(ele){
            return ele === set;
        })
        if(elements.length>0){
            elements[0].remove();
        }
    },
    removeElement:function(element){
        var elements = Utils.elements.filter(function(ele){
            return ele === element;
        })
        if(elements.length>0){
            elements[0].remove();
        }
    },
    paper: null,
    elements: []
}

class Paper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        var container = ReactDOM.findDOMNode(this.refs.container);
        var paper = Utils.createPaper(container,this.props);
        this.paper = paper;
        this.setState({
            loading: true
        })
    }
    componentWillUnmount(){
         this.paper.remove();
    }
    genElementsContainer(){
        if(this.state.loading){
            return (<div className="elements-container">
                        {this.props.children}
                    </div>)
        }else{
            return (<div className="elements-container"></div>)
        }
    }
	getPaper(){
		return this.paper;			
	}
    render(){
        var eleContainer = this.genElementsContainer();
        return (<div className="react-raphael">
                    {eleContainer}
                    <div ref="container" className="paper-container"></div>
                </div>)
    }
}

class Set extends React.Component{
    constructor(props){
        super(props);
        this.elements = [];
        this.state = {
            loading: false
        }
    }
    componentWillMount(){
        this.onCreatedElement = this.onCreatedElement.bind(this);
        this.elements = [];
        var children = this.props.children || [];
        var isArray = children instanceof Array;
        if(!isArray) children = [children];
        for(var i=0;i<children.length;i++){
            var element = children[i];
            // element.props.onCreatedElement = this.onCreatedElement;
            var props = {};
            for(var key in element.props){
                props[key] = element.props[key];
            }
            props.onCreatedElement = this.onCreatedElement;
			props.key = i;
            this.elements.push(React.createElement(element.type,props,null));
        }
    }
    componentWillUpdate(){
        this.elements = [];
        var children = this.props.children || [];
        var isArray = children instanceof Array;
        if(!isArray) children = [children];
        for(var i=0;i<children.length;i++){
            var element = children[i];
            // element.props.onCreatedElement = this.onCreatedElement;
            var props = {};
            for(var key in element.props){
                props[key] = element.props[key];
            }
            props.onCreatedElement = this.onCreatedElement;
			props.key = i;
            this.elements.push(React.createElement(element.type,props,null));
        }
    }
    componentDidMount(){
        var set = Utils.createSet(this.props);
        this.set = set;
        this.setState({
            loading: true
        })
    }
    componentWillUnmout(){
        Utils.removeSet(this.set);
    }
    onCreatedElement(element){
        this.set.push(element);
    }
	getSet(){
		return this.set;			
	}
    render(){
        if(this.state.loading){
            return (<div className="raphael-set">{this.elements}</div>)
        }else{
            return (<div className="raphael-set"></div>)
        }
    }
}

class Circle extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("circle",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
    render(){
        return (<div className="raphael-circle"></div>)
    }    
}

class Ellipse extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("ellipse",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
	getElement(){
		return this.element;
	}
    render(){
        return (<div className="raphael-ellipse"></div>)
    }    
}	

class Image extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("image",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
	getElement(){
		return this.element;
	}
    render(){
        return (<div className="raphael-image"></div>)
    }    
}

class Path extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("path",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
	getElement(){
		return this.element;
	}
    render(){
        return (<div className="raphael-path"></div>)
    }    
}
	
class Rect extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("rect",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
	getElement(){
		return this.element;
	}
    render(){
        return (<div className="raphael-rect"></div>)
    }    
}

class Text extends React.Component {
    componentDidMount(){
        var element = Utils.createElement("text",this.props,this.props.onCreatedElement);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
	getElement(){
		return this.element;
	}
    render(){
        return (<div className="raphael-text"></div>)
    }    
}

module.exports = {
	Raphael: Raphael,
    Paper: Paper,
    Set: Set,
    Circle: Circle,
	Ellipse: Ellipse,
	Image: Image,
	Path: Path,
	Rect: Rect,
	Text: Text,
    Utils: Utils
}