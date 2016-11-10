
const React = require('react');
const ReactDOM = require('react-dom');
const Utils = require('./utils');

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
    Paper: Paper,
    Set: Set,
    Circle: Circle,
	Ellipse: Ellipse,
	Image: Image,
	Path: Path,
	Rect: Rect,
	Text: Text,	
}