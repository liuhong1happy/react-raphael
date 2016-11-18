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
            loading: true,
            id: paper.id
        })
    }
    componentWillUnmount(){
         this.paper.remove();
    }
    genElementsContainer(){
        if(this.state.loading){
            return (<div className="raphael-paper" data-id={this.state.id}>
                        {this.props.children}
                    </div>)
        }else{
            return (<div className="raphael-paper"></div>)
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
        var root = ReactDOM.findDOMNode(this.refs.root);
        var parentId = root.parentElement.getAttribute("data-id");
        var set = Utils.createSet(parentId,this.props,this.handleLoad.bind(this));
        this.set = set;
        this.setState({
            loading: true,
            id: set.id
        })
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
            return (<div ref="root" className="raphael-set" data-id={this.state.id}>{this.props.children}</div>)
        }else{
            return (<div ref="root" className="raphael-set"></div>)
        }
    }
}

class Element extends React.Component{
    componentDidMount(){
        this.handleLoad = this.handleLoad.bind(this);
        var root = ReactDOM.findDOMNode(this.refs.root);
        var parentId = root.parentElement.getAttribute("data-id");
        var element = Utils.createElement(parentId,this.props.type,this.props,this.handleLoad);
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
        return (<div ref="root" className={"raphael-"+this.props.type}></div>)
    }               
} 

const Circle = (props)=> <Element type="circle" {...props} />;
Circle.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, r: React.PropTypes.number };
Circle.defaultProps = { x: 0, y: 0,r: 10 };
        
const Ellipse = (props)=> <Element type="ellipse" {...props} />;
Ellipse.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, rx: React.PropTypes.number, ry: React.PropTypes.number };
Ellipse.defaultProps = { x: 0, y: 0,rx: 10,ry: 20 };
        
const Image = (props)=> <Element type="image" {...props} />;
Image.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, src: React.PropTypes.string, width: React.PropTypes.number, height: React.PropTypes.number };
Image.defaultProps = { x: 0, y: 0, src: "", width: 0,height: 0 };
        
const Path = (props)=> <Element type="path" {...props} />;
Path.propTypes = { d: React.PropTypes.string };
Path.defaultProps = { d: "" };
        
const Rect = (props)=> <Element type="rect" {...props} />;
Rect.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, width: React.PropTypes.number, height: React.PropTypes.number };
Rect.defaultProps = { x: 0, y: 0, width: 0,height: 0 };
        
const Print = (props)=> <Element type="print" {...props} />;
Print.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, text: React.PropTypes.string, fontFamily: React.PropTypes.string };
Print.defaultProps = { x: 0, y: 0, text: "", fontFamily: "Arial" };
        
const Text = (props)=> <Element type="text" {...props} />;
Text.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, text: React.PropTypes.string };
Text.defaultProps = { x: 0, y: 0, text: "" };
        
module.exports = {
    Paper: Paper,
    Set: Set,
    Element: Element,
    Circle: Circle,
	Ellipse: Ellipse,
	Image: Image,
	Path: Path,
    Print: Print,
	Rect: Rect,
	Text: Text
}