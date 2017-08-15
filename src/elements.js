const React = require("react");
const ReactDOM = require("react-dom");
const Utils = require("./utils");

const PropTypes = require("prop-types");

class Paper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount(){
        const container = ReactDOM.findDOMNode(this.refs.container);
        const paper = Utils.createPaper(container,this.props);
        this.paper = paper;
        this.setState({
            loaded: true,
            id: paper.id
        });
    }
    componentDidUpdate() {
        Utils.updatePaper(this.paper, this.props);
    }
    componentWillUnmount(){
        this.paper.remove();
    }

    getPaper(){
        return this.paper;
    }
    genElementsContainer(){
        if(this.state.loaded){
            return (<div className="raphael-paper" data-id={this.state.id}>
              {this.props.children}
            </div>);
        }else{
            return (<div className="raphael-paper" />);
        }
    }
    render(){
        const eleContainer = this.genElementsContainer();
        const {style,className,...others} = this.props.container;
        return (<div className="react-raphael">
          {eleContainer}
          <div ref="container" className={"paper-container "+className} style={style} {...others} />
        </div>);
    }
}
Paper.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    viewbox: PropTypes.string,
    container: PropTypes.object
};
Paper.defaultProps = { x:0, y: 0,width: 100, height: 100, container:{ style:{}, className:"" }, viewbox: "" };

class Set extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount(){
        const root = ReactDOM.findDOMNode(this.refs.root);
        const parentId = root.parentElement.getAttribute("data-id");
        const set = Utils.createSet(parentId,this.props,this.handleLoad.bind(this));
        this.set = set;
        this.setState({
            loaded: true,
            id: set.id
        });
    }
    getSet(){
        return this.set;
    }
    handleLoad(set){
        if(this.props.load){
            this.props.load(set);
        }
    }
    componentWillUnmout(){
        Utils.removeSet(this.set);
    }
    render(){
        if(this.state.loaded){
            return (<div ref="root" className="raphael-set" data-id={this.state.id}>{this.props.children}</div>);
        }else{
            return (<div ref="root" className="raphael-set" data-id={this.state.id} />);
        }
    }
}

class Element extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loaded: false
        };
    }
    componentDidMount(){
        const root = ReactDOM.findDOMNode(this.refs.root);
        const parentId = root.parentElement.getAttribute("data-id");
        const element = Utils.createElement(parentId,this.props.type,this.props,this.handleLoad.bind(this));
        this.element = element;
        this.setState({
            loaded: true
        });
    }
    componentDidUpdate(){
        Utils.updateElement(this.element,this.props.type,this.props,this.handleUpdate.bind(this));
    }
    componentWillUnmount(){
        Utils.removeElement(this.element);
    }
    getElement(){
        return this.element;
    }
    handleLoad(element){
        if(this.props.load){
            this.props.load(element);
        }
    }
    handleUpdate(element){
        if(this.props.update){
            this.props.update(element);
        }
    }
    render(){
        if(this.state.loaded) return null;
        return (<div ref="root" className={"raphael-"+this.props.type} />);
    }
}

Element.propTypes = {
    animate: PropTypes.oneOfType([
        PropTypes.shape({
            anim: PropTypes.shape({
                transform: PropTypes.string
            }),
            ms: PropTypes.number,
            percents: PropTypes.array,
            times: PropTypes.number
        }),
        PropTypes.string
    ]),
    stop: PropTypes.bool
};

class Circle extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="circle" {...this.props} />); }
}
Circle.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    r: PropTypes.number, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool
};
Circle.defaultProps = { x: 0, y: 0,r: 10 };

class Ellipse extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="ellipse" {...this.props} />); }
}

Ellipse.propTypes = { x: PropTypes.number, y: PropTypes.number, rx: PropTypes.number, ry: PropTypes.number, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Ellipse.defaultProps = { x: 0, y: 0,rx: 10,ry: 20 };

class Image extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="image" {...this.props} />); }
}
Image.propTypes = { x: PropTypes.number, y: PropTypes.number, src: PropTypes.string, width: PropTypes.number, height: PropTypes.number, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Image.defaultProps = { x: 0, y: 0, src: "", width: 0,height: 0 };

class Path extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="path" {...this.props} />); }
}
Path.propTypes = { d: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Path.defaultProps = { d: "M0,0L0,0Z" };

class Rect extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="rect" {...this.props} />); }
}
Rect.propTypes = { x: PropTypes.number, y: PropTypes.number, width: PropTypes.number, height: PropTypes.number, r: PropTypes.number, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Rect.defaultProps = { x: 0, y: 0, width: 0,height: 0, r: 0 };

class Print extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="print" {...this.props} />); }
}
Print.propTypes = { x: PropTypes.number, y: PropTypes.number, text: PropTypes.string, fontFamily: PropTypes.string, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Print.defaultProps = { x: 0, y: 0, text: "", fontFamily: "Arial" };

class Text extends React.Component{
    getElement() { return this.refs.element.getElement();  }
    render(){ return (<Element ref="element" type="text" {...this.props} />); }
}
Text.propTypes = { x: PropTypes.number, y: PropTypes.number, text: PropTypes.string, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
Text.defaultProps = { x: 0, y: 0, text: "" };

class Line extends React.Component{
    getElement() { return this.refs.path.getElement();  }
    render(){
        const {x1,x2,y1,y2,animate,attr,...others} = this.props;
        if(animate){
            if(animate.anim){
                for(const key in animate.anim) {
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
        return <Path ref="path" d={[ "M",x1,y1, "L",x2,y2 ]} attr={attr} animate={animate}  {...others} />;
    }
}
Line.propTypes = { x1: PropTypes.number, y1: PropTypes.number, x2: PropTypes.number, y2: PropTypes.number, animate: PropTypes.oneOfType([PropTypes.shape({anim: PropTypes.shape({transform: PropTypes.string}),ms: PropTypes.number,percents: PropTypes.array,times: PropTypes.number}),PropTypes.string]),stop: PropTypes.bool };
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
};
