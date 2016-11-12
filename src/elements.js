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
        this.state = {
            loading: false
        }
    }
    componentDidMount(){
        var set = Utils.createSet(this.props,this.handleLoad.bind(this));
        this.set = set;
        this.setState({
            loading: true
        })
    }
    componentDidUpdate(){
        console.log(this.props.children);
    }
    componentWillUnmout(){
        Utils.removeSet(this.set);
    }
    handleLoad(set){
        if(this.props.load){
            this.props.load(set);
        }
    }
	getSet(){
		return this.set;			
	}
    render(){
        if(this.state.loading){
            return (<div className="raphael-set">{this.props.children}</div>)
        }else{
            return (<div className="raphael-set"></div>)
        }
    }
}

class Element extends React.Component{
    componentDidMount(){
        this.handleLoad = this.handleLoad.bind(this);
        var element = Utils.createElement(this.props.type,this.props,this.handleLoad);
        this.element = element;
    }
    componentDidUpdate(){
        Utils.updateElement(this.element,this.props.type,this.props);
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
    handleLoad(element){
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
    Element: Element,
    Circle: Circle,
	Ellipse: Ellipse,
	Image: Image,
	Path: Path,
	Rect: Rect,
	Text: Text
}