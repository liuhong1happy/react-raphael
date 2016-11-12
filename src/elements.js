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

class Eelement extends React.Component{
    componentDidMount(){
        this.handleLoad = this.handleLoad.bind(this);
        var element = Utils.createElement(this.props.type,this.props,this.handleLoad);
        this.element = element;
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
    handleLoad(element){
        if(this.props.onCreatedElement){
            this.props.onCreatedElement(element);
        }
        if(this.props.load){
            this.props.load(element);
        }
    }
    render(){
        return (<div className={"raphael-"+this.props.type}></div>)
    }               
} 

const Circle = (props)=> <Element type="circle" {...props} />;
const Ellipse = (props)=> <Element type="ellipse" {...props} />;
const Image = (props)=> <Element type="image" {...props} />;
const Path = (props)=> <Element type="path" {...props} />;
const Rect = (props)=> <Element type="rect" {...props} />;
const Text = (props)=> <Element type="text" {...props} />;

module.exports = {
    Paper: Paper,
    Set: Set,
    Eelement: Eelement,
    Circle: Circle,
	Ellipse: Ellipse,
	Image: Image,
	Path: Path,
	Rect: Rect,
	Text: Text
}