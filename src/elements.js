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
		var {style,className,...others} = this.props.container;
        if(this.state.loading){
            return (<div className={"raphael-paper "+className} data-id={this.state.id} style={style} {...others}>
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
Paper.propTypes = { x: React.PropTypes.number, y: React.PropTypes.number, container: React.PropTypes.object };
Paper.defaultProps = { width: 100, height: 100, container:{ style:{}, className:"" } };
				
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

class Line extends React.Component{
	render(){
		var {x1,x2,y1,y2,animate,attr,...others} = this.props;
        if(animate){
            if(animate.anim){
                for(var key in animate.anim) { 
                    animate.anim[key].x1 = animate.anim[key].x1 || x1;
                    animate.anim[key].x2 = animate.anim[key].x2 || x2;
                    animate.anim[key].y1 = animate.anim[key].y1 || y1;
                    animate.anim[key].y2 = animate.anim[key].y2 || y2;
                    animate.anim[key].path = [ "M",animate.anim[key].x1,animate.anim[key].y1, "L",animate.anim[key].x2,animate.anim[key].y2 ];
                 }
            }else{
                animate.x1 = animate.x1 || x1;
                animate.x2 = animate.x2 || x2;
                animate.y1 = animate.y1 || y1;
                animate.y2 = animate.y2 || y2;
                animate.path = [ "M",animate.x1,animate.y1, "L",animate.x2,animate.y2 ];
            }
        }
        if(attr){
            attr.x1 = attr.x1 || x1;
            attr.x2 = attr.x2 || x2;
            attr.y1 = attr.y1 || y1;
            attr.y2 = attr.y2 || y2;
            attr.path = [ "M",attr.x1,attr.y1, "L",attr.x2,attr.y2 ];
        }
		return <Path d={[ "M",x1,y1, "L",x2,y2 ]} attr={attr} animate={animate}  {...others} />
	}
}
Line.propTypes = { x1: React.PropTypes.number, y1: React.PropTypes.number, x2: React.PropTypes.number, y2: React.PropTypes.number };
Line.defaultProps = { x1: 0, y1: 0, x2: 0,y2: 0 };
        
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
	Text: Text,
    Line: Line
}